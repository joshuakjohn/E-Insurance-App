/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const auth = (secret_token1: string, secret_token2?:string) => {
  return async (
  req: Request,
  res: Response,
  next: NextFunction
  ): Promise<void> => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken)
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };
      bearerToken = bearerToken.split(' ')[1];
      if(secret_token2 === undefined){
        const { userId }: any = await jwt.verify(bearerToken, secret_token1);
        res.locals.id = userId;
      } else {
        try{
          const { userId }: any = await jwt.verify(bearerToken, secret_token1);
          res.locals.id = userId;
        } catch(error){
          console.log('customer validation failed')
          await jwt.verify(bearerToken, secret_token2);
        }
        // res.locals.id = userId;
      }
      
      next();
    } catch (error) {
      next(error);
    }
  };
}

export const agentAuth = auth(process.env.AGENT_SECRET);

export const customerAuth = auth(process.env.CUSTOMER_SECRET)

export const adminAuth = auth(process.env.ADMIN_SECRET)

export const employeeAuth = auth(process.env.EMPLOYEE_SECRET)

export const agentResetAuth = auth(process.env.AGENT_RESET_SECRET)

export const customerResetAuth = auth(process.env.CUSTOMER_RESET_SECRET)

export const adminResetAuth = auth(process.env.ADMIN_RESET_SECRET)

export const employeeResetAuth = auth(process.env.EMPLOYEE_RESET_SECRET)