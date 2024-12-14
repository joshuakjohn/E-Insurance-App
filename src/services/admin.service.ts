import Admin from '../models/admin.model';
import { IAdmin } from '../interfaces/admin.interface';


class AdminService {
  // Register a new admin
  public createAdmin = async (body: IAdmin): Promise<IAdmin> => {
    try {
        const existingAdmin = await Admin.findOne({ email: body.email });
        if (existingAdmin) {
          throw new Error('Admin already exists');
        }
  
        const newAdmin = await Admin.create(body);
        return newAdmin;
      } catch (error) {
        throw new Error(error.message);
      }
  }

}

export default AdminService;
