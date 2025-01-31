import express, { IRouter } from "express";
import PolicyValidator from "../validators/policy.validator";
import PolicyController from "../controllers/policy.controller";
import { adminAuth, agentAuth, customerAuth, employeeAuth } from "../middlewares/auth.middleware";
import { cacheData } from "../middlewares/rediscache.middleware";
import { policyProof } from "../config/multer";

class PolicyRoute {
    private router = express.Router();
    private policyController = new PolicyController();
    private policyValidator = new PolicyValidator();

    constructor(){
        this.routes();
     }
     private routes = () => {
         //route to create a policy by customer
         this.router.post('/', customerAuth, policyProof, this.policyValidator.createPolicy, this.policyController.createPolicy);
         
         //route to get all policy by customer
         this.router.get('/', customerAuth, this.policyValidator.validatePagination, cacheData, this.policyController.getAllPolicies);

         //route to get all policy by agent
         this.router.get('/agent', agentAuth, this.policyValidator.validatePagination, cacheData, this.policyController.getAllAgentPolicies);

        //route to get all policy by admin
        this.router.get('/admin', adminAuth, cacheData, this.policyController.getAllPoliciesByAdmin);

        // route to get all policies associated with an agent by admin
        this.router.get('/:id', adminAuth, cacheData, this.policyController.getPoliciesByAgentId);

         //route to update status of policy
         this.router.patch('/:id', this.policyController.updateStatus);

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

         //route to get policy by id, by employee
         this.router.get('/:id/employee', employeeAuth, this.policyController.getPolicyById);

         //route to update policy by agent
         this.router.put('/:id/agent', agentAuth, this.policyValidator.createPolicy, this.policyController.updatePolicy);

         //route to update policy by admin
         this.router.put('/:id/admin', adminAuth, this.policyValidator.createPolicy, this.policyController.updatePolicy);

         //route to delete policy by admin
         this.router.delete('/:id/admin', adminAuth, this.policyController.deletePolicy);

         //route to get all customer policy by agent
         this.router.get('/:id/getall/agent', agentAuth, cacheData, this.policyController.getAllPolicies);

         //route to get all policy by admin
         this.router.get('/:id/getall/admin', adminAuth, this.policyValidator.validatePagination, cacheData, this.policyController.getAllPolicies);

         //route to get all policy by employee
         this.router.get('/:id/getall/employee', employeeAuth, this.policyValidator.validatePagination, cacheData, this.policyController.getAllPolicies);

     }
     
     public getRoutes = (): IRouter => {
        return this.router;
      };

}
export default PolicyRoute;