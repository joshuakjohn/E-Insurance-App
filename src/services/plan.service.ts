import Plan from '../models/plan.model';
import { IPlan } from '../interfaces/plan.interface';

class PlanService {

    // Create a new plan
    public createPlan = async (body: IPlan): Promise<IPlan> => {
        try {
            const res = await Plan.create(body);
            return res;
        } catch (error) {
            throw new Error('Error creating plan');
        }
    };

    // Get a specific plan by ID
    public getPlanById = async (planId: string): Promise<IPlan | null> => {
        try {
            const res = await Plan.findById(planId);
            if(!res) {
                throw new Error('Plan not found');
            }
            return res;
        } catch (error) {
            throw error;
        }
    };

    // Get all plans
    public getAllPlans = async (): Promise<IPlan[]> => {
       try {
            const res = await Plan.find();
            if(!res || res.length === 0) {
                throw new Error('No plans found');
            }
            return res;
       } catch (error) {
            throw error;
       }
    };

    // Update a plan by ID
    public updatePlan = async (planId: string, updatedData: Partial<IPlan>): Promise<IPlan | null> => {
        try {
            const res = await Plan.findByIdAndUpdate(planId, updatedData, { new: true });
            if (!res) {
                throw new Error('Plan not found'); 
            }
            return res;
        } catch (error) {
            throw error;
        }

    };
}

export default PlanService;
