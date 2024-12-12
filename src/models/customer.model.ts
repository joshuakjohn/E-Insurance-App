import { Schema, model } from 'mongoose';
import { Customer } from '../interfaces/customer.interface';

const customerSchema = new Schema<Customer>(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
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
    role: {
      type: String,
      default: 'Customer',
    },
    policies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Policy',
      },
    ],
    claims: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Claim',
      },
    ],
    agent: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Customer>('Customer', customerSchema); // Ensure you're exporting as default
