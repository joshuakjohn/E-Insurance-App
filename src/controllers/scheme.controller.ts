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
            const planId=req.params.id
            const { page, limit } = req.query as unknown as { page: number; limit: number };
            const schemes = await this.schemeService.getAllSchemes(planId,page, limit);

            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: schemes.data,
                total: schemes.total,       // Total number of records
                page: schemes.page,         // Current page
                totalPages: schemes.totalPages, // Total pages
                source: schemes.source
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

    public search = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchText = req.query.search ? String(req.query.search) : ''; // Ensure searchText is a string, default to empty string if not provided
            const page = Number(req.query.page) || 1; // Default to page 1 if not provided
            const limit = Number(req.query.limit) || 10; // Default to 10 items per page if not provided
            const sortOrder = req.query.sortOrder as 'asc' | 'desc' || 'asc';
            const planId = req.query.planId as string; // Get planId from query parameters
    
            const searchResult = await this.schemeService.search(searchText, page, limit, sortOrder, planId);
    
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: searchResult,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `${error}`,
            });
        }
    };
    
    public filter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sortOrder: 'asc' | 'desc' = req.query.sortOrder === 'desc' ? 'desc' : 'asc';
            const planId = req.query.planId as string; // Get planId from query parameters
    
            const filterResult = await this.schemeService.filter(sortOrder, planId);
    
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: filterResult,
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