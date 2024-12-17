import { Customer } from '../interfaces/customer.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import agent from '../models/agent.model'; 
import customer from '../models/customer.model'


class CustomerService {
  public createCustomer = async (body: Customer): Promise<Customer> => {
    try {
      const agents = await agent.find({ region: body.region }).sort({ num_of_customers: 1 }).exec();
      const assignedAgent = agents.length > 0 ? agents[0] : null;

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

  public getAllCustomers = async (): Promise<Customer[]> => {
    try {
      const res = await customer.find();
      if (!res || res.length === 0) {
        throw new Error('No customers found');
      }
      return res;
    } catch (error) {
      throw error;
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
      
}

export default CustomerService;
