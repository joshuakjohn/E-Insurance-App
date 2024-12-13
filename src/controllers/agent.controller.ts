import { Request, Response, NextFunction } from 'express';
import AgentService from "../services/agent.service";
import httpstatus from "http-status-codes";
import { log } from 'winston';


class AgentController{

    public agentService = new AgentService()

    public agentLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{

        } catch(error) {
            console.log(error)
        }

    }

    public agentSignup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            console.log('reached controller')
            const data = await this.agentService.signup(req.body)
            res.status(httpstatus.CREATED).json({
                code: httpstatus.CREATED,
                message: data
            })
        } catch(error) {
            console.log(error);
            
        }
    };

}

export default AgentController