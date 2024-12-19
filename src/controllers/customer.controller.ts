/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import customerService from '../services/customer.service';
import { Request, Response, NextFunction } from 'express';

class UserController {
  public CustomerService = new customerService();

  /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */

  // register a new customer
  public createCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.CustomerService.createCustomer(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'customer created successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`});
    }
  };

  // login customer
  public customerLogin=async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const customerData= await this.CustomerService.customerLogin(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        token:customerData.token,
        message: ` ${customerData.username} logged in successfully`
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`})
    }
  };

  // Get all customers
  public getAllCustomers = async (req: Request,
     res: Response,
     next: NextFunction
    ) => {
    try {
        const agentId = res.locals.id;
        const data = await this.CustomerService.getAllCustomers(agentId);
        res.status(HttpStatus.OK).json({ 
            code: HttpStatus.OK, 
            data 
        });
    } catch (error) {
        next(error);
    }
  };
  
  public refreshToken = async (req: Request,
     res: Response, 
     next: NextFunction
    ): Promise<any> => {
    try {
      const customerId = req.params.id;
      const newAccessToken = await this.CustomerService.refreshToken(customerId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Access token refreshed successfully',
        token: newAccessToken,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };
  public payPremium =async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const paymentDetails= await this.CustomerService.payPremium (req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data:paymentDetails,
       message:'payment is successful'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`})
    }
  };

 

}

export default UserController;
