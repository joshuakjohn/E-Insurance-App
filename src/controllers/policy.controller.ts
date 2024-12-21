import { Request, Response, NextFunction } from 'express';
import PolicyService from '../services/policy.service';
import HttpStatus from 'http-status-codes';


class PolicyController{

    private policyService = new PolicyService();
    
    public createPolicy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const policy = await this.policyService.createPolicy(req.body);
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'Policy created successfully',
                data: policy
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };


    public getAllPolicies = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let customerId;
            const { page, limit } = req.query as unknown as { page: number; limit: number }; // Pagination parameters
            if(req.params.id === undefined){
                customerId = res.locals.id; // Customer ID from middleware
            } else {
                customerId = req.params.id;
            }  
            const policies = await this.policyService.getAllPolicies(customerId, page, limit);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: policies.data,
                total: policies.total,
                page: policies.page,
                totalPages: policies.totalPages,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };

    public getPolicyById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const policy = await this.policyService.getPolicyById(req.params.id);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: policy
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };

    public updatePolicy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const policy = await this.policyService.updatePolicy(req.params.id, req.body);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                message: 'Policy updated successfully',
                data: policy
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };

    public deletePolicy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const policy = await this.policyService.deletePolicy(req.params.id);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                message: 'Policy deleted successfully'
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };

}
export default PolicyController;