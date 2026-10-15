import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "Original URL is required"],
      trim: true,
    },

    shortCode: {
      type: String,
      required: [true, "Short code is required"],
      unique: true,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
