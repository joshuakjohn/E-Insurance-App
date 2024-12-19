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
            const {token, refreshToken,username, email} = await this.adminService.loginAdmin(req.body);
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
    public refreshToken=async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> => {
        try {
            const adminId = req.params.id;
            const token = await this.adminService.refreshToken(adminId);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                message: 'Access token refreshed successfully',
                token:token
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code:HttpStatus.BAD_REQUEST,
                message: `${error}`})
            }
        };
}

export default AdminController;