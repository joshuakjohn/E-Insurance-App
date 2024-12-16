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

    public getAllPolicy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const policy = await this.policyService.getAllPolicy();
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