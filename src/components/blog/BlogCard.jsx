import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatters";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

export default function BlogCard({ post }) {
  if (!post) return null;

  return (
    <article className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Category & Read Time */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
        <span className="card-badge">{post.category}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Calendar size={13} />
            <span>{formatDate(post.publishedDate)}</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Clock size={13} />
            <span>{post.readTime}</span>
          </span>
        </div>
      </div>

      {/* Post Title */}
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: "1.35", marginBottom: "12px" }}>
        <Link
          to={`/blog/${post.slug}`}
          style={{ color: "var(--text-primary)", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.target.style.color = "var(--accent-cyan)")}
          onMouseLeave={(e) => (e.target.style.color = "var(--text-primary)")}
        >
          {post.title}
        </Link>
      </h3>

      {/* Excerpt */}
      <p style={{ fontSize: "0.925rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px", flex: 1 }}>
        {post.excerpt}
      </p>

      {/* Footer / Read More */}
      <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid var(--accent-cyan)",
              background: "#070B13"
            }}
          >
            <img
              src="/profile-square.png"
              alt={post.author || "Abhijit Mondal"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 }}>
            {post.author || "Abhijit Mondal"}
          </span>
        </div>

        <Link
          to={`/blog/${post.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            color: "var(--accent-cyan)",
            fontSize: "0.84rem",
            fontWeight: 600
          }}
        >
          <span>Read Article</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
