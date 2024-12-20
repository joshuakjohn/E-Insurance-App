import { Schema, model } from 'mongoose';
import { IEmployee } from '../interfaces/employee.interface';

const employeeSchema = new Schema<IEmployee>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phno: {type: Number, match: /^[0-9]{10}$/},
  },
  { timestamps: true }
);

export default model<IEmployee>('Admin', employeeSchema);