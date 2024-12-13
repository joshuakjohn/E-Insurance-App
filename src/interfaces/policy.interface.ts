import { Document, ObjectId } from 'mongoose';

export interface IPolicy extends Document {
  name: string;
  premium: number;
  duration: number;
  plan: string | ObjectId;
  customer: string | ObjectId;
  scheme: string | ObjectId;
  agent: string | ObjectId;
  dateIssued: Date;
  maturityPeriod: number;
  createdAt: Date;
}
