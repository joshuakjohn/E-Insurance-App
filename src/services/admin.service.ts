import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model';
import { IAdmin } from '../interfaces/admin.interface';
import { sendEmail } from '../utils/user.util';


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
            return {token, username:adminData.username, email:adminData.email};
        } catch (error) {
            throw new Error(error.message);
        }
    };
    public refreshToken = async (adminId: string): Promise<any> => {
        try {
            const adminData = await Admin.findById(adminId);
            const refreshToken=adminData.refreshToken
            if (!refreshToken) {
                throw new Error('Refresh token is missing');
            }
            const payload : any= jwt.verify(refreshToken, process.env.ADMIN_SECRET );
            const { userId, email } = payload;
            const newAccessToken = jwt.sign({ userId, email }, process.env.ADMIN_SECRET, { expiresIn: '1h' });
            return newAccessToken;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    };


    // forget password
    public forgotPassword = async (email: string): Promise<void> => {
        try{
        const adminData = await Admin.findOne({ email });
        if (!adminData) {
            throw new Error('Email not found');
        }
        const token = jwt.sign({ userId: adminData._id }, process.env.ADMIN_RESET_SECRET, { expiresIn: '1h' });
        await sendEmail(email, token);
        } catch(error){
        throw new Error("Error occured cannot send email: "+error)
        }
    };

    //reset password
    public resetPassword = async (body: any, userId): Promise<void> => {
    const adminData = await Admin.findById(userId);
    if (!adminData) {
        throw new Error('User not found');
    }
    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    adminData.password = hashedPassword;
    await adminData.save();
  };

}

export default AdminService;
