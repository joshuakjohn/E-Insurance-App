import customer from '../models/customer.model';
import { Customer } from '../interfaces/customer.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  public createCustomer = async (body: Customer): Promise<Customer> => {
    try {
      const existingCustomer = await customer.findOne({ email: body.email });
      if (existingCustomer) {
        throw new Error('Customer with this email already exists.');
      }
      const hashedPassword = await bcrypt.hash(body.password, 10);
      body.password = hashedPassword;
      const newCustomer = await customer.create(body);
      return newCustomer;

    } catch (error) {
      throw new Error(`Error creating customer: ${error.message}`);
    }
  };
  public customerLogin = async (body: Customer): Promise<any> => {
      const customerData = await customer.findOne({ email: body.email });
      if (!customerData) {
        throw new Error('Customer not found');
      }
      const isMatch = await bcrypt.compare(body.password, customerData.password);

      if (!isMatch) {
        throw new Error('Invalid password');
      }
      const payload = {id: customerData._id,email: customerData.email};
      const token = jwt.sign(payload, process.env.CUSTOMER_SECRET);
      return [token,customerData.username];
    
  }
 
}

export default UserService;
