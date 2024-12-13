import { Schema, model } from 'mongoose';
import { IScheme } from '../interfaces/scheme.interface';

const schemeSchema = new Schema<IScheme>(
  {
    schemeName: { type: String, required: true },
    schemeDetails: { type: String, required: true },
    plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  },
  { timestamps: true }
);

export default model<IScheme>('Scheme', schemeSchema);

