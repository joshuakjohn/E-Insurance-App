import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

export class SchemeValidator {
  public createScheme = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      schemeName: Joi.string().required(),
      schemeDetails: Joi.string().required(),
      plan: Joi.string().required(),
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
