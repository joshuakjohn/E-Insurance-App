import { Schema, model } from 'mongoose';
import { IPolicy } from '../interfaces/policy.interface';

const policySchema = new Schema<IPolicy>(
  {
    policyName: { type: String, required: true },
    description: { type: String, require: true},
    planId: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    schemeId: { type: Schema.Types.ObjectId, ref: 'Scheme', required: true },
    agentId: { type: Schema.Types.ObjectId, ref: 'Agent', required: true },
    premiumPaid: { type: Number, required: true },
    policyStartDate: { type: Date, required: true },
    policyEndDate: { type: Date, required: true },
    coverage: { type: Number, required: true },
    status: { type: String, required: true, default: "submitted"}
  },
  { timestamps: true }
);

export default model<IPolicy>('Policy', policySchema);
