import express, { IRouter } from "express";
import PolicyValidator from "../validators/policy.validator";
import PolicyController from "../controllers/policy.controller";

class PolicyRoute {
    private router = express.Router();
    private policyController = new PolicyController();
    private policyValidator = new PolicyValidator();

    constructor(){
        this.routes();
     }
     private routes = () => {
    
        this.router.post('/', this.policyValidator.createPolicy, this.policyController.createPolicy);
        
        this.router.get('/', this.policyController.getAllPolicy);

        this.router.get('/:id', this.policyController.getPolicyById);

        this.router.put('/:id', this.policyValidator.createPolicy, this.policyController.updatePolicy);

        this.router.delete('/:id', this.policyController.deletePolicy);

     }
     public getRoutes = (): IRouter => {
        return this.router;
      };

}
export default PolicyRoute;