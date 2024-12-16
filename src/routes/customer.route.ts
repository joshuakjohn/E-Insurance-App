import express, { IRouter } from 'express';
import CustomerController from '../controllers/customer.controller';
import CustomerValidator from '../validators/customer.validator'; 

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
    this.CustomerController.getAllCustomers
    ); 

  };

  public getRoutes = (): IRouter => {
    return this.router; 
  };
}

export default UserRoutes;
