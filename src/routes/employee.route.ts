import express, { IRouter } from 'express';
import EmployeeController from '../controllers/employee.controller';
import EmployeeValidator from '../validators/employee.validator';
import { adminAuth, employeeResetAuth } from '../middlewares/auth.middleware';
import { employeeResetAuth } from '../middlewares/auth.middleware';

class EmployeeRoutes {
    private router = express.Router();
    private employeeController = new EmployeeController;
    private employeeValidator = new EmployeeValidator

    constructor() {
        this.routes();
    }

    private routes = () => {

        // Employee login route
        this.router.post('', this.employeeValidator.loginEmployee, this.employeeController.loginEmployee);

        // get all employee by admin
        this.router.get('', adminAuth, this.employeeController.getAllEmployee);

        // Employee registration route
        this.router.post('/register', this.employeeValidator.createEmployee, this.employeeController.registerEmployee);
        
        // forget password route
        this.router.post('/forgot-password', this.employeeValidator.validateForgotPassword, this.employeeController.forgotPassword);

        // Reset Password route
        this.router.post('/reset-password', employeeResetAuth, this.employeeValidator.validateResetPassword, this.employeeController.resetPassword);

        //refresh token route
        this.router.get('/:id/refreshtoken',this.employeeController.refreshToken)
        
    };

    public getRoutes = (): IRouter => {
        return this.router;
    };
}

export default EmployeeRoutes;