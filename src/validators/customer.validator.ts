import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

class customerValidator {

  // Validation for customer registration
  public createCustomer = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      username: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(6)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .message("Password must contain at least one uppercase letter, one lowercase letter, and one special character")
        .required(),
      phno: Joi.string().pattern(/^[0-9]{10}$/).required(),
      region:Joi.string().required(),
      age: Joi.number().min(18).required(),
      address: Joi.string().optional(),
      gender:Joi.string().required().valid('Male', 'Female', 'Other')
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      next(error);
    }
    next();
  };

  // Validation for customer login
  public customerLogin = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email:Joi.string().email().required(),
      password: Joi.string().required()    
      });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  }

  // Validation for forget password
  public validateForgotPassword = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
  
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).send({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
      return;
    }
    next();
  };

  // Validation for reset password
  public validateResetPassword = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      newPassword: Joi.string()
        .min(6)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .message("Password must contain at least one uppercase letter, one lowercase letter, and one special character")
        .required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).send({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
      return;
    }
    next();
  };
  
  // Validation for pagination
  public validatePagination = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      page: Joi.number().integer().min(1).optional().default(1),
      limit: Joi.number().integer().min(1).max(100).optional().default(3),
    });
  
    const { error, value } = schema.validate(req.query);
  
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).send({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
      return;
    }
  
    req.query = value;
    next();
  };
  public paypremium = (req: Request, res: Response, next: NextFunction): void => {
    // Sample payload expected: { policyId, agentId, paymentAmount }
    const schema = Joi.object({
      policyId: Joi.string().required(),  // Assuming policyId is a valid ObjectId (24 chars)
      agentId: Joi.string().required(),   // Assuming agentId is also a valid ObjectId
      paymentAmount: Joi.number().positive().required() // Payment amount should be a positive number
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).send({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
      return;
    }
    next();
  };
  
}

export default customerValidator;  
