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

    // get all plans by admin
    this.router.get('/', adminAuth, this.planValidator.validatePagination, cacheData, this.planController.getAllPlans);

    // get all plans by customer
    this.router.get('/customer', customerAuth, this.planValidator.validatePagination, cacheData, this.planController.getAllPlans);

    // get all plans by agent
    this.router.get('/agent', agentAuth, this.planValidator.validatePagination, cacheData, this.planController.getAllPlans);

    // get all plans by employee
    this.router.get('/employee', employeeAuth, this.planValidator.validatePagination, cacheData, this.planController.getAllPlans);

    // get plan by id, by admin
    this.router.get('/:id', adminAuth, this.planController.getPlanById);

    // update a plan by id, by admin
    this.router.put('/:id', adminAuth, this.planValidator.updatePlan, this.planController.updatePlan);

    // delete a plan by id, by admin
    this.router.delete('/:id', adminAuth, this.planController.deletePlan);

    // get plan by id, by customer
    this.router.get('/:id/customer', customerAuth, this.planController.getPlanById);

    // get plan by id, by agent
    this.router.get('/:id/agent', agentAuth, this.planController.getPlanById);

    // get plan by id, by employee
    this.router.get('/:id/employee', employeeAuth, this.planController.getPlanById);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default PlanRoutes;
