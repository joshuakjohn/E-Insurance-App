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
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };

    // Get a specific plan by ID
    public getPlanById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const planId = req.params.id;
            const plan = await this.planService.getPlanById(planId);
            if (plan) {
                res.status(HttpStatus.OK).json({ 
                    code: HttpStatus.OK, 
                    plan 
                });
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ 
                    code: HttpStatus.NOT_FOUND, 
                    message: 'Plan not found' 
                });
            }
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };

    // Get all plans
    public getAllPlans = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const plans = await this.planService.getAllPlans();
            res.status(HttpStatus.OK).json({ 
                code: HttpStatus.OK, 
                plans 
            });
        } catch (error) {
            next(error);
        }
    };

    // Update a plan by ID
    public updatePlan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const planId = req.params.id;
            const updatedPlan = await this.planService.updatePlan(planId, req.body);
            if (updatedPlan) {
                res.status(HttpStatus.OK).json({ 
                    code: HttpStatus.OK, 
                    updatedPlan 
                });
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ 
                    code: HttpStatus.NOT_FOUND, 
                    message: 'Plan not found' 
                });
            }
        } catch (error) {
            res.status(HttpStatus.NOT_FOUND).json({
                code: HttpStatus.NOT_FOUND,
                message: 'Plan not found',
            });
        }
    };

    // Delete a plan by ID
    public deletePlan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const planId = req.params.id;
            const deleted = await this.planService.deletePlan(planId);
            if (deleted) {
                res.status(HttpStatus.OK).json({ 
                    code: HttpStatus.OK, 
                    message: 'Plan deleted successfully' 
                });
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ 
                    code: HttpStatus.NOT_FOUND, 
                    message: 'Plan not found' 
                });
            }
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };
    
}

export default PlanController;