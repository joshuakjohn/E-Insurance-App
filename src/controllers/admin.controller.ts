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
      next(error);
    }
  };
}

export default AdminController;