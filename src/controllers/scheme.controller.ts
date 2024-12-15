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

    public getAllSchemes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const scheme = await this.schemeService.getAllSchemes();
            res.status(HttpStatus.OK).json({ 
                code: HttpStatus.OK, 
               scheme:scheme 
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`
            });
        }
    };


    public getSchemeById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const scheme  = await this.schemeService.getSchemeById(req.params.id);
                res.status(HttpStatus.OK).json({ 
                    code: HttpStatus.OK, 
                    scheme:scheme
                });
            } catch (error) {
               res.status(HttpStatus.BAD_REQUEST).json({
                   code: HttpStatus.BAD_REQUEST,
                   message: `${error}`,
            });
        }
    };

    public updateScheme = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedScheme = await this.schemeService.updateScheme(req.params.id, req.body);
                res.status(HttpStatus.OK).json({ 
                    code: HttpStatus.OK, 
                    Scheme:updatedScheme,
                    message:'scheme updated successfully'
                });
            } catch (error) {
            res.status(HttpStatus.NOT_FOUND).json({
                 code: HttpStatus.NOT_FOUND,
                 message: 'Plan not found',
            });
        }
    };

    public deleteScheme = async (req: Request, res: Response, next: NextFunction) => {
        try {
              await this.schemeService.deleteScheme(req.params.id);
                 res.status(HttpStatus.OK).json({ 
                 code: HttpStatus.OK, 
                 message: 'scheme deleted successfully' 
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