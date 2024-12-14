import { Request, Response, NextFunction } from 'express';
import AdminService from '../services/admin.service';
import HttpStatus from 'http-status-codes';

class AdminController {
  private adminService = new AdminService();

  // Admin registration
    public registerAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const message = await this.adminService.createAdmin(req.body);
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`});
        }
    };

    // Admin login
    public loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [token, username, email] = await this.adminService.loginAdmin(req.body);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                token,
                email,
                message: `${username} logged in successfully as admin`,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };
}

export default AdminController;