import AgentController from '../controllers/agent.controller';
import { agentAuth, agentResetAuth } from '../middlewares/auth.middleware';
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

    // get all agents
    this.router.get('', this.agentController.getAllAgents);

    //route to register an agent    
    this.router.post('/register', this.agentValidator.newAgent, this.agentController.agentSignup);

    // forget password route
    this.router.post('/forgot-password', this.agentValidator.validateForgotPassword, this.agentController.forgotPassword);

    // Reset Password route
    this.router.post('/reset-password', agentResetAuth, this.agentValidator.validateResetPassword, this.agentController.resetPassword);

    //route to refresh token
    this.router.get('/:id/refreshtoken',this.agentController.refreshToken)

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
