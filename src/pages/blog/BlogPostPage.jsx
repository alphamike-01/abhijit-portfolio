import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCMS } from "../../context/CMSContext";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import TableOfContents from "../../components/blog/TableOfContents";
import ReadingProgressBar from "../../components/blog/ReadingProgressBar";
import BlogCard from "../../components/blog/BlogCard";
import AdContainer from "../../components/ads/AdContainer";
import { updateSEO, generateArticleSchema } from "../../utils/seo";
import { formatDate } from "../../utils/formatters";
import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Check,
  Tag,
  ArrowLeft,
  ArrowRight,
  Shield
} from "lucide-react";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { posts, addToast } = useCMS();
  const [copied, setCopied] = useState(false);

  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      updateSEO({
        title: post.seoTitle || `${post.title} — Abhijit Mondal`,
        description: post.seoDescription || post.excerpt,
        canonical: `https://abhijitmondal.dev/blog/${post.slug}`,
        ogType: "article",
        ogImage: post.coverImage || "/blog/blog-malware-ml.svg",
        jsonLd: generateArticleSchema(post)
      });
    }
  }, [post]);

  if (!post) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2>Article Not Found</h2>
        <p>The requested publication could not be found or has been moved.</p>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: "16px" }}>
          Back to Blog Overview
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    addToast("Article link copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  const relatedArticles = posts
    .filter((p) => p.id !== post.id && p.status === "published" && (p.category === post.category || true))
    .slice(0, 2);

  // Helper to render content with markdown headings and code blocks
  const renderFormattedContent = (contentString) => {
    if (!contentString) return null;

    const sections = contentString.split("\n\n");
    return sections.map((sec, idx) => {
      const trimmed = sec.trim();

      // Heading 2
      if (trimmed.startsWith("## ")) {
        const titleText = trimmed.replace("## ", "");
        const id = titleText.toLowerCase().replace(/[^\w-]+/g, "-").replace(/--+/g, "-");
        return (
          <h2
            key={idx}
            id={id}
            style={{
              fontSize: "1.7rem",
              fontWeight: 700,
              marginTop: "44px",
              marginBottom: "16px",
              scrollMarginTop: "100px",
              color: "var(--text-primary)"
            }}
          >
            {titleText}
          </h2>
        );
      }

      // Heading 3
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={idx}
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              marginTop: "28px",
              marginBottom: "12px",
              color: "var(--text-primary)"
            }}
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      }

      // Code Block
      if (trimmed.startsWith("```")) {
        const lines = trimmed.split("\n");
        const lang = lines[0].replace("```", "").trim() || "code";
        const codeContent = lines.slice(1, -1).join("\n");
        return (
          <div key={idx} style={{ margin: "24px 0" }}>
            <div
              style={{
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                color: "var(--accent-cyan)",
                background: "#0d1424",
                padding: "4px 14px",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
                border: "1px solid var(--card-border)",
                borderBottom: "none",
                display: "inline-block"
              }}
            >
              {lang.toUpperCase()}
            </div>
            <pre style={{ marginTop: 0, borderTopLeftRadius: 0 }}>
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      }

      // Bullet List
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        const items = trimmed.split("\n").filter((l) => l.trim().length > 0);
        return (
          <ul
            key={idx}
            style={{
              listStyle: "disc",
              paddingLeft: "24px",
              margin: "18px 0",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              color: "var(--text-secondary)",
              fontSize: "1.025rem"
            }}
          >
            {items.map((it, i) => (
              <li key={i}>{it.replace(/^[\*\-]\s+/, "")}</li>
            ))}
          </ul>
        );
      }

      // Numbered List
      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed.split("\n").filter((l) => l.trim().length > 0);
        return (
          <ol
            key={idx}
            style={{
              listStyle: "decimal",
              paddingLeft: "24px",
              margin: "18px 0",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              color: "var(--text-secondary)",
              fontSize: "1.025rem"
            }}
          >
            {items.map((it, i) => (
              <li key={i}>{it.replace(/^\d+\.\s+/, "")}</li>
            ))}
          </ol>
        );
      }

      // Standard Paragraph
      return (
        <p
          key={idx}
          style={{
            fontSize: "1.05rem",
            lineHeight: "1.8",
            marginBottom: "20px",
            color: "var(--text-secondary)"
          }}
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
      <ReadingProgressBar />

      <div className="container" style={{ maxWidth: "1140px" }}>
        <Breadcrumbs
          items={[
            { label: "Blog", path: "/blog" },
            { label: post.category, path: `/blog?category=${encodeURIComponent(post.category)}` },
            { label: post.title }
          ]}
        />

        {/* Article Header */}
        <header style={{ maxWidth: "860px", marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span className="card-badge">{post.category}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "0.825rem", color: "var(--text-muted)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Calendar size={14} />
                <span>Published {formatDate(post.publishedDate)}</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Clock size={14} />
                <span>{post.readTime}</span>
              </span>
            </div>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4.2vw, 3.2rem)", lineHeight: "1.18", marginBottom: "20px" }}>
            {post.title}
          </h1>

          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "28px" }}>
            {post.excerpt}
          </p>

          {/* Author Byline & Social Share Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              borderTop: "1px solid var(--card-border)",
              borderBottom: "1px solid var(--card-border)",
              padding: "16px 0"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid var(--accent-cyan)",
                  background: "#070B13"
                }}
              >
                <img
                  src="/profile-square.png"
                  alt={post.author || "Abhijit Mondal"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                  {post.author || "Abhijit Mondal"}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  {post.authorRole || "Cybersecurity Specialist & M.Sc. IT (Forensics)"}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={handleCopyLink}
                className="btn btn-secondary btn-sm"
                aria-label="Copy article link"
              >
                {copied ? <Check size={14} style={{ color: "var(--accent-emerald)" }} /> : <Share2 size={14} />}
                <span>{copied ? "Link Copied!" : "Share Link"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="article-layout-grid">
          {/* Article Body */}
          <article className="article-body" style={{ minWidth: 0 }}>
            {/* In-Article Advertisement placement 1 */}
            <AdContainer slot="in-article" />

            {renderFormattedContent(post.content)}

            {/* In-Article Advertisement placement 2 */}
            <AdContainer slot="in-article" />

            {/* Tags footer */}
            {post.tags && post.tags.length > 0 && (
              <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid var(--card-border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <Tag size={15} style={{ color: "var(--accent-cyan)" }} />
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Tagged in:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.78rem",
                        padding: "3px 10px",
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--card-border)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--text-secondary)"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sticky Sidebar: Table of Contents & Ad Container */}
          <aside style={{ position: "sticky", top: "96px", display: "flex", flexDirection: "column", gap: "28px" }}>
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <TableOfContents items={post.tableOfContents} />
            )}

            {/* Sidebar AdSense Placement */}
            <AdContainer slot="sidebar" />
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div style={{ marginTop: "80px", paddingTop: "48px", borderTop: "1px solid var(--card-border)" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "28px" }}>
              Related Publications & Security Guides
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "28px" }}>
              {relatedArticles.map((rel) => (
                <BlogCard key={rel.id} post={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 992px) {
          .container > div[style*="gridTemplateColumns: 1fr 280px"] {
            grid-template-columns: 1fr !important;
          }
          aside {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
