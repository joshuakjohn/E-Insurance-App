import express, { IRouter } from 'express';
import SchemeController from '../controllers/scheme.controller';
import SchemeValidator from '../validators/scheme.validator';

class SchemeRoutes {
    private router = express.Router();
    private schemeController = new SchemeController();
    private schemeValidator = new SchemeValidator();

    constructor(){
        this.routes();
     }
     private routes = () => {
    
        this.router.post('/', this.schemeValidator.createScheme, this.schemeController.createScheme);
        
        this.router.get('/', this.schemeController.getAllSchemes);

     }
     public getRoutes = (): IRouter => {
        return this.router;
      };

}
export default SchemeRoutes;