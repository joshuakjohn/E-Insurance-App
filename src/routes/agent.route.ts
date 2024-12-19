import AgentController from '../controllers/agent.controller';
import { agentAuth } from '../middlewares/auth.middleware';
import AgentValidator from '../validators/agent.validator';
import express, { IRouter } from 'express';

class UserRoutes {
  private agentController = new AgentController();
  private router = express.Router();
  private agentValidator = new AgentValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to login an agent
    this.router.post('', this.agentValidator.loginAgent, this.agentController.agentLogin);

    //route to register an agent    
    this.router.post('/register', this.agentValidator.newAgent, this.agentController.agentSignup);

    // get all agents
    this.router.get('/', this.agentController.getAllAgents);

    this.router.get('/refreshtoken/',this.agentController.refreshToken);

    // forget password route
    this.router.post('/forgot-password', this.agentValidator.validateForgotPassword, this.agentController.forgotPassword);

    // Reset Password
    this.router.post('/reset-password', this.agentValidator.validateResetPassword, agentAuth, this.agentController.resetPassword);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
