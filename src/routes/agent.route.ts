import AgentController from '../controllers/agent.controller';
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
    this.router.post('', this.agentController.agentLogin);

    //route to register an agent    
    this.router.post('/register', this.agentValidator.newAgent, this.agentController.agentSignup);

    // get all agents
    this.router.get('/', this.agentController.getAllAgents);

    this.router.get('/refreshtoken/',this.agentController.refreshToken);

    // forget password route
    this.router.post('/forgot-password', this.agentValidator.validateForgotPassword, this.agentController.forgotPassword);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
