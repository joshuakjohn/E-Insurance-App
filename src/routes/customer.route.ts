import express, { IRouter } from 'express';
import CustomerController from '../controllers/customer.controller';
import CustomerValidator from '../validators/customer.validator'; 
import upload from '../config/multer';
import { adminAuth, agentAuth, customerAuth, customerResetAuth, employeeAuth } from '../middlewares/auth.middleware';

class UserRoutes {
  private CustomerController = new CustomerController();
  private router = express.Router();
  private CustomerValidator = new CustomerValidator();  

  constructor() {
    this.routes();
  }

  private routes = () => {

    //route to login a customer
    this.router.post('', this.CustomerValidator.customerLogin, this.CustomerController.customerLogin); 

    //route to get all customer, by agent
    this.router.get('', agentAuth, this.CustomerController.getAllCustomers);

    this.router.get('/getcustomer',customerAuth,this.CustomerController.getCustomerById)
    //route to register a customer
    this.router.post( '/register', upload.single('profilePhoto'), this.CustomerValidator.createCustomer, this.CustomerController.createCustomer);
    
    //route for customer to pay premium
    this.router.post('/paypremium', customerAuth, this.CustomerController.payPremium);

    // forget password route
    this.router.post('/forgot-password', this.CustomerValidator.validateForgotPassword, this.CustomerController.forgotPassword);
    
    // Reset Password route
    this.router.post('/reset-password', customerResetAuth, this.CustomerValidator.validateResetPassword, this.CustomerController.resetPassword);
    
    //route to refresh token
    this.router.get('/:id/refreshtoken', this.CustomerController.refreshToken);

    //route to get all customer, by admin
    this.router.get('/:id/admin', adminAuth, this.CustomerController.getAllCustomers);

    //route to get all customer, by employee
    this.router.get('/:id/employee', employeeAuth, this.CustomerController.getAllCustomers);

   

  };

  public getRoutes = (): IRouter => {
    return this.router; 
  };
}

export default UserRoutes;
