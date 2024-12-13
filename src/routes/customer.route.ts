import express, { IRouter } from 'express';
import CustomerController from '../controllers/customer.controller';
import CustomerValidator from '../validators/customer.validator'; 
import { userAuth } from '../middlewares/auth.middleware'; 

class UserRoutes {
  private CustomerController = new CustomerController();
  private router = express.Router();
  private CustomerValidator = new CustomerValidator();  

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post(
      '/register',
      this.CustomerValidator.createCustomer, 
      this.CustomerController.createCustomer 
    );
     this.router.post(
      '',
    this.CustomerValidator.customerLogin,
    this.CustomerController.customerLogin
   );  

  };

  public getRoutes = (): IRouter => {
    return this.router; 
  };
}

export default UserRoutes;
