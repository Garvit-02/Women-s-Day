import mongoose from "mongoose";

const achieverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    field: {
      type: String,
      required: true,
      trim: true
    },
    bio: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export const Achiever = mongoose.model("Achiever", achieverSchema);

