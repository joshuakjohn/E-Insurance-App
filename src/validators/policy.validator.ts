import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

export class PolicyValidator {
  public createPolicy = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      policyName: Joi.string().required(),
      description: Joi.string().required(),
      planId: Joi.string().required(),
      customerId: Joi.string().required(),
      schemeId: Joi.string().required(),
      agentId: Joi.string().required(),
      premiumPaid: Joi.number().positive().required(),
      policyStartDate: Joi.date().required(),
      policyEndDate : Joi.date().required(),
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

export default PolicyValidator;