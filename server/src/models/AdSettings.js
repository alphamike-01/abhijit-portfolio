import mongoose from "mongoose";

const adSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "global_ad_settings", unique: true },
    enabled: { type: Boolean, default: false },
    publisherId: { type: String, default: "ca-pub-0000000000000000" },
    previewMode: { type: Boolean, default: true },
    slots: {
      type: Map,
      of: {
        enabled: Boolean,
        slotId: String,
        name: String
      },
      default: {
        "in-article": { enabled: true, slotId: "1234567890", name: "In-Article Placement" },
        "sidebar": { enabled: true, slotId: "2345678901", name: "Desktop Sidebar" },
        "between-cards": { enabled: true, slotId: "3456789012", name: "Between Blog Cards" },
        "footer-banner": { enabled: true, slotId: "4567890123", name: "Footer Banner" }
      }
    }
  },
  { timestamps: true }
);

export const AdSettings = mongoose.model("AdSettings", adSettingsSchema);
