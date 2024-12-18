import { Customer } from '../interfaces/customer.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import agent from '../models/agent.model'; 
import customer from '../models/customer.model'
import Policy from '../models/policy.model';
import Agent from '../models/agent.model'
import { error } from 'winston';


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

    return { token, refreshToken, username: customerData.username };
  };

  public getAllCustomers = async (agentId: ObjectId): Promise<Customer[]> => {
    try {
      const customers = await customer.find({ agentId }).select('-password'); 
      if (!customers || customers.length === 0) {
        throw new Error('No customers found for this agent.');
      }
      return customers;
    } catch (error) {
      throw new Error(`Error retrieving customers: ${error.message}`);
    }
  };
  public refreshToken = async (refreshToken: string): Promise<{ newRefreshToken: string }> => {
    const foundCustomer = await customer.findOne({ refreshToken:refreshToken});
    if (!foundCustomer) {
      throw new Error('Invalid refresh token');
    }
    try {
      const newRefreshToken = jwt.sign(
        { userId: foundCustomer._id, email: foundCustomer.email }, process.env.CUSTOMER_SECRET as string,{ expiresIn: '7d' });
      await customer.findByIdAndUpdate(foundCustomer._id,{ refreshToken: newRefreshToken },{ new: true });
      return { newRefreshToken };
  
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token has expired');
      }
      throw new Error('Error verifying or updating refresh token');
    }
  };
  public payPremium = async (body): Promise<any> => {
    const { policyId, paymentAmount, agentId, commissionRate = 5 } = body;
    const policy = await Policy.findById(policyId);
    const amountPerMonth = policy.premiumAmount;
    if (paymentAmount !== amountPerMonth) {
      throw new Error(`Payment amount must match the monthly premium of ${amountPerMonth}`);
    }
    policy.premiumPaid += 1;
    policy.pendingPremium = Math.max(0, policy.pendingPremium - 1);
    await policy.save();
    const commissionEarned = paymentAmount * (commissionRate / 100);
    if (agentId) {
      await Agent.findByIdAndUpdate(agentId,{ $inc: { commission: commissionEarned } }, { new: true } );
    }
  
    return { totalMonthsPaid: policy.premiumPaid,monthsRemaining: policy.pendingPremium};
  };
  
      
}

export default CustomerService;
