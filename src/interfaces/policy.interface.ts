import { Document, ObjectId } from 'mongoose';

export interface IPolicy extends Document {
  name: string;
  premium: number;
  duration: number;
  planId: string | ObjectId;
  customerId: string | ObjectId;
  schemeId: string | ObjectId;
  agentId: string | ObjectId;
  dateIssued: Date;
  maturityPeriod: number;
  createdAt: Date;
}
