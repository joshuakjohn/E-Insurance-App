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

        // Admin login route
        this.router.post('', this.adminValidator.loginAdmin, this.adminController.loginAdmin);
<<<<<<< HEAD
        this.router.get('/refreshtoken/:id',this.adminController.refreshToken)
=======

        this.router.get('/refreshtoken/:id',this.adminController.refreshToken)

        // forget password route
        this.router.post('/forgot-password', this.adminValidator.validateForgotPassword, this.adminController.forgotPassword);

        // Reset Password
        this.router.post('/reset-password', this.adminValidator.validateResetPassword, this.adminController.resetPassword);
        
>>>>>>> dev
    };

    public getRoutes = (): IRouter => {
        return this.router;
    };
}

export default AdminRoutes;