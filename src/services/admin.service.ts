import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model';
import { IAdmin } from '../interfaces/admin.interface';


class AdminService {
    // Register a new admin
    public createAdmin = async (body: IAdmin): Promise<any> => {
        try {
            const existingAdmin = await Admin.findOne({ email: body.email });
            if (existingAdmin) {
                throw new Error('Admin already exists');
            }

            const hashedPassword = await bcrypt.hash(body.password, 10);
            body.password = hashedPassword;
              await Admin.create(body);

            return 'Admin registerd successfully';
        } catch (error) {
            throw new Error(error.message);
        }
    };

    // Admin login
    public loginAdmin = async (body: IAdmin): Promise<any> => {
        try {
            const adminData = await Admin.findOne({ email: body.email });
            if (!adminData) {
                throw new Error('Admin not found');
            }

            const isMatch = await bcrypt.compare(body.password, adminData.password);
            if (!isMatch) {
                throw new Error('Invalid password');
            }

            const payload = { id: adminData._id, email: adminData.email };
            const token = jwt.sign(payload, process.env.ADMIN_SECRET);

            return [token, adminData.username, adminData.email];
        } catch (error) {
            throw new Error(error.message);
        }
    };

}

export default AdminService;
