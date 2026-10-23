import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { Quote } from "./models/Quote.js";
import { Post } from "./models/Post.js";
import { Category } from "./models/Category.js";
import { Media } from "./models/Media.js";
import { AdSettings } from "./models/AdSettings.js";
import { AdminUser } from "./models/AdminUser.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/abhijit_portfolio";
const JWT_SECRET = process.env.JWT_SECRET || "mondal-portfolio-super-secure-key-2026";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

let isDbConnected = false;

// Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: [CLIENT_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Connect to MongoDB
async function connectDB() {
  try {
    console.log(`[Database] Connecting to MongoDB at ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, "//***:***@")}...`);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    });
    isDbConnected = true;
    console.log("[Database] MongoDB connection established successfully.");
  } catch (err) {
    isDbConnected = false;
    console.warn(`[Database] Warning: Could not connect to MongoDB: ${err.message}`);
    console.warn("[Database] Server will continue running; API will report database status via /api/health.");
  }
}

mongoose.connection.on("connected", () => {
  isDbConnected = true;
});
mongoose.connection.on("disconnected", () => {
  isDbConnected = false;
  console.warn("[Database] MongoDB disconnected.");
});
mongoose.connection.on("error", (err) => {
  isDbConnected = false;
  console.error("[Database] MongoDB error:", err.message);
});

// Helper: Ensure DB is connected before operation
function requireDB(req, res, next) {
  if (!isDbConnected || mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      error: "Database is currently disconnected or unavailable.",
      isDbConnected: false
    });
  }
  next();
}

// =============================================================================
// HEALTH & STATUS
// =============================================================================
app.get("/api/health", async (req, res) => {
  const readyState = mongoose.connection.readyState;
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  const dbStatus = states[readyState] || "unknown";

  let counts = { quotes: 0, posts: 0, categories: 0, media: 0 };
  if (readyState === 1) {
    try {
      counts.quotes = await Quote.countDocuments();
      counts.posts = await Post.countDocuments();
      counts.categories = await Category.countDocuments();
      counts.media = await Media.countDocuments();
    } catch {
      // ignore
    }
  }

  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      engine: "MongoDB",
      status: dbStatus,
      connected: readyState === 1,
      uri: MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, "//***:***@"),
      counts
    }
  });
});

