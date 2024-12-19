import express, { IRouter } from 'express';
import AdminController from '../controllers/admin.controller';
import AdminValidator from '../validators/admin.validator';
import { adminAuth, adminResetAuth } from '../middlewares/auth.middleware';

class AdminRoutes {
    private router = express.Router();
    private adminController = new AdminController();
    private adminValidator = new AdminValidator();

    constructor() {
        this.routes();
    }

    private routes = () => {

        // Admin login route
        this.router.post('', this.adminValidator.loginAdmin, this.adminController.loginAdmin);

        // Admin registration route
        this.router.post('/register', this.adminValidator.createAdmin, this.adminController.registerAdmin);
        
        // forget password route
        this.router.post('/forgot-password', this.adminValidator.validateForgotPassword, this.adminController.forgotPassword);

        // Reset Password route
        this.router.post('/reset-password', this.adminValidator.validateResetPassword, adminResetAuth, this.adminController.resetPassword);

        //refresh token route
        this.router.get('/:id/refreshtoken',this.adminController.refreshToken)
        
    };

    public getRoutes = (): IRouter => {
        return this.router;
    };
}

export default AdminRoutes;