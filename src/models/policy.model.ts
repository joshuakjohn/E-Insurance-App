import { Schema, model } from 'mongoose';
import { IPolicy } from '../interfaces/policy.interface';
import { required } from '@hapi/joi';

const policySchema = new Schema<IPolicy>(
  {
    policyName: { type: String, required: true },
    description: { type: String, require: true},
    planId: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    schemeId: { type: Schema.Types.ObjectId, ref: 'Scheme', required: true },
    agentId: { type: Schema.Types.ObjectId, ref: 'Agent', required: true },
    premiumAmount: {type: Number, required: true},
    premiumPaid: { type: Number, required: true, default: 0},
    policyStartDate: { type: Date, required: true, default: new Date()},
    duration: { type: Number, required: true },
    coverage: { type: Number, required: true },
    pendingPremium: {type: Number, required: true, default: 0},
    status: { type: String, required: true, default: "submitted"}
  },
  { timestamps: true }
);

export default model<IPolicy>('Policy', policySchema);
