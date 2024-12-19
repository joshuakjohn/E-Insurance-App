import { IPolicy } from '../interfaces/policy.interface';
import Agent from '../models/agent.model'
import policyModel from '../models/policy.model';

 class PolicyService{
    public createPolicy = async (body: IPolicy): Promise<any> => {
        try{
            const data = policyModel.create(body)
            await Agent.updateOne({ _id: body.agentId }, { $inc: { num_of_policies: 1 } });
            return data
        } catch(error) {
            throw new Error(error.message)
        }
        
    }
    
    public getAllPolicy = async (customerReq: string, agentReq: string): Promise<any> => {
        try {
            let policy = []
            if(agentReq === undefined){
              policy = await policyModel.find({customerId: customerReq});
            }
            else{
              policy = await policyModel.find({customerId: agentReq});
            }
            
            if(!policy || policy.length === 0) {
              throw new Error('No policy found');
            }
            return policy;
          } catch (error) {
            throw new Error(`Error fetching policy: ${error.message}`);
          }
      };

      public getPolicyById = async (id: string): Promise<any> => {
        try {
            const policy = await policyModel.findById(id);
            if (!policy) {
              throw new Error('Policy not found');
            }
            return policy;
          } catch (error) {
            throw new Error(`Error fetching policy by ID: ${error.message}`);
          }
      };

      public updatePolicy = async (id: string, updateData: Partial<IPolicy>): Promise<any> => {
        try {
            const updatedPolicy = await policyModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedPolicy) {
              throw new Error('Policy not found');
            }
            return updatedPolicy;
          } catch (error) {
            throw new Error(`Error updating policy: ${error.message}`);
          }
      };

      public deletePolicy = async (id: string): Promise<any> => {
        try {
            const deletedPolicy = await policyModel.findByIdAndDelete(id);
            if (!deletedPolicy) {
              throw new Error('Policy not found');
            }
            return deletedPolicy;
          } catch (error) {
            throw new Error(`Error deleting scheme: ${error.message}`);
          }
      };
    }
   
 export default PolicyService;