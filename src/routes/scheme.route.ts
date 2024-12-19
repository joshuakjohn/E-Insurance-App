import express, { IRouter } from 'express';
import SchemeController from '../controllers/scheme.controller';
import SchemeValidator from '../validators/scheme.validator';
import { adminAuth, agentAuth, customerAuth } from '../middlewares/auth.middleware';

class SchemeRoutes {
    private router = express.Router();
    private schemeController = new SchemeController();
    private schemeValidator = new SchemeValidator();

    constructor(){
        this.routes();
     }
     private routes = () => {
    
         // route to create a scheme by admin
         this.router.post('/', adminAuth, this.schemeValidator.createScheme, this.schemeController.createScheme);
         
         //route to get all schemes by admin
         this.router.get('/', adminAuth, this.schemeController.getAllSchemes);

         //route to get all schemes by customer
         this.router.get('/customer', customerAuth, this.schemeController.getAllSchemes);

         //route to get all schemes by agent
         this.router.get('/agent', agentAuth, this.schemeController.getAllSchemes);

         //route to get a scheme by id, by admin
         this.router.get('/:id', adminAuth, this.schemeController.getSchemeById);

         //route to update a scheme by admin
         this.router.put('/:id', adminAuth, this.schemeValidator.updateScheme, this.schemeController.updateScheme);

         //route to delete a scheme by admin
         this.router.delete('/:id', adminAuth, this.schemeController.deleteScheme);

         //route to get a scheme by id, by customer
         this.router.get('/:id/customer', customerAuth, this.schemeController.getSchemeById);

         //route to get a scheme by id, by agent
         this.router.get('/:id/agent', agentAuth, this.schemeController.getSchemeById);

     }
     public getRoutes = (): IRouter => {
        return this.router;
      };

}
export default SchemeRoutes;