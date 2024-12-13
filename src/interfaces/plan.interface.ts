import { Document, ObjectId } from 'mongoose';

export interface IPlan extends Document {
  planName: string;
  planDetails: string;
  rateOfInterest?: number;
  eligibilityCriteria?: string;
  schemeId: string | ObjectId;
  createdAt: Date;
}
