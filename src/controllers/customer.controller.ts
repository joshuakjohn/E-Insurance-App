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

      const customerImage = req.files['image']?.[0];

      req.body.profilePhoto = customerImage
        ? customerImage.buffer
        : null

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
        username: customerData.username,
        email: customerData.email,
        profilePhoto: customerData.customerImage,
        message: ` ${customerData.username} logged in successfully`
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`})
    }
  };

      // Get all Agents
      public getAllCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customers = await this.CustomerService.getAllCustomer();
            res.status(HttpStatus.OK).json({ 
                code: HttpStatus.OK, 
                data: customers.data,
                source: customers.source
            });
        } catch (error) {
            next(error);
        }
    };

  // Get all agent specific customers
  public getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let agentId;
      const { page, limit } = req.query as unknown as { page: number; limit: number };
  
      if (req.params.id === undefined) {
        agentId = res.locals.id; // Retrieve agentId from middleware
      } else {
        agentId = req.params.id;
      }
  
      const customers = await this.CustomerService.getAllCustomers(agentId, page, limit);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: customers.data,
        total: customers.total,
        page: customers.page,
        totalPages: customers.totalPages,
        source: customers.source,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`,
      });
    }
  };
  
  public getCustomerById=async(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try{
     const customer=await this.CustomerService.getCustomerById(res.locals.id)
     res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data:customer,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`})
  }
}
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


  // forget password 
  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.CustomerService.forgotPassword(req.body.email);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: "Reset password token sent to registered email id"
      });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'User not found'
      });
    }
  };

  //Reset Password
  public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const customerId = res.locals.id;
      await this.CustomerService.resetPassword(req.body, customerId);

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Password reset successfully',
      });
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).send({
        code: HttpStatus.UNAUTHORIZED,
        message : error.message
      });
    }
  };
  
 

}

export default UserController;
