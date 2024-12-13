import bcrypt from 'bcrypt';
import { IAgent } from "../interfaces/agent.interface"
import agentModel from "../models/agent.model"
import jwt from 'jsonwebtoken';

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
                throw new Error("User already exist")
        } catch(error){
            throw new Error(error.message)
        }
        
    } 

    public signin = async (body): Promise<any> => {
        const res = await agentModel.findOne({email: body.email});
    if (!res) {
      throw new Error("Invalid email"); // User not found
    }
    const match = await bcrypt.compare(body.password, res.password);
    if(match){
      const token = jwt.sign({ userId: res._id, email: res.email }, process.env.AGENT_SECRET);
      return {
        message: "Login Successful",
        name: res.name,
        token: token
      }   
    }
    else{
      throw new Error("Incorrect password");
    }
    }

}

export default AgentService