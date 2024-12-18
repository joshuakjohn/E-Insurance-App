import express, { IRouter } from 'express';
import CustomerController from '../controllers/customer.controller';
import CustomerValidator from '../validators/customer.validator'; 
import { agentAuth } from '../middlewares/auth.middleware';

class UserRoutes {
  private CustomerController = new CustomerController();
  private router = express.Router();
  private CustomerValidator = new CustomerValidator();  

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to register a customer
    this.router.post(
      '/register',
      this.CustomerValidator.createCustomer, 
      this.CustomerController.createCustomer 
    );

    //route to login a customer
    this.router.post(
      '',
      this.CustomerValidator.customerLogin,
      this.CustomerController.customerLogin
    ); 
   
   //route to get all customer
   this.router.get(
    '/',
    agentAuth,
    this.CustomerController.getAllCustomers
    ); 
    
    this.router.get('/refreshtoken/',this.CustomerController.refreshToken)

    // forget password route
    this.router.post(
      '/forgot-password',
      this.CustomerValidator.validateForgotPassword,
      this.CustomerController.forgotPassword
    );
    
  };

  public getRoutes = (): IRouter => {
    return this.router; 
  };
}

export default UserRoutes;
