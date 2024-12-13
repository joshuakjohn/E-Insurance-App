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
      unique: true,
      match: /^[0-9]{10}$/,
    },
    address: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    agent: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      required: false,
      default: null, 
    },
  },
  {
    timestamps: true,
  }
);

export default model<Customer>('Customer', customerSchema); 
