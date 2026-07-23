import mongoose, { Schema, Document } from 'mongoose';

export interface ISellRequest extends Document {
  title: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  engineCapacity: string;
  images: string[];
  description?: string;

  sellerName: string;
  phone: string;
  email?: string;

  status: "Pending" | "Approved" | "Rejected";
}

const sellRequestSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    mileage: {
      type: Number,
      required: true,
    },

    engineCapacity: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    description: {
      type: String,
      default: "",
    },

    sellerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISellRequest>('SellRequest', sellRequestSchema);