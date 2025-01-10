import { image } from '../config/multer';
import AgentController from '../controllers/agent.controller';
import { adminAuth, agentAuth, agentResetAuth, employeeAuth } from '../middlewares/auth.middleware';
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

    // get all agents by admin
    this.router.get('', adminAuth, this.agentController.getAllAgents);

    // get all agents by employee
    this.router.get('/employee', employeeAuth, this.agentController.getAllAgents);

    //route to register an agent    
    this.router.post('/register', image, this.agentValidator.newAgent, this.agentController.agentSignup);

    this.router.get('/get-agent', agentAuth, this.agentController.getAgentById)

    // forget password route
    this.router.post('/forgot-password', this.agentValidator.validateForgotPassword, this.agentController.forgotPassword);

    // Reset Password route
    this.router.post('/reset-password', agentResetAuth, this.agentValidator.validateResetPassword, this.agentController.resetPassword);

    //route to get the available region
    this.router.get('/getregion', this.agentController.getAgentRegion)

    //route to update status of agent
    this.router.patch('/:id', this.agentController.updateStatus);

    //route to refresh token
    this.router.get('/:id/refreshtoken',this.agentController.refreshToken)

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
