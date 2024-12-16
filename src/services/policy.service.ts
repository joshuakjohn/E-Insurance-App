import { IPolicy } from '../interfaces/policy.interface';

 class PolicyService{
    public createPolicy = async (body: IPolicy): Promise<any> => {
        
    }
    
    public getAllPolicy = async (): Promise<any> => {
        
      };

      public getPolicyById = async (id: string): Promise<any> => {
        
      };

      public updatePolicy = async (id: string, updateData: Partial<IPolicy>): Promise<any> => {
        
      };

      public deletePolicy = async (id: string): Promise<any> => {
        
      };
    }
   
 export default PolicyService;