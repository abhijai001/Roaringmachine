import mongoose, { Schema, Document } from "mongoose";

export interface IBike extends Document {
  title: string;
  brand: string;
  price: number;
  year: number;
  mileage: number;
  engineCapacity: string;
  images: string[];
  description: string;
  isAvailable: boolean;
}

const bikeSchema: Schema = new Schema(
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
      trim: true,
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
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBike>("Bike", bikeSchema);