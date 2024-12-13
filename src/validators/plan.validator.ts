import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

class PlanValidator {
    public createPlan = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            details: Joi.string().required(),
            rateOfInterest: Joi.number().positive().optional(),
            eligibilityCriteria: Joi.string().optional(),
            schemeId: Joi.string().required()
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


