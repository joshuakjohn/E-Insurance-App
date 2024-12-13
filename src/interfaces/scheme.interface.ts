import { Document, ObjectId } from 'mongoose';

export interface IScheme extends Document {
  schemeName: string;
  schemeDetails: string;
  planId: string | ObjectId;
  createdAt: Date;
}
