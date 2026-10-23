import { useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../../context/CMSContext";
import { formatDate } from "../../utils/formatters";
import {
  FileText,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  Calendar,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function AdminBlog() {
  const { posts, deletePost } = useCMS();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = posts.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header with New Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "6px" }}>
            Editorial Blog Manager
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Publish, edit, and schedule technical articles, forensic research, and guides.
          </p>
        </div>

        <Link to="/admin/blog/new" className="btn btn-primary btn-sm" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Plus size={16} />
          <span>Create New Article</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: "#0d1424",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "12px",
          padding: "18px",
          marginBottom: "28px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "center"
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
          <input
            type="text"
            placeholder="Search articles by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ paddingLeft: "38px", height: "40px", fontSize: "0.85rem" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-control"
            style={{ width: "auto", height: "40px", fontSize: "0.85rem" }}
          >
            {["All", "published", "draft", "scheduled", "archived"].map((st) => (
              <option key={st} value={st}>
                {st.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title & Excerpt</th>
              <th>Category</th>
              <th>Status</th>
              <th>Author</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((post) => (
                <tr key={post.id}>
                  <td style={{ maxWidth: "340px" }}>
                    <div style={{ fontWeight: 600, color: "#ffffff", marginBottom: "4px" }}>
                      {post.title}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      /{post.slug}
                    </div>
                  </td>
                  <td>
                    <span className="card-badge" style={{ fontSize: "0.72rem" }}>
                      {post.category}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background:
                          post.status === "published"
                            ? "rgba(16, 185, 129, 0.15)"
                            : post.status === "draft"
                            ? "rgba(245, 158, 11, 0.15)"
                            : "rgba(56, 189, 248, 0.15)",
                        color:
                          post.status === "published"
                            ? "#34d399"
                            : post.status === "draft"
                            ? "#fbbf24"
                            : "#38bdf8",
                        textTransform: "capitalize"
                      }}
                    >
                      ● {post.status}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>{post.author || "Abhijit Mondal"}</td>
                  <td style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{formatDate(post.publishedDate)}</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link
                        to={`/admin/blog/edit/${post.id}`}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "4px 8px" }}
                        title="Edit Article"
                      >
                        <Edit3 size={14} />
                      </Link>
                      {post.status === "published" && (
                        <Link
                          to={`/blog/${post.slug}`}
                          target="_blank"
                          className="btn btn-outline btn-sm"
                          style={{ padding: "4px 8px" }}
                          title="View Live Article"
                        >
                          <ExternalLink size={14} />
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                            deletePost(post.id);
                          }
                        }}
                        style={{ padding: "4px 8px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", borderRadius: "6px" }}
                        title="Delete Article"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                  No blog articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
