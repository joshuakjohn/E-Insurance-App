import { Document } from 'mongoose';

export interface IAgent extends Document {
  username: string;
  email: string;
  password: string;
  phno: number;
  region: string;
  refreshToken?:string;
}
