import { Document } from 'mongoose';

export interface IEmployee extends Document {
  username: string;
  email: string;
  password: string;
  phno: number;
}