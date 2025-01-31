import bcrypt from 'bcrypt';
import { IAgent } from "../interfaces/agent.interface"
import agentModel from "../models/agent.model"
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/user.util';
import redisClient from '../config/redis';
import Levenshtein from 'fast-levenshtein'; // Default import


class AgentService{

    public signup = async (body: IAgent): Promise<any> => {
        try{
            const res = await agentModel.findOne({email: body.email});
            if(!res){
                try{
                  const normalizedRegion = body.region.replace(/\s+/g, '').toLowerCase();
                  body.region = normalizedRegion;
                    body.password = await bcrypt.hash(body.password, 10);
                }catch(err){
                    throw new Error("Error occured in hash: "+err);
                }
                await agentModel.create(body)

                // Invalidate cache for all agents
                await redisClient.flushAll();

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
      if(res.status === 'Waiting for approval'){
        throw new Error("Agent not approved");
      }
      const payload = { userId: res._id, email: res.email };
      const token = jwt.sign({ userId: res._id, email: res.email }, process.env.AGENT_SECRET);
      const refreshToken = jwt.sign(payload, process.env.AGENT_SECRET, { expiresIn: '7d' });
      await agentModel.findByIdAndUpdate(res._id, { refreshToken });

      return {
        message: "Login Successful",
        email: res.email,
        username: res.username,
        profilePhoto: res.profilePhoto,
        token: token,
      }   
    }
    else{
      throw new Error("Incorrect password");
    }
    }

    // Get all agents
    public getAllAgents = async (): Promise<{data: IAgent[]; source: string}> => {
        try {
            const cachedData = await redisClient.get('agents:all'); 
            if (cachedData) {
              return {
                data: JSON.parse(cachedData),
                source: 'Redis Cache',
              };
            }
            const res = await agentModel.find().select('-password -refreshToken');
            if(!res || res.length === 0) {
                throw new Error('No plans found');
            }
            // Cache the agents data for 60 seconds
            await redisClient.setEx('agents:all', 60, JSON.stringify(res));

            return {
              data: res,
              source: 'Database'
            };
        } catch (error) {
            throw error;
        }
    };

    public getAgentById = async(agentId:string):Promise<any> =>{
      try {
        const res = await agentModel.findById(agentId).select('-password -refreshToken');
        if(!res) {
          throw new Error('agent not found');
        }
        return res;
      } catch (error) {
        throw error;
      }
    };
    
    public updateStatus = async (id: string, status: string ): Promise<any> => {
      const doc: IAgent = await agentModel.findOne({_id: id});
      await redisClient.flushAll();
      return {data: await agentModel.findByIdAndUpdate(id, {status: status}, {new: true}),
        message: "Status updated successfully"
      }  
    }

    public refreshToken = async (agentId: string): Promise<any> => {
      try {
        const agentRecord=await agentModel.findById(agentId);
        const refreshToken=agentRecord.refreshToken;
        if (!refreshToken) {
          throw new Error('Refresh token is missing');
        }
        const payload : any= jwt.verify(refreshToken, process.env.AGENT_SECRET );
        const { userId, email } = payload;
        const newAccessToken = jwt.sign({ userId, email }, process.env.AGENT_SECRET, { expiresIn: '1h' });
        return newAccessToken;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);  
      } 
    };

    // forget password
    public forgotPassword = async (email: string): Promise<void> => {
      try{
        const agentData = await agentModel.findOne({ email });
        if (!agentData) {
          throw new Error('Email not found');
        }
        const token = jwt.sign({ userId: agentData._id }, process.env.AGENT_RESET_SECRET, { expiresIn: '1h' });
        await sendEmail(email, token);
      } catch(error){
        throw new Error("Error occured cannot send email: "+error)
      }
    };
  
    //reset password
    public resetPassword = async (body: any, userId): Promise<void> => {
      try {
          const agentData = await agentModel.findById(userId);
          if (!agentData) {
              throw new Error('User not found');
          }

          const hashedPassword = await bcrypt.hash(body.newPassword, 10);
          agentData.password = hashedPassword;
          await agentData.save();

      } catch (error) {
          throw new Error(`Error resetting password: ${error.message}`);
      }
    };
    public getAgentRegion = async (): Promise<string> => {
      try {
        const agentRegions = await agentModel.find({}, { region: 1, _id: 0 });
    
        // Normalize regions to lowercase, trim spaces, and remove duplicates
        const normalizedRegions = [...new Set(
          agentRegions
            .map(doc => doc.region.trim().toLowerCase().replace(/\s+/g, ' ')) // Normalize case and spaces
        )];
    
        // Function to group similar regions using Levenshtein distance
        const normalizeRegion = (region: string, allRegions: string[]): string => {
          return allRegions.find(existingRegion => Levenshtein.get(region, existingRegion) < 3) || region;
        };
    
        // Group similar regions dynamically
        const groupedRegions = normalizedRegions.reduce<string[]>((acc, region) => {
          const existingRegion = normalizeRegion(region, acc);
          if (!acc.includes(existingRegion)) acc.push(existingRegion);
          return acc;
        }, []);
    
        // Capitalize each region and join them into a string
        return groupedRegions
          .map(region => region.replace(/\b\w/g, char => char.toUpperCase()))
          .join(", ");
      } catch (error) {
        throw new Error(error.message);
      }
    };
}

export default AgentService