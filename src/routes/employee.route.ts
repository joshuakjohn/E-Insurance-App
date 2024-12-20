import express, { IRouter } from 'express';
import EmployeeController from '../controllers/employee.controller';

class EmployeeRoutes {
    private router = express.Router();
    private employeeController = new EmployeeController;

    constructor() {
        this.routes();
    }

    private routes = () => {

        // Employee login route
        this.router.post('', this.employeeController.loginEmployee);

        // Employee registration route
        this.router.post('/register', this.employeeController.registerEmployee);
        
        // forget password route
        this.router.post('/forgot-password', this.employeeController.forgotPassword);

        // Reset Password route
        this.router.post('/reset-password', this.employeeController.resetPassword);

        //refresh token route
        this.router.get('/:id/refreshtoken',this.employeeController.refreshToken)
        
    };

    public getRoutes = (): IRouter => {
        return this.router;
    };
}

export default EmployeeRoutes;