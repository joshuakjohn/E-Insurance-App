import { Request, Response, NextFunction } from 'express';
import AgentService from "../services/agent.service";
import httpstatus from "http-status-codes";


class AgentController{

    public agentService = new AgentService()

    // Agent login
    public agentLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            const data = await this.agentService.signin(req.body)
            res.status(httpstatus.ACCEPTED).json({
                code: httpstatus.ACCEPTED,
                data: data
            })
        } catch(error) {
            res.status(httpstatus.UNAUTHORIZED).json({
                code: httpstatus.UNAUTHORIZED,
                message: error.message
            })
        }

    }

    // Agent Registration
    public agentSignup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            const data = await this.agentService.signup(req.body)
            res.status(httpstatus.CREATED).json({
                code: httpstatus.CREATED,
                message: data
            })
        } catch(error) {
            res.status(httpstatus.CONFLICT).json({
                code: httpstatus.CONFLICT,
                message: error.message
            })
        }
    };

    // Get all Agents
    public getAllAgents = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.agentService.getAllAgents();
            res.status(httpstatus.OK).json({ 
                code: httpstatus.OK, 
                data 
            });
        } catch (error) {
            next(error);
        }
    };

    public refreshToken=async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> => {
        try {
            const agentId=req.params.id;
            const token = await this.agentService.refreshToken(agentId);
            res.status(httpstatus.OK).json({
                code: httpstatus.OK,
                message: 'Access token refreshed successfully',
                token:token
            });
        } catch (error) {
            res.status(httpstatus.BAD_REQUEST).json({
                code: httpstatus.BAD_REQUEST,
                message: error.message 
            })
        };
    }
}



export default AgentController