import express, { IRouter } from 'express';
import SchemeController from '../controllers/scheme.controller';
import SchemeValidator from '../validators/scheme.validator';
import { adminAuth, agentAuth, customerAuth, employeeAuth } from '../middlewares/auth.middleware';
import { cacheData } from '../middlewares/rediscache.middleware';

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
         this.router.get('/', this.schemeValidator.validatePagination, cacheData, this.schemeController.getAllSchemes);

         //route to get the scheme which match with search key
         this.router.get('/search',this.schemeController.search)

        //route to get the filter scheme
         this.router.get('/filter', this.schemeController.filter)

         //route to get a scheme by id
         this.router.get('/:id', this.schemeController.getSchemeById);

         //route to update a scheme by admin
         this.router.put('/:id', adminAuth, this.schemeValidator.updateScheme, this.schemeController.updateScheme);

         //route to delete a scheme by admin
         this.router.delete('/:id', adminAuth, this.schemeController.deleteScheme);

     }
     public getRoutes = (): IRouter => {
        return this.router;
      };

}
export default SchemeRoutes;