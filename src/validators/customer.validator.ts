import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class customerValidator {
  public createCustomer = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      username: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
      age: Joi.number().min(18).required(),
      address: Joi.string().optional(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      next(error);
    }
    next();
  };
}

export default customerValidator;  
