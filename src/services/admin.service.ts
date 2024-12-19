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

            const payload = { userId: adminData._id, email: adminData.email };
            const token = jwt.sign(payload, process.env.ADMIN_SECRET);
            const refreshToken = jwt.sign(payload, process.env.ADMIN_SECRET, { expiresIn: '7d' });
            await Admin.findByIdAndUpdate(adminData._id, { refreshToken });

            return {token, refreshToken, username:adminData.username, email:adminData.email};
        } catch (error) {
            throw new Error(error.message);
        }
    };
    public refreshToken = async (refreshToken: string): Promise<any> => {
        try {
            const adminData = await Admin.findOne({ refreshToken:refreshToken });
            if (!adminData) {
                throw new Error('Admin not found for the provided refresh token');
            }
            const payload = jwt.verify(refreshToken, process.env.ADMIN_SECRET) as { id: string, email: string };
            if (!payload) {
                throw new Error('Invalid refresh token');
            }
            const newAccessToken = jwt.sign({ id: payload.id, email: payload.email }, process.env.ADMIN_SECRET, { expiresIn: '1h' });
            return { newAccessToken };
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

}

export default AdminService;
