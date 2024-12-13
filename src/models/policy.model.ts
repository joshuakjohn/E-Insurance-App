import { Schema, model } from 'mongoose';
import { IPolicy } from '../interfaces/policy.interface';

const policySchema = new Schema<IPolicy>(
  {
    name: { type: String, required: true },
    premium: { type: Number, required: true },
    duration: { type: Number, required: true },
    plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scheme: { type: Schema.Types.ObjectId, ref: 'Scheme', required: true },
    agent: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateIssued: { type: Date, required: true },
    maturityPeriod: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<IPolicy>('Policy', policySchema);
