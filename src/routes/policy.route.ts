import express, { IRouter } from "express";
import PolicyValidator from "../validators/policy.validator";
import PolicyController from "../controllers/policy.controller";
import { cusAndAgentAuth, customerAuth } from "../middlewares/auth.middleware";

class PolicyRoute {
    private router = express.Router();
    private policyController = new PolicyController();
    private policyValidator = new PolicyValidator();

    constructor(){
        this.routes();
     }
     private routes = () => {
    
        this.router.post('/', customerAuth, this.policyValidator.createPolicy, this.policyController.createPolicy);
        
        this.router.get('/', cusAndAgentAuth, this.policyController.getAllPolicy);

        this.router.get('/:id', cusAndAgentAuth, this.policyController.getPolicyById);

        this.router.put('/:id', customerAuth, this.policyValidator.createPolicy, this.policyController.updatePolicy);

        this.router.delete('/:id', customerAuth, this.policyController.deletePolicy);

     }
     public getRoutes = (): IRouter => {
        return this.router;
      };

}
export default PolicyRoute;