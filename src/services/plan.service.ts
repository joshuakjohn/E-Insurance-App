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

}

export default PlanService;