import { Customer } from '../interfaces/customer.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import agent from '../models/agent.model'; 
import customer from '../models/customer.model'


class UserService {

  // customer registration
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
      const payload = {userId: customerData._id,email: customerData.email};
      const token = jwt.sign(payload, process.env.CUSTOMER_SECRET);
      return { token, username: customerData.username };
    
  }

  // Get all customers
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
  

 
}

export default UserService;