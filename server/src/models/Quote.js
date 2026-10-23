import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    organization: { type: String, trim: true, default: "" },
    serviceId: { type: String, required: true },
    serviceTitle: { type: String, required: true },
    projectTitle: { type: String, required: true, trim: true },
    projectDescription: { type: String, required: true },
    deliverables: [{ type: String }],
    budgetRange: { type: String, required: true },
    timeline: { type: String, required: true },
    preferredContact: { type: String, default: "Email" },
    authorizedAttestation: { type: Boolean, default: false },
    privacyConsent: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["New", "Reviewing", "Quoted", "Archived"],
      default: "New",
      index: true
    },
    notes: { type: String, default: "" }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export const Quote = mongoose.model("Quote", quoteSchema);
