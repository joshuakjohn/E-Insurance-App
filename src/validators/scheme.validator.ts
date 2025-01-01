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
      coverage: Joi.number().positive().required(),
      requiredDocuments: Joi.array().items(Joi.string().required()).required(), 
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
  public updateScheme = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      schemeName: Joi.string().optional(),
      description: Joi.string().optional(),
      planId: Joi.string().optional(),
      eligibilityCriteria: Joi.string().optional(),
      premium: Joi.number().positive().optional(),
      maturityPeriod: Joi.number().positive().optional(),
      coverage: Joi.number().positive().optional()

    });

    const { error } = schema.validate(req.body);

    if (error) {
        res.status(HttpStatus.BAD_REQUEST).send({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
        return;
    }
    next();
  };

  public validatePagination = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
        page: Joi.number().integer().min(1).optional().default(1),
        limit: Joi.number().integer().min(1).max(100).optional().default(10),
    });

    const { error, value } = schema.validate(req.query);

    if (error) {
        res.status(HttpStatus.BAD_REQUEST).send({
            code: HttpStatus.BAD_REQUEST,
            message: error.message,
        });
        return;
    }

    req.query = value; // Overwrite query with validated values
    next();
  };
}

export default SchemeValidator;
