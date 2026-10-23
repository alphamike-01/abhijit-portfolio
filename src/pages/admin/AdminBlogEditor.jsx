import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCMS } from "../../context/CMSContext";
import { slugify, calculateReadTime } from "../../utils/formatters";
import {
  Save,
  ArrowLeft,
  Eye,
  Edit,
  Globe,
  Tag,
  Calendar,
  Image,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminBlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, categories, media, savePost, addToast } = useCMS();

  const isEditing = !!id && id !== "new";
  const existingPost = isEditing ? posts.find((p) => p.id === id) : null;

  const [activeTab, setActiveTab] = useState("edit"); // "edit" | "preview"
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "Cybersecurity",
    tagsString: "",
    author: "Abhijit Mondal",
    authorRole: "Cybersecurity Specialist & M.Sc. IT (Forensics)",
    publishedDate: new Date().toISOString().split("T")[0],
    status: "published",
    featured: false,
    coverImage: "/blog/blog-malware-ml.svg",
    content: "",
    seoTitle: "",
    seoDescription: ""
  });

  useEffect(() => {
    if (existingPost) {
      setFormData({
        ...existingPost,
        tagsString: (existingPost.tags || []).join(", ")
      });
    }
  }, [existingPost]);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !isEditing ? slugify(val) : prev.slug
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.title || formData.title.trim().length < 3) {
      addToast("Article title is required (min 3 chars)", "error");
      return;
    }
    if (!formData.slug) {
      addToast("Slug is required", "error");
      return;
    }
    if (!formData.content || formData.content.trim().length < 20) {
      addToast("Article content is required (min 20 chars)", "error");
      return;
    }

    const tags = formData.tagsString
      ? formData.tagsString.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const readTime = calculateReadTime(formData.content);

    const postPayload = {
      ...formData,
      id: isEditing ? existingPost.id : formData.slug,
      tags,
      readTime
    };

    savePost(postPayload);
    navigate("/admin/blog");
  };

  return (
    <div>
      {/* Editor Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/admin/blog" className="btn btn-secondary btn-sm">
            <ArrowLeft size={14} />
            <span>Back to Articles</span>
          </Link>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, margin: 0 }}>
            {isEditing ? `Edit Article: ${formData.title || "Untitled"}` : "Create New Publication"}
          </h1>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ display: "flex", background: "#0d1424", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "2px" }}>
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`btn btn-sm ${activeTab === "edit" ? "btn-primary" : "btn-secondary"}`}
              style={{ padding: "6px 14px", fontSize: "0.8rem", border: "none" }}
            >
              <Edit size={14} />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`btn btn-sm ${activeTab === "preview" ? "btn-primary" : "btn-secondary"}`}
              style={{ padding: "6px 14px", fontSize: "0.8rem", border: "none" }}
            >
              <Eye size={14} />
              <span>Live Preview</span>
            </button>
          </div>

          <button onClick={handleSave} className="btn btn-primary btn-sm" style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <Save size={15} />
            <span>Save Article</span>
          </button>
        </div>
      </div>

      {activeTab === "edit" ? (
        <form onSubmit={handleSave}>
          <div className="admin-editor-grid">
            {/* Main Content Area */}
            <div>
              <div className="card" style={{ padding: "28px", marginBottom: "24px" }}>
                <div className="form-group">
                  <label className="form-label">Article Headline / Title <span className="required">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Modern Kernel Forensics & Memory Acquisition"
                    className="form-control"
                    style={{ fontSize: "1.1rem", fontWeight: 600 }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">URL Slug <span className="required">*</span></label>
                  <input
                    type="text"
                    required
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="modern-kernel-forensics"
                    className="form-control mono"
                    style={{ fontSize: "0.85rem" }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Short Summary / Excerpt</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Brief 1-2 sentence synopsis for card listings and search previews..."
                    className="form-control"
                    rows={2}
                    style={{ fontSize: "0.9rem" }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    Article Body Content (Markdown Supported) <span className="required">*</span>
                  </label>
                  <textarea
                    name="content"
                    required
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write article in Markdown: use ## for H2, ### for H3, ```bash for code blocks..."
                    className="form-control mono"
                    rows={18}
                    style={{ fontSize: "0.9rem", lineHeight: "1.6" }}
                  />
                  <div className="form-help">
                    Markdown tips: Use <code>## Section Title</code> for subheadings, <code>```python</code> for syntax-styled code snippets.
                  </div>
                </div>
              </div>

              {/* SEO Metadata Card */}
              <div className="card" style={{ padding: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Globe size={18} style={{ color: "var(--accent-cyan)" }} />
                  <span>Search Engine Optimization (SEO) & Social Meta</span>
                </h3>

                <div className="form-group">
                  <label className="form-label">SEO Meta Title</label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    placeholder={formData.title || "Title for search engines (default: Article Title)"}
                    className="form-control"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">SEO Meta Description</label>
                  <textarea
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleChange}
                    placeholder="Concise 150-160 character description for Google search results..."
                    className="form-control"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Right Sidebar: Publishing Settings */}
            <div>
              <div className="card" style={{ padding: "24px", position: "sticky", top: "88px" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "18px" }}>
                  Publishing Controls
                </h3>

                {/* Status */}
                <div className="form-group">
                  <label className="form-label">Publication Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="published">Published (Public)</option>
                    <option value="draft">Draft (Private)</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Category */}
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-control"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div className="form-group">
                  <label className="form-label">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    name="tagsString"
                    value={formData.tagsString}
                    onChange={handleChange}
                    placeholder="Forensics, Python, Linux"
                    className="form-control"
                  />
                </div>

                {/* Publication Date */}
                <div className="form-group">
                  <label className="form-label">Publication Date</label>
                  <input
                    type="date"
                    name="publishedDate"
                    value={formData.publishedDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Featured Toggle */}
                <div className="form-group">
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.85rem", color: "#f8fafc" }}>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      style={{ accentColor: "var(--accent-cyan)" }}
                    />
                    <span>Highlight as Featured Story</span>
                  </label>
                </div>

                {/* Author Name */}
                <div className="form-group" style={{ marginBottom: "20px" }}>
                  <label className="form-label">Author Byline</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        /* LIVE PREVIEW TAB */
        <div className="card" style={{ padding: "40px", maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <span className="card-badge">{formData.category}</span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {calculateReadTime(formData.content)}
            </span>
          </div>

          <h1 style={{ fontSize: "2.4rem", marginBottom: "18px" }}>
            {formData.title || "Untitled Article"}
          </h1>

          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "28px" }}>
            {formData.excerpt}
          </p>

          <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "24px", color: "var(--text-secondary)", lineHeight: "1.8" }}>
            {formData.content.split("\n\n").map((par, i) => {
              if (par.startsWith("## ")) {
                return <h2 key={i} style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "24px", marginBottom: "12px", color: "var(--text-primary)" }}>{par.replace("## ", "")}</h2>;
              }
              if (par.startsWith("```")) {
                return (
                  <pre key={i} style={{ margin: "16px 0" }}>
                    <code>{par.replace(/```[a-z]*/g, "")}</code>
                  </pre>
                );
              }
              return <p key={i} style={{ marginBottom: "16px" }}>{par}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
