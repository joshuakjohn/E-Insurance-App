import { Schema, model } from 'mongoose';
import { IScheme } from '../interfaces/scheme.interface';

const schemeSchema = new Schema<IScheme>(
  {
    schemeName: { type: String, required: true },
    description: { type: String, required: true },
    planId: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
    eligibilityCriteria: { type: String, required: true },
    premium: { type: Number, required: true },
    maturityPeriod: { type: Number, required: true },
    coverage: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<IScheme>('Scheme', schemeSchema);

