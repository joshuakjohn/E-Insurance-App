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
                refreshToken,
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
          const refreshToken = req.headers['authorization']?.split(' ')[1];
          const token = await this.adminService.refreshToken( refreshToken);
          res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            token:token
          });
        } catch (error) {
          res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message: `${error}`})
        }
      };

      // forget password 
      public forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
          await this.adminService.forgotPassword(req.body.email);
          res.status(HttpStatus.OK).json({
              code: HttpStatus.OK,
              message: "Reset password token sent to registered email id"
          });
        } catch (error) {
          res.status(HttpStatus.NOT_FOUND).json({
              code: HttpStatus.NOT_FOUND,
              message: 'User not found'
          });
        }
      };

      //Reset Password
      public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
          const adminId = res.locals.id;
          await this.adminService.resetPassword(req.body, adminId);

          res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Password reset successfully',
          });
        } catch (error) {
          res.status(HttpStatus.UNAUTHORIZED).send({
            code: HttpStatus.UNAUTHORIZED,
            message : error.message
          });
        }
      };
    

}

export default AdminController;