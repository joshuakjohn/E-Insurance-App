import { Schema, model } from 'mongoose';
import { IAgent } from '../interfaces/agent.interface';

const agentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true
  }
);

export default model<IAgent>('Agent', agentSchema);
