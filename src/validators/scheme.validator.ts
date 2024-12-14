import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

export class SchemeValidator {
  public createScheme = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      schemeName: Joi.string().required(),
      description: Joi.string().required(),
      planId: Joi.string().required(),
      eligibilityCriteria: Joi.string().required(),
      premium: Joi.number().positive().required(),
      maturityPeriod: Joi.number().positive().required(),
      coverage: Joi.number().positive().required()
    });
   
    const { error } = schema.validate(req.body);
    
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).send({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
    next();
  };
}

export default SchemeValidator;
