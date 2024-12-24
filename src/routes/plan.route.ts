import express, { IRouter } from 'express';
import PlanController from '../controllers/plan.controller';
import PlanValidator from '../validators/plan.validator';
import { adminAuth, agentAuth, customerAuth, employeeAuth } from '../middlewares/auth.middleware';
import { cacheData } from '../middlewares/rediscache.middleware';

class PlanRoutes {
  private router = express.Router();
  private planController = new PlanController();
  private planValidator = new PlanValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {

    // create plan route by admin
    this.router.post('/', adminAuth, this.planValidator.createPlan, this.planController.createPlan);

    // get all plans
    this.router.get('/', this.planValidator.validatePagination, cacheData, this.planController.getAllPlans);

    // get plan by id
    this.router.get('/:id', this.planController.getPlanById);

    // update a plan by id, by admin
    this.router.put('/:id', adminAuth, this.planValidator.updatePlan, this.planController.updatePlan);

    // delete a plan by id, by admin
    this.router.delete('/:id', adminAuth, this.planController.deletePlan);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default PlanRoutes;
