import express, { IRouter } from 'express';
import AdminController from '../controllers/admin.controller';
import AdminValidator from '../validators/admin.validator';

class AdminRoutes {
  private router = express.Router();
  private adminController = new AdminController();
  private adminValidator = new AdminValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    
    // Admin registration route
    this.router.post('/register', this.adminValidator.createAdmin, this.adminController.registerAdmin);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default AdminRoutes;