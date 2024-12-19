import express, { IRouter } from 'express';
import PlanController from '../controllers/plan.controller';
import PlanValidator from '../validators/plan.validator';

class PlanRoutes {
  private router = express.Router();
  private planController = new PlanController();
  private planValidator = new PlanValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {

    // create plan route
    this.router.post('/', this.planValidator.createPlan, this.planController.createPlan);

    // get plan by id
    this.router.get('/:id', this.planController.getPlanById);

    // get all plans
    this.router.get('/', this.planValidator.validatePagination, this.planController.getAllPlans);

    // update a plan by id
    this.router.put('/:id', this.planValidator.updatePlan, this.planController.updatePlan);

    // delete a plan bybid
    this.router.delete('/:id', this.planController.deletePlan);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default PlanRoutes;
