import { Schema, model } from 'mongoose';
import { IPlan } from '../interfaces/plan.interface';

const planSchema = new Schema<IPlan>(
  {
    planName: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<IPlan>('Plan', planSchema);
