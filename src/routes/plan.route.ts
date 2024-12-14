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

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default PlanRoutes;
