import { Customer } from '../interfaces/customer.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import agent from '../models/agent.model'; 
import customer from '../models/customer.model'
import Policy from '../models/policy.model';
import Agent from '../models/agent.model'
import { sendEmail } from '../utils/user.util';
import { error } from 'winston';
import redisClient from '../config/redis';


class CustomerService {
  public createCustomer = async (body: Customer): Promise<Customer> => {
    try {
      const agents = await agent.find({ region: body.region }).sort({ num_of_customers: 1 }).exec();
      if (agents.length === 0) {
        throw new Error('No agent available in this region');
      }
      const assignedAgent = agents[0] ;
      const existingCustomer = await customer.findOne({ email: body.email });
      if (existingCustomer) {
        throw new Error('Customer with this email already exists.');
      }

      const hashedPassword = await bcrypt.hash(body.password, 10);
      body.password = hashedPassword;
      body.agentId = assignedAgent ? assignedAgent._id : null;

      const newCustomer = await customer.create(body);

      if (assignedAgent) {
        await agent.updateOne({ _id: assignedAgent._id }, { $inc: { num_of_customers: 1 } });
      }

      // Invalidate the cache for the agent's customers
      const cacheKey = `customers:agent:${assignedAgent._id}`;
      await redisClient.del(cacheKey);  // Remove the cache for this agent

      return newCustomer;
    } catch (error) {
      throw new Error(`Error creating customer: ${error.message}`);
    }
   };

  // customer login
  public customerLogin = async (body: Customer): Promise<any> => {
    const customerData = await customer.findOne({ email: body.email });
    if (!customerData) {
      throw new Error('Customer not found');
    }

    const isMatch = await bcrypt.compare(body.password, customerData.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const payload = { userId: customerData._id, email: customerData.email };

    const token = jwt.sign(payload, process.env.CUSTOMER_SECRET as string, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, process.env.CUSTOMER_SECRET as string, { expiresIn: '7d' });

    await customer.findOneAndUpdate({ _id: customerData._id }, { refreshToken });

    return { token, refreshToken, username: customerData.username, customerImage: customerData.profilePhoto, email: customerData.email };
  };

  // Get all agent apecific customers 
  public getAllCustomers = async (
    agentId: ObjectId,
    page: number,
    limit: number
  ): Promise<{ data: Customer[]; total: number; page: number; totalPages: number; source: string }> => {
    const cacheKey = `customers:agent:${agentId}:page=${page}:limit=${limit}`;
  
    try {
      // Check Redis cache
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return {
          ...JSON.parse(cachedData),
          source: 'Redis Cache',
        };
      }
  
      // Fetch total count
      const total = await customer.countDocuments({ agentId });
  
      // Fetch paginated data
      const customers = await customer
        .find({ agentId })
        .select('-password -refreshToken') // Exclude sensitive fields
        .skip((page - 1) * limit)
        .limit(limit);
  
      if (!customers || customers.length === 0) {
        throw new Error('No customers found for this agent.');
      }
  
      const totalPages = Math.ceil(total / limit);
  
      // Cache the data
      const cacheData = { data: customers, total, page, totalPages };
      await redisClient.setEx(cacheKey, 60, JSON.stringify(cacheData));
  
      return {
        ...cacheData,
        source: 'Database',
      };
    } catch (error) {
      throw new Error(`Error retrieving customers: ${error.message}`);
    }
  };
  
   
  public getCustomerById=async(customerId:string):Promise<any> =>{
    try {
      const res = await customer.findById(customerId).select('-password -refreshToken');
      if(!res) {
        throw new Error('customer not found');
      }
      return res;
    } catch (error) {
      throw error;
    }
  };

  public refreshToken = async (customerId: string): Promise<string> => {
    try {
      const customerRecord = await customer.findById(customerId);
      const refreshToken = customerRecord?.refreshToken;
      if (!refreshToken) {
        throw new Error('Refresh token is missing');
      }
      const payload : any= jwt.verify(refreshToken, process.env.CUSTOMER_SECRET );
      const { userId, email } = payload;
      const newAccessToken = jwt.sign({ userId, email }, process.env.CUSTOMER_SECRET, { expiresIn: '1h' });
      return newAccessToken;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  };

  public payPremium = async (body): Promise<any> => {
    try {
      const { policyId, paymentAmount, agentId, commissionRate = 5 } = body;
  
      // Fetch the policy
      const policy = await Policy.findById(policyId);
      if (!policy) {
        throw new Error('Policy not found');
      }
  
      // Check if policy is active
      if (policy.status !== 'Active') {
        throw new Error('Your policy is not active');
      }
  
      // Check if policy is matured
      if (policy.duration === policy.premiumPaid) {
        throw new Error('Your policy is matured, no further payments required');
      }
  
      // Amount per month validation
      const amountPerMonth = policy.premiumAmount;
  
      // Calculate how many months are covered by the payment
      const monthsToPay = Math.floor(paymentAmount / amountPerMonth); // Determine the full months that can be paid
      if (monthsToPay <= 0) {
        throw new Error('Payment amount is insufficient to cover at least one month of premium');
      }
  
      // Update the premium details
      const newPremiumPaid = policy.premiumPaid + monthsToPay; // Increase premiumPaid by the number of months paid
      const newPendingPremium = Math.max(0, policy.pendingPremium - monthsToPay); // Decrease pendingPremium by the months paid, not going below 0
  
      // Update the policy
      policy.premiumPaid = newPremiumPaid;
      policy.pendingPremium = newPendingPremium;
  
      // Save the updated policy details
      await policy.save({ validateBeforeSave: false });
  
      // Calculate commission for the agent
      const commissionEarned = paymentAmount * (commissionRate / 100);
      if (agentId) {
        await Agent.findByIdAndUpdate(agentId, { $inc: { commission: commissionEarned } }, { new: true });
      }
  
      // Clear relevant Redis data (instead of flushing the entire cache)
      await redisClient.del(`policy:${policyId}`);  // Delete only the policy cache, adjust as necessary
  
      return {
        totalMonthsPaid: policy.premiumPaid,
        monthsRemaining: policy.pendingPremium,
        id: policy._id,
        paymentDate: policy.updatedAt,
      };
    } catch (error) {
      console.error('Error during premium payment:', error);
      throw new Error(error.message);  // Corrected error handling
    }
  };
  
  // forget password
  public forgotPassword = async (email: string): Promise<void> => {
    try{
      const customerData = await customer.findOne({ email });
      if (!customerData) {
        throw new Error('Email not found');
      }
      const token = jwt.sign({ userId: customerData._id }, process.env.CUSTOMER_RESET_SECRET, { expiresIn: '1h' });
      await sendEmail(email, token);
    } catch(error){
      throw new Error("Error occured cannot send email: "+error)
    }
  };

  //reset password
  public resetPassword = async (body: any, userId: string): Promise<void> => {
    try{
      const customerData = await customer.findById(userId);
      if (!customerData) {
        throw new Error('User not found');
      }
      const hashedPassword = await bcrypt.hash(body.newPassword, 10);
      customerData.password = hashedPassword;
      await customerData.save();
    } catch (error) {
      throw new Error(`Error resetting password: ${error.message}`);
    }
  };
      
}

export default CustomerService;
