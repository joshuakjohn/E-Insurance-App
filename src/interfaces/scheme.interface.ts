import { Document, ObjectId } from 'mongoose';

export interface IScheme extends Document {
  schemeName: string;
  description: string;
  planId: string | ObjectId;
  eligibilityCriteria: String;
  premium: number;
  maturityPeriod: number;
  coverage: number;
  createdAt: Date;
}
