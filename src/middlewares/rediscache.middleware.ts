import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redis';
import HttpStatus from 'http-status-codes';

export const cacheData = async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit } = req.query as unknown as { page: number; limit: number };
    const basePath = req.baseUrl.split('/').pop(); // Extracts 'plan', 'policy' or 'scheme' from the route
    let cacheKey = '';

    try {
        if (basePath === 'plan') {
            cacheKey = `plans:page=${page}:limit=${limit}`;
        } else if (basePath === 'policy') {
            const customerId = req.params.id || res.locals.id; // Customer ID from route params or middleware
            cacheKey = `policies:customer:${customerId}`;
        } else if (basePath === 'policy' && res.locals.id) {
            const agentId = res.locals.id; // Agent ID from middleware
            cacheKey = `policies:agent:${agentId}:page=${page}:limit=${limit}`;
        } else if (basePath === 'scheme') {
            cacheKey = `schemes:page=${page}:limit=${limit}`;
        } else if (basePath === 'customer') {
            const agentId = req.params.id || res.locals.id; // Agent ID from route params or middleware
            cacheKey = `customers:agent:${agentId}:page=${page}:limit=${limit}`;
        } else {
            return next(); // Skip caching if the route doesn't match 'plan', 'policy', 'scheme' or 'customer'
        }

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
