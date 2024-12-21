import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redis';
import HttpStatus from 'http-status-codes';


export const cachePlans = async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit } = req.query as unknown as { page: number; limit: number };
    const cacheKey = `plans:page=${page}:limit=${limit}`;

    try {
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            return res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: parsedData.data,
                total: parsedData.total,
                page: parsedData.page,
                totalPages: parsedData.totalPages,
                source: 'Redis Cache',
            });
        }

        next(); // Proceed to controller if cache is not available
    } catch (error) {
        next(error);
    }
};
