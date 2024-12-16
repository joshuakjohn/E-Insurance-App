import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class customerValidator {

  // Validation for customer registration
  public createCustomer = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      username: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      phno: Joi.string().pattern(/^[0-9]{10}$/).required(),
      age: Joi.number().min(18).required(),
      address: Joi.string().optional(),
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
      password:Joi.string().min(6).required()
    });
    
     const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  }
  
}

export default customerValidator;  
