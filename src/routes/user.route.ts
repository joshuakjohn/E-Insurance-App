import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import CustomerValidator from '../validators/customer.validator';  // Fixed path and capitalization
import { userAuth } from '../middlewares/auth.middleware'; 

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private CustomerValidator = new CustomerValidator();  // Corrected instantiation

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post(
      '/customer/register',
      this.CustomerValidator.createCustomer, 
      this.UserController.createCustomer 
    );
  };

  public getRoutes = (): IRouter => {
    return this.router; 
  };
}

export default UserRoutes;
