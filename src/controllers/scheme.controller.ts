import { Request, Response, NextFunction } from 'express';
import SchemeService from '../services/scheme.service';
import HttpStatus from 'http-status-codes';

class SchemeController{
    private schemeService = new SchemeService();
    
    public createScheme = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const plan = await this.schemeService.createScheme(req.body);
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                message: 'scheme created successfully',
                plan:plan,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };




}
export default SchemeController;