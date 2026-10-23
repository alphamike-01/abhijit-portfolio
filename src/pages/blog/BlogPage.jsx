import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCMS } from "../../context/CMSContext";
import BlogCard from "../../components/blog/BlogCard";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import AdContainer from "../../components/ads/AdContainer";
import { updateSEO } from "../../utils/seo";
import { Search, Tag, BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const { posts, categories } = useCMS();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    updateSEO({
      title: "Technology & Cybersecurity Engineering Blog — Abhijit Mondal",
      description: "Original in-depth technical publications on Static PE Malware Analysis, Linux Incident Response, OWASP API Security, and Full-Stack Resilient Architecture.",
      canonical: "https://abhijitmondal.dev/blog"
    });
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const publishedPosts = posts.filter((p) => p.status === "published");

  // Filtering
  const filteredPosts = publishedPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = publishedPosts.find((p) => p.featured) || publishedPosts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== (selectedCategory === "All" && !searchQuery ? featuredPost?.id : null));

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    if (catName === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catName });
    }
  };

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Blog & Editorial" }]} />

        {/* Editorial Header */}
        <div style={{ maxWidth: "780px", marginBottom: "48px" }}>
          <span className="section-tag">ENGINEERING JOURNAL</span>
          <h1 style={{ marginBottom: "16px" }}>
            Technology, Security & Machine Learning Insights
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
            Field notes, security research, malware analysis breakdowns, and practical full-stack engineering playbooks.
          </p>
        </div>

        {/* Search Bar & Category Navigation */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginBottom: "48px",
            background: "var(--bg-secondary)",
            padding: "24px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--card-border)"
          }}
        >
          {/* Search Input */}
          <div style={{ position: "relative", width: "100%" }}>
            <Search
              size={18}
              style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search articles by keyword, technology, or security vulnerability..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: "46px" }}
            />
          </div>

          {/* Category Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              onClick={() => handleCategorySelect("All")}
              className={`btn btn-sm ${selectedCategory === "All" ? "btn-primary" : "btn-secondary"}`}
              style={{ fontSize: "0.82rem" }}
            >
              All Topics ({publishedPosts.length})
            </button>
            {categories.map((cat) => {
              const count = publishedPosts.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`btn btn-sm ${selectedCategory.toLowerCase() === cat.name.toLowerCase() ? "btn-primary" : "btn-secondary"}`}
                  style={{ fontSize: "0.82rem" }}
                >
                  {cat.name} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Story Hero (When viewing All and no search) */}
        {selectedCategory === "All" && !searchQuery && featuredPost && (
          <div
            className="card"
            style={{
              padding: "40px",
              marginBottom: "56px",
              background: "radial-gradient(circle at 80% 20%, rgba(0, 242, 254, 0.08) 0%, var(--card-bg) 100%)",
              border: "1px solid var(--card-border-hover)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span className="badge badge-cyan">FEATURED INVESTIGATION</span>
              <span className="card-badge">{featuredPost.category}</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{featuredPost.readTime}</span>
            </div>

            <h2 style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)", fontWeight: 800, marginBottom: "16px" }}>
              <Link
                to={`/blog/${featuredPost.slug}`}
                style={{ color: "var(--text-primary)" }}
              >
                {featuredPost.title}
              </Link>
            </h2>

            <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.7", maxWidth: "800px", marginBottom: "24px" }}>
              {featuredPost.excerpt}
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1.5px solid var(--accent-cyan)",
                    background: "#070B13"
                  }}
                >
                  <img
                    src="/profile-square.png"
                    alt={featuredPost.author}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{featuredPost.author}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{featuredPost.authorRole}</div>
                </div>
              </div>

              <Link to={`/blog/${featuredPost.slug}`} className="btn btn-primary btn-sm">
                <span>Read Full Article</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* AdSense Placement between cards */}
        <AdContainer slot="between-cards" />

        {/* Article Grid */}
        {regularPosts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "28px"
            }}
          >
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>
            <BookOpen size={40} style={{ color: "var(--text-muted)", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>No Articles Found</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "450px", margin: "0 auto 20px" }}>
              No published articles matched your search criteria. Try selecting another category or clearing your search query.
            </p>
            <button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }} className="btn btn-secondary btn-sm">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
