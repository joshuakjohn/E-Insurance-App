import { Schema, model } from 'mongoose';
import { IPlan } from '../interfaces/plan.interface';
import { required } from '@hapi/joi';

const planSchema = new Schema<IPlan>(
  {
    planName: { type: String, required: true },
    planDetails: { type: String, required: true },
    rateOfInterest: { type: Number},
    eligibilityCriteria: { type: String },
    schemeId: { type: Schema.Types.ObjectId, ref: 'Scheme', required: true }
  },
  { timestamps: true }
);

export default model<IPlan>('Plan', planSchema);
