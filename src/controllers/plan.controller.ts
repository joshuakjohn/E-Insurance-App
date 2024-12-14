import { Request, Response, NextFunction } from 'express';
import PlanService from '../services/plan.service';
import HttpStatus from 'http-status-codes';

class PlanController {
    private planService = new PlanService();

    // Create a new plan
    public createPlan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const plan = await this.planService.createPlan(req.body);
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'Plan created successfully',
                plan,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default PlanController;