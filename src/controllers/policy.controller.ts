import { Request, Response, NextFunction } from 'express';
import PolicyService from '../services/policy.service';

class PolicyController{

    private policyService = new PolicyService();
    
    public createPolicy = async (req: Request, res: Response, next: NextFunction) => {
        
    };

    public getAllPolicy = async (req: Request, res: Response, next: NextFunction) => {
        
    };

    public getPolicyById = async (req: Request, res: Response, next: NextFunction) => {
        
    };

    public updatePolicy = async (req: Request, res: Response, next: NextFunction) => {
        
    };

    public deletePolicy = async (req: Request, res: Response, next: NextFunction) => {
        
    };

}
export default PolicyController;