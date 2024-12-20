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
            const { page, limit } = req.query as unknown as { page: number; limit: number };
            const schemes = await this.schemeService.getAllSchemes(page, limit);

            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: schemes.data,
                total: schemes.total,       // Total number of records
                page: schemes.page,         // Current page
                totalPages: schemes.totalPages, // Total pages
            });
        } catch (error) {
            next(error);
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

    public search =async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const searchText=req.query.q as string
            let page = Number(req.query.page);
            let limit = Number(req.query.limit);
            const searchResult=await this.schemeService.search(searchText,page,limit)
            res.status(HttpStatus.OK).json({ 
                code: HttpStatus.OK, 
                data:searchResult 
               });
        }catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    }

}
export default SchemeController;