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
    public getAllPlans = async (page: number, limit: number): Promise<{ data: IPlan[]; total: number; page: number; totalPages: number }> => {
        try {
            const total = await Plan.countDocuments(); // Total number of plans
            const totalPages = Math.ceil(total / limit); // Total number of pages
            const data = await Plan.find()
                .skip((page - 1) * limit) // Skip records for previous pages
                .limit(limit);           // Limit the number of records fetched
    
            return {
                data,
                total,
                page,
                totalPages,
            };
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


    // Delete a plan by ID
    public deletePlan = async (planId: string): Promise<boolean> => {
        try {
            const res = await Plan.findById(planId);
            if (!res) {
                throw new Error('Plan not found');
            }
            await Plan.findByIdAndDelete(planId);
            return true;
        } catch (error) {
            throw error;
        }
    };

}

export default PlanService;
