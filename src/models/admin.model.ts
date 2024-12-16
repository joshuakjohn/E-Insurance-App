import { Schema, model } from 'mongoose';
import { IAdmin } from '../interfaces/admin.interface';

const adminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phno: {type: Number, match: /^[0-9]{10}$/},
    refreshToken: {type: String, default: null,  required: false }
  },
  { timestamps: true }
);

export default model<IAdmin>('Admin', adminSchema);
