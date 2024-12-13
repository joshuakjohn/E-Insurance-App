import bcrypt from 'bcrypt';
import { IAgent } from "../interfaces/agent.interface"
import agentModel from "../models/agent.model"

class AgentService{

    public signup = async (body: IAgent): Promise<any> => {
        try{
            const res = await agentModel.findOne({email: body.email});
            if(!res){
                try{
                    body.password = await bcrypt.hash(body.password, 10);
                  }catch(err){
                    throw new Error("Error occured in hash: "+err);
                  }
                await agentModel.create(body)
                return "Agent created successfully"
            }
            else
                return "User already exist"
        } catch(error){
            console.log(error)
        }
        
    } 

}

export default AgentService