import { Document } from 'mongoose';

export interface IAgent extends Document {
  name: string;
  email: string;
  password: string;
  phone: number;
  region: string;
}
