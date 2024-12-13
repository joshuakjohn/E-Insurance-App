import Joi from "@hapi/joi";
import { NextFunction, Request, Response } from "express";


class AgentValidator{

    public newAgent = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(4).required(),
          phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
          region: Joi.string().required()
        });
        const { error } = schema.validate(req.body);
        if (error) {
          next(error);
        }
        next();
      };

}

export default AgentValidator