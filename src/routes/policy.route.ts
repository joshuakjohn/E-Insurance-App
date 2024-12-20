import express, { IRouter } from "express";
import PolicyValidator from "../validators/policy.validator";
import PolicyController from "../controllers/policy.controller";
import { adminAuth, agentAuth, customerAuth } from "../middlewares/auth.middleware";

class PolicyRoute {
    private router = express.Router();
    private policyController = new PolicyController();
    private policyValidator = new PolicyValidator();

    constructor(){
        this.routes();
     }
     private routes = () => {

         //route to create a policy by customer
         this.router.post('/', customerAuth, this.policyValidator.createPolicy, this.policyController.createPolicy);
         
         //route to get all policy by customer
         this.router.get('/', customerAuth, this.policyValidator.validatePagination, this.policyController.getAllPolicies);

         //route to update policy by customer
         this.router.put('/:id', customerAuth, this.policyValidator.createPolicy, this.policyController.updatePolicy);

         //route to delete policy by customer
         this.router.delete('/:id', customerAuth, this.policyController.deletePolicy);

         //route to get policy by id, by customer
         this.router.get('/:id', customerAuth, this.policyController.getPolicyById);

         //route to get policy by id, by agent
         this.router.get('/:id/agent', agentAuth, this.policyController.getPolicyById);

         //route to get policy by id, by admin
         this.router.get('/:id/admin', adminAuth, this.policyController.getPolicyById);

         //route to get all policy by agent
         this.router.get('/:id/agent/all', agentAuth, this.policyValidator.validatePagination, this.policyController.getAllPolicies);

         //route to get all policy by admin
         this.router.get('/:id/admin/all', adminAuth, this.policyController.getAllPolicy);
     }
     
     public getRoutes = (): IRouter => {
        return this.router;
      };

}
export default PolicyRoute;