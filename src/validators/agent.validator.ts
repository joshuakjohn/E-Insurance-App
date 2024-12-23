import Joi from "@hapi/joi";
import { NextFunction, Request, Response } from "express";
import HttpStatus from 'http-status-codes';

class AgentValidator{

    public newAgent = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object({
          username: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string()
            .min(6)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
            .message("Password must contain at least one uppercase letter, one lowercase letter, and one special character")
            .required(),
          phno: Joi.string().pattern(/^[0-9]{10}$/).required(),
          region: Joi.string().required()
        });
        const { error } = schema.validate(req.body);
        if (error) {
          next(error);
        }
        next();
      };

      // Validation for agent login
      public loginAgent = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string()
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

}

export default AgentValidator