// =============================================================================
// QUOTES API
// =============================================================================
app.get("/api/quotes", requireDB, async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status && status !== "All") filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { projectTitle: { $regex: search, $options: "i" } },
        { id: { $regex: search, $options: "i" } }
      ];
    }
    const quotes = await Quote.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: quotes.length, data: quotes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/quotes/:id", requireDB, async (req, res) => {
  try {
    const quote = await Quote.findOne({ id: req.params.id });
    if (!quote) return res.status(404).json({ success: false, error: "Quote not found" });
    res.json({ success: true, data: quote });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/quotes", requireDB, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      organization,
      serviceId,
      serviceTitle,
      projectTitle,
      projectDescription,
      deliverables,
      budgetRange,
      timeline,
      preferredContact,
      authorizedAttestation,
      privacyConsent,
      websiteHoneypot
    } = req.body;

    // Spam honeypot trap check
    if (websiteHoneypot && websiteHoneypot.trim() !== "") {
      return res.status(400).json({ success: false, error: "Spam bot submission rejected." });
    }

    if (!name || !email || !serviceId || !projectTitle || !projectDescription || !budgetRange || !timeline) {
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }

    if (!privacyConsent) {
      return res.status(400).json({ success: false, error: "Privacy consent is mandatory." });
    }

    if (serviceId === "penetration-testing" && !authorizedAttestation) {
      return res.status(400).json({ success: false, error: "Legal authorization attestation required for penetration testing." });
    }

    // Generate reference ID: REQ-YYYY-XXXX
    const currentYear = new Date().getFullYear();
    const count = await Quote.countDocuments();
    const id = req.body.id || `REQ-${currentYear}-${String(count + 1045).padStart(4, "0")}`;

    const newQuote = await Quote.create({
      id,
      name,
      email,
      phone: phone || "",
      organization: organization || "",
      serviceId,
      serviceTitle: serviceTitle || serviceId,
      projectTitle,
      projectDescription,
      deliverables: deliverables || [],
      budgetRange,
      timeline,
      preferredContact: preferredContact || "Email",
      authorizedAttestation: Boolean(authorizedAttestation),
      privacyConsent: true,
      status: "New",
      notes: ""
    });

    res.status(201).json({ success: true, data: newQuote });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch("/api/quotes/:id", requireDB, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    const updated = await Quote.findOneAndUpdate({ id: req.params.id }, updates, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: "Quote not found" });

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/quotes/:id", requireDB, async (req, res) => {
  try {
    const deleted = await Quote.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ success: false, error: "Quote not found" });
    res.json({ success: true, message: "Quote deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =============================================================================
// BLOG POSTS API
// =============================================================================
app.get("/api/posts", requireDB, async (req, res) => {
  try {
    const { all, category, search } = req.query;
    const filter = {};
    if (all !== "true") filter.status = "published";
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } }
      ];
    }
    const posts = await Post.find(filter).sort({ publishedDate: -1, createdAt: -1 });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/posts/:slug", requireDB, async (req, res) => {
  try {
    const post = await Post.findOne({
      $or: [{ slug: req.params.slug }, { id: req.params.slug }]
    });
    if (!post) return res.status(404).json({ success: false, error: "Post not found" });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/posts", requireDB, async (req, res) => {
  try {
    const postData = req.body;
    if (!postData.title || !postData.content) {
      return res.status(400).json({ success: false, error: "Title and content are required." });
    }

    if (!postData.slug) {
      postData.slug = postData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }
    if (!postData.id) {
      postData.id = `post-${Date.now()}`;
    }

    const created = await Post.create(postData);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/posts/:id", requireDB, async (req, res) => {
  try {
    const updated = await Post.findOneAndUpdate(
      { $or: [{ id: req.params.id }, { slug: req.params.id }] },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, error: "Post not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/posts/:id", requireDB, async (req, res) => {
  try {
    const deleted = await Post.findOneAndDelete({
      $or: [{ id: req.params.id }, { slug: req.params.id }]
    });
    if (!deleted) return res.status(404).json({ success: false, error: "Post not found" });
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =============================================================================
// CATEGORIES API
// =============================================================================
app.get("/api/categories", requireDB, async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/categories", requireDB, async (req, res) => {
  try {
    const { name, slug, description, icon } = req.body;
    if (!name) return res.status(400).json({ success: false, error: "Category name is required" });
    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const id = req.body.id || `cat-${Date.now()}`;

    const created = await Category.create({ id, name, slug: finalSlug, description: description || "", icon: icon || "Layers", count: 0 });
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/categories/:id", requireDB, async (req, res) => {
  try {
    const updated = await Category.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: "Category not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/categories/:id", requireDB, async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ success: false, error: "Category not found" });
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =============================================================================
// MEDIA API
// =============================================================================
app.get("/api/media", requireDB, async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json({ success: true, count: media.length, data: media });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/media", requireDB, async (req, res) => {
  try {
    const item = req.body;
    if (!item.url || !item.filename) {
      return res.status(400).json({ success: false, error: "File URL and filename required." });
    }
    if (!item.id) item.id = `media-${Date.now()}`;
    const created = await Media.create(item);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/media/:id", requireDB, async (req, res) => {
  try {
    const deleted = await Media.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ success: false, error: "Media item not found" });
    res.json({ success: true, message: "Media deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =============================================================================
// ADSENSE SETTINGS API
// =============================================================================
app.get("/api/settings/ads", requireDB, async (req, res) => {
  try {
    let settings = await AdSettings.findOne({ key: "global_ad_settings" });
    if (!settings) {
      settings = await AdSettings.create({ key: "global_ad_settings", enabled: false, publisherId: "ca-pub-0000000000000000", previewMode: true });
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/settings/ads", requireDB, async (req, res) => {
  try {
    const updated = await AdSettings.findOneAndUpdate(
      { key: "global_ad_settings" },
      req.body,
      { new: true, upsert: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =============================================================================
// AUTH API
// =============================================================================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password required." });
    }

    const defaultAdminEmail = (process.env.ADMIN_EMAIL || "admin@abhijitmondal.dev").toLowerCase();
    const defaultAdminPassword = process.env.ADMIN_PASSWORD || "AdminMondal@2026!";

    let authenticated = false;
    let userRole = "SuperAdmin";

    // 1. Try DB lookup if DB is connected
    if (isDbConnected) {
      const user = await AdminUser.findOne({ email: email.toLowerCase() });
      if (user) {
        const match = await bcrypt.compare(password, user.passwordHash);
        if (match) {
          authenticated = true;
          userRole = user.role;
          user.lastLogin = new Date();
          await user.save();
        }
      }
    }

    // 2. Fallback to configured default admin credentials
    if (!authenticated && email.toLowerCase() === defaultAdminEmail && password === defaultAdminPassword) {
      authenticated = true;
    }

    if (!authenticated) {
      return res.status(401).json({ success: false, error: "Invalid administrative credentials." });
    }

    // Generate JWT token (8 hours expiry)
    const token = jwt.sign(
      { email: email.toLowerCase(), role: userRole },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      success: true,
      token,
      user: {
        email: email.toLowerCase(),
        role: userRole
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server
app.listen(PORT, async () => {
  console.log(`=======================================================`);
  console.log(`Portfolio API Server listening on port ${PORT}`);
  console.log(`CORS enabled for ${CLIENT_URL}`);
  console.log(`=======================================================`);
  await connectDB();
});

export default app;
