import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    filename: { type: String, required: true },
    url: { type: String, required: true },
    fileSize: { type: String, default: "0 KB" },
    mimeType: { type: String, default: "image/png" },
    dimensions: { type: String, default: "Auto" },
    altText: { type: String, default: "" },
    caption: { type: String, default: "" },
    uploadedAt: { type: String, default: () => new Date().toISOString().split("T")[0] },
    usedIn: [{ type: String }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export const Media = mongoose.model("Media", mediaSchema);
