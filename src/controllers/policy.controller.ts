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
                source: policies.source
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };

    public getAllAgentPolicies = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const agentId = res.locals.id;  
            const policies = await this.policyService.getAllAgentPolicies(agentId);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: policies.data,
                source: policies.source
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };

    public getPoliciesByAgentId = async (req: Request, res: Response,  next: NextFunction) => {
        const { id } = req.params; // agentId from the route
        try {
            const policies = await this.policyService.getPoliciesByAgentId(id); 
            if (!policies.length) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: "No policies found for this agent." });
            }
            return res.status(HttpStatus.OK).json({ message: "Policies fetched successfully", data: policies });
        } catch (error) {
            next(error);
        }
    };

    public getAllPoliciesByAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const policies = await this.policyService.getAllPoliciesByAdmin();
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: policies.data,
                source: policies.source,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };
    
    public updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                data: await this.policyService.updateStatus(req.params.id, req.body.status)
            });
        }catch(error){
            next(error);
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