import agentRoute from './agent.route';
import customerRoute from './customer.route';
import adminRoute from './admin.route'; 
import planRoute from './plan.route';
import SchemeRoute from './scheme.route';
import express, { IRouter } from 'express';

const router = express.Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/customer', new customerRoute().getRoutes());
  router.use('/agent', new agentRoute().getRoutes());
  router.use('/admin', new adminRoute().getRoutes());
  router.use('/plan', new planRoute().getRoutes());
  router.use('/scheme',new SchemeRoute().getRoutes())
  
  return router;
};

export default routes;
