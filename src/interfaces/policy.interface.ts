import { Document, ObjectId } from 'mongoose';

export interface IPolicy extends Document {
  policyName: string;
  description: string;
  planId: string | ObjectId;
  customerId: string | ObjectId;
  schemeId: string | ObjectId;
  agentId: string | ObjectId;
  premiumPaid: number;
  policyStartDate: Date;
  policyEndDate: Date;
  coverage: number;
  createdAt: Date;
}
