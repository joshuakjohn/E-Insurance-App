import { Document } from 'mongoose';

export interface IAgent extends Document {
  name: string;
  email: string;
  password: string;
  phno: number;
  region: string;
}
