import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

class PlanValidator {
    public createPlan = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object({
            planName: Joi.string().min(3).required(),
            description: Joi.string().optional(),
            category: Joi.string().required(),
            isActive: Joi.boolean().optional(),
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
}

export default PlanValidator;


