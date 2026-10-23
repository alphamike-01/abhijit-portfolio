import { useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../../context/CMSContext";
import { formatDate } from "../../utils/formatters";
import {
  Inbox,
  FileText,
  FolderTree,
  Image,
  DollarSign,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Database,
  RefreshCw,
  Server,
  HardDrive
} from "lucide-react";

export default function AdminDashboard() {
  const { quotes, posts, categories, media, adSettings, dbStatus, refreshData, syncToMongoDB } = useCMS();
  const [syncing, setSyncing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Metrics calculation
  const newQuotes = quotes.filter((q) => q.status === "New").length;
  const pendingQuotes = quotes.filter((q) => q.status === "Under Review" || q.status === "Quoted").length;
  const totalQuotes = quotes.length;

  const publishedPosts = posts.filter((p) => p.status === "published").length;
  const draftPosts = posts.filter((p) => p.status === "draft").length;
  const scheduledPosts = posts.filter((p) => p.status === "scheduled").length;

  const recentQuotes = quotes.slice(0, 5);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      await syncToMongoDB();
    } catch {
      // toast handled in context
    } finally {
      setSyncing(false);
    }
  };

  const statsCards = [
    {
      title: "New Service Inquiries",
      value: newQuotes,
      sub: `${pendingQuotes} under active review`,
      link: "/admin/quotes",
      icon: Inbox,
      highlight: newQuotes > 0
    },
    {
      title: "Published Articles",
      value: publishedPosts,
      sub: `${draftPosts} drafts, ${scheduledPosts} scheduled`,
      link: "/admin/blog",
      icon: FileText
    },
    {
      title: "Content Categories",
      value: categories.length,
      sub: "Active taxonomy labels",
      link: "/admin/categories",
      icon: FolderTree
    },
    {
      title: "Media Library Assets",
      value: media.length,
      sub: "Images & diagrams in storage",
      link: "/admin/media",
      icon: Image
    }
  ];

  const isDbConnected = Boolean(dbStatus?.connected);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "8px" }}>
          Platform Dashboard & Analytics
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
          Manage your client service pipeline, technical publications, media assets, and monetization settings.
        </p>
      </div>

      {/* Database Connectivity Console */}
      <div
        style={{
          background: isDbConnected ? "rgba(16, 185, 129, 0.08)" : "rgba(245, 158, 11, 0.08)",
          border: `1px solid ${isDbConnected ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
          borderRadius: "12px",
          padding: "20px 24px",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "18px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: isDbConnected ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
              border: `1px solid ${isDbConnected ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isDbConnected ? "#10b981" : "#f59e0b"
            }}
          >
            <Database size={22} />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff" }}>
                MongoDB Database Connectivity
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: isDbConnected ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                  color: isDbConnected ? "#10b981" : "#f59e0b",
                  border: `1px solid ${isDbConnected ? "rgba(16, 185, 129, 0.4)" : "rgba(245, 158, 11, 0.4)"}`
                }}
              >
                ● {isDbConnected ? "ONLINE · CONNECTED" : "OFFLINE / LOCAL STORAGE CACHE ACTIVE"}
              </span>
            </div>

            <div style={{ fontSize: "0.825rem", color: "#94a3b8" }}>
              Engine: <strong style={{ color: "#ffffff" }}>Mongoose + MongoDB</strong> | Target: <code style={{ color: "#00f2fe" }}>{dbStatus?.uri || "mongodb://127.0.0.1:27017/abhijit_portfolio"}</code>
              {dbStatus?.counts && (
                <span> | Live Documents: {dbStatus.counts.quotes} quotes, {dbStatus.counts.posts} posts, {dbStatus.counts.media} media</span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn btn-outline btn-sm"
            style={{ fontSize: "0.8rem", gap: "6px" }}
          >
            <RefreshCw size={14} className={refreshing ? "spin-pulse" : ""} />
            <span>Test Connection</span>
          </button>

          {isDbConnected && (
            <button
              onClick={handleSync}
              disabled={syncing}
              className="btn btn-primary btn-sm"
              style={{ fontSize: "0.8rem", gap: "6px" }}
            >
              <HardDrive size={14} />
              <span>{syncing ? "Syncing..." : "Sync Local Data to MongoDB"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              style={{
                background: "#0d1424",
                border: `1px solid ${card.highlight ? "#00f2fe" : "rgba(255, 255, 255, 0.08)"}`,
                borderRadius: "12px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, border-color 0.2s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#94a3b8" }}>{card.title}</span>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: card.highlight ? "rgba(0, 242, 254, 0.15)" : "rgba(255, 255, 255, 0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: card.highlight ? "#00f2fe" : "#cbd5e1"
                  }}
                >
                  <Icon size={18} />
                </div>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", marginBottom: "6px" }}>
                {card.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                {card.sub}
              </div>
            </Link>
          );
        })}
      </div>

      {/* AdSense Status Alert Banner */}
      <div
        style={{
          background: adSettings.enabled ? "rgba(16, 185, 129, 0.1)" : "rgba(14, 165, 233, 0.1)",
          border: `1px solid ${adSettings.enabled ? "rgba(16, 185, 129, 0.3)" : "rgba(14, 165, 233, 0.3)"}`,
          borderRadius: "12px",
          padding: "18px 24px",
          marginBottom: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        <div>
          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
            Monetization Status: {adSettings.enabled ? "Active" : "Ready / Standby"}
          </div>
          <div style={{ fontSize: "0.825rem", color: "#94a3b8" }}>
            Publisher ID: <code style={{ color: "#00f2fe" }}>{adSettings.publisherId}</code> | Preview Mode: {adSettings.previewMode ? "Enabled" : "Disabled"}
          </div>
        </div>
        <Link to="/admin/adsense" className="btn btn-outline btn-sm">
          <span>Configure AdSense Placements</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Recent Quote Inquiries */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff" }}>
            Recent Service Quote Enquiries
          </h2>
          <Link to="/admin/quotes" style={{ fontSize: "0.85rem", color: "#00f2fe", fontWeight: 600 }}>
            View All ({totalQuotes}) →
          </Link>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client Name</th>
                <th>Service Category</th>
                <th>Budget Range</th>
                <th>Status</th>
                <th>Date Received</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentQuotes.map((q) => (
                <tr key={q.id}>
                  <td style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "#00f2fe" }}>{q.id}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: "#ffffff" }}>{q.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{q.organization || q.email}</div>
                  </td>
                  <td>{q.serviceTitle}</td>
                  <td style={{ color: "#38bdf8", fontWeight: 500 }}>{q.budgetRange}</td>
                  <td>
                    <span className={`status-pill status-${q.status.toLowerCase().replace(/\s+/g, "")}`}>
                      ● {q.status}
                    </span>
                  </td>
                  <td>{formatDate(q.createdAt)}</td>
                  <td>
                    <Link to="/admin/quotes" className="btn btn-outline btn-sm" style={{ padding: "4px 10px", fontSize: "0.75rem" }}>
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
