import { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { formatDate } from "../../utils/formatters";
import {
  Inbox,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  ShieldAlert,
  X,
  FileSpreadsheet
} from "lucide-react";

export default function AdminQuotes() {
  const { quotes, updateQuoteStatus, deleteQuote, addToast } = useCMS();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [internalNotes, setInternalNotes] = useState("");

  const statusOptions = ["All", "New", "Under Review", "Quoted", "In Progress", "Completed", "Archived"];

  // Filtered quotes
  const filtered = quotes.filter((q) => {
    const matchesSearch =
      search === "" ||
      q.id.toLowerCase().includes(search.toLowerCase()) ||
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      q.projectTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || q.status === statusFilter;
    const matchesService = serviceFilter === "All" || q.serviceId === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  const handleOpenDetail = (quote) => {
    setSelectedQuote(quote);
    setInternalNotes(quote.notes || "");
  };

  const handleSaveNotes = () => {
    if (selectedQuote) {
      updateQuoteStatus(selectedQuote.id, selectedQuote.status, internalNotes);
      setSelectedQuote((prev) => ({ ...prev, notes: internalNotes }));
    }
  };

  const handleStatusChange = (newStatus) => {
    if (selectedQuote) {
      updateQuoteStatus(selectedQuote.id, newStatus, internalNotes);
      setSelectedQuote((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // CSV Export functionality
  const handleExportCSV = () => {
    if (filtered.length === 0) {
      addToast("No quotes available to export", "warning");
      return;
    }

    const headers = ["Quote ID", "Date", "Status", "Client Name", "Email", "Phone", "Organization", "Service", "Project Title", "Budget Range", "Timeline", "Notes"];
    const rows = filtered.map((q) => [
      q.id,
      q.createdAt,
      q.status,
      `"${q.name.replace(/"/g, '""')}"`,
      `"${q.email.replace(/"/g, '""')}"`,
      `"${(q.phone || "").replace(/"/g, '""')}"`,
      `"${(q.organization || "").replace(/"/g, '""')}"`,
      `"${q.serviceTitle.replace(/"/g, '""')}"`,
      `"${q.projectTitle.replace(/"/g, '""')}"`,
      `"${q.budgetRange}"`,
      `"${q.timeline}"`,
      `"${(q.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `abhijit_mondal_service_quotes_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Exported quotes to CSV successfully", "success");
  };

  return (
    <div>
      {/* Header with Export */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "6px" }}>
            Service Quote Enquiries
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Review, evaluate, and manage client project submissions and scoping requests.
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn btn-secondary btn-sm" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <FileSpreadsheet size={16} />
          <span>Export CSV ({filtered.length})</span>
        </button>
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
            placeholder="Search by ID, client name, email, or project title..."
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
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Service</th>
              <th>Budget</th>
              <th>Timeline</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((quote) => (
                <tr key={quote.id}>
                  <td style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "#00f2fe" }}>
                    {quote.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: "#ffffff" }}>{quote.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{quote.email}</div>
                  </td>
                  <td style={{ fontSize: "0.85rem" }}>{quote.serviceTitle}</td>
                  <td style={{ color: "#38bdf8", fontWeight: 500 }}>{quote.budgetRange}</td>
                  <td style={{ fontSize: "0.85rem" }}>{quote.timeline}</td>
                  <td>
                    <span className={`status-pill status-${quote.status.toLowerCase().replace(/\s+/g, "")}`}>
                      ● {quote.status}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{formatDate(quote.createdAt)}</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleOpenDetail(quote)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "4px 8px" }}
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete inquiry ${quote.id}?`)) {
                            deleteQuote(quote.id);
                          }
                        }}
                        style={{ padding: "4px 8px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", borderRadius: "6px" }}
                        title="Delete Inquiry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                  No service requests found matching the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL DRAWER */}
      {selectedQuote && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "flex-end",
            zIndex: 1000,
            backdropFilter: "blur(6px)"
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "100vh",
              background: "#0d1424",
              borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "32px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <span className="card-badge" style={{ marginBottom: "6px" }}>{selectedQuote.id}</span>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff" }}>
                  Enquiry Details
                </h2>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                style={{ color: "#94a3b8", padding: "6px", background: "none", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Status Selector */}
            <div style={{ marginBottom: "24px", padding: "16px", background: "#111a30", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <label style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                UPDATE INQUIRY STATUS:
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["New", "Under Review", "Quoted", "In Progress", "Completed", "Archived"].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className={`btn btn-sm ${selectedQuote.status === st ? "btn-primary" : "btn-secondary"}`}
                    style={{ fontSize: "0.75rem", padding: "6px 12px" }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Info Grid */}
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "0.85rem", color: "#00f2fe", fontFamily: "var(--font-mono)", marginBottom: "12px" }}>
                // CLIENT INFORMATION
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.875rem" }}>
                <div><strong>Name:</strong> {selectedQuote.name}</div>
                <div><strong>Email:</strong> <a href={`mailto:${selectedQuote.email}`} style={{ color: "#38bdf8", overflowWrap: "anywhere", wordBreak: "break-all" }}>{selectedQuote.email}</a></div>
                <div><strong>Phone / WhatsApp:</strong> {selectedQuote.phone || "Not provided"}</div>
                <div><strong>Organization:</strong> {selectedQuote.organization || "Independent client"}</div>
                <div><strong>Preferred Channel:</strong> {selectedQuote.preferredContact}</div>
              </div>
            </div>

            {/* Project Scope */}
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "0.85rem", color: "#00f2fe", fontFamily: "var(--font-mono)", marginBottom: "12px" }}>
                // PROJECT SPECIFICATION
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.875rem" }}>
                <div><strong>Service Category:</strong> {selectedQuote.serviceTitle}</div>
                <div><strong>Project Title:</strong> {selectedQuote.projectTitle}</div>
                <div><strong>Budget Range:</strong> <span style={{ color: "#34d399", fontWeight: 600 }}>{selectedQuote.budgetRange}</span></div>
                <div><strong>Timeline:</strong> {selectedQuote.timeline}</div>
                {selectedQuote.projectUrl && (
                  <div>
                    <strong>Reference URL:</strong>{" "}
                    <a href={selectedQuote.projectUrl} target="_blank" rel="noreferrer" style={{ color: "#38bdf8", overflowWrap: "anywhere", wordBreak: "break-all" }}>
                      {selectedQuote.projectUrl}
                    </a>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "14px", padding: "12px", background: "rgba(255, 255, 255, 0.03)", borderRadius: "6px" }}>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "4px" }}>Description:</div>
                <div style={{ fontSize: "0.875rem", color: "#cbd5e1", lineHeight: "1.6" }}>
                  {selectedQuote.projectDescription}
                </div>
              </div>

              {/* Penetration Testing Attestation */}
              {selectedQuote.authorizedAttestation && (
                <div style={{ marginTop: "12px", padding: "10px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "6px", display: "flex", gap: "8px", alignItems: "center" }}>
                  <CheckCircle2 size={16} style={{ color: "#34d399" }} />
                  <span style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: 600 }}>
                    Legal Security Assessment Authorization Attestation Confirmed
                  </span>
                </div>
              )}
            </div>

            {/* Private Notes */}
            <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "18px" }}>
              <label style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                Private Internal Notes (Admin Only):
              </label>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Log internal follow-up, proposal status, NDA signatures, or pricing notes..."
                className="form-control"
                rows={3}
                style={{ fontSize: "0.85rem", marginBottom: "10px" }}
              />
              <button onClick={handleSaveNotes} className="btn btn-primary btn-sm">
                Save Internal Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
