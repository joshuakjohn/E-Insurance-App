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
    
    public getAllPolicies = async (customerReq: string, agentReq: string, page: number, limit: number): Promise<{ data: IPolicy[]; total: number; page: number; totalPages: number }> => {
      try {
          let policies = [];
          let total = 0;

          if (agentReq === undefined) {
              // Customer-specific policies
              total = await policyModel.countDocuments({ customerId: customerReq });
              policies = await policyModel
                  .find({ customerId: customerReq })
                  .skip((page - 1) * limit)
                  .limit(limit);
          } else {
              // Agent-specific policies
              total = await policyModel.countDocuments({ agentId: agentReq });
              policies = await policyModel
                  .find({ agentId: agentReq })
                  .skip((page - 1) * limit)
                  .limit(limit);
          }

          if(!policies || policies.length === 0) {
            throw new Error('No policy found');
          }

          const totalPages = Math.ceil(total / limit);

          return {
              data: policies,
              total,
              page,
              totalPages,
          };
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