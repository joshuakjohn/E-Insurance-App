import customer from '../models/customer.model';
import { Customer } from '../interfaces/customer.interface';
import bcrypt from 'bcrypt';

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
 
}

export default UserService;
