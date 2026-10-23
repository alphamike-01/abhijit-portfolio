import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true, index: true },
    tags: [{ type: String }],
    author: { type: String, default: "Abhijit Mondal" },
    authorRole: { type: String, default: "Cybersecurity Specialist & M.Sc. IT (Forensics)" },
    publishedDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    readTime: { type: String, default: "5 min read" },
    status: { type: String, enum: ["published", "draft"], default: "published", index: true },
    featured: { type: Boolean, default: false },
    coverImage: { type: String, default: "/blog/blog-malware-ml.svg" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    tableOfContents: [
      {
        id: { type: String },
        title: { type: String }
      }
    ],
    content: { type: String, required: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export const Post = mongoose.model("Post", postSchema);
