import express, { IRouter } from 'express';
const router = express.Router();

import agentRoute from './agent.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/agent', new agentRoute().getRoutes());

  return router;
};

export default routes;
