import express, { IRouter } from 'express';
const router = express.Router();

import customerRoute from './customer.route';

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

  return router;
};

export default routes;
