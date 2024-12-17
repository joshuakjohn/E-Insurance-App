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
        refreshToken: customerData.refreshToken, 
        message: ` ${customerData.username} logged in successfully`
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`})
    }
  };

  // Get all customers
  public getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
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
  public refreshToken=async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const refreshToken = req.headers['authorization']?.split(' ')[1];
      const token = await this.CustomerService.refreshToken( refreshToken);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        token:token
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`})
    }
  };

 
 

}

export default UserController;
