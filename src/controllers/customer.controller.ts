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
  public customerLogin=async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const token= await this.CustomerService.customerLogin(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.CREATED,
        token:token[0],
        message: ` ${token[1]} logged in successfully`
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`})
    }
  };
 

}

export default UserController;
