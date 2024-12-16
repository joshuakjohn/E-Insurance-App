import { Schema, model } from 'mongoose';
import { Customer } from '../interfaces/customer.interface';

const customerSchema = new Schema<Customer>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phno: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
      sparse:true
    },
    address: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    region: {
      type: String,
      required: true
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      required: false 
    },
  },
  {
    timestamps: true,
  }
);

export default model<Customer>('Customer', customerSchema); 
