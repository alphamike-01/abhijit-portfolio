import { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  Edit2,
  AlertCircle
} from "lucide-react";

export default function AdminMedia() {
  const { media, addMediaAsset, deleteMediaAsset, addToast } = useCMS();

  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // New asset form
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [newCaption, setNewCaption] = useState("");

  const filteredMedia = media.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      (m.altText && m.altText.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    addToast("Asset URL copied to clipboard!", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) {
      addToast("Asset title and valid URL are required", "error");
      return;
    }

    const newAsset = {
      id: `media-${Date.now()}`,
      title: newTitle.trim(),
      filename: newUrl.split("/").pop() || "asset.png",
      url: newUrl.trim(),
      fileSize: "Custom",
      mimeType: "image/png",
      dimensions: "Dynamic",
      altText: newAlt.trim() || newTitle.trim(),
      caption: newCaption.trim(),
      uploadedAt: new Date().toISOString().split("T")[0],
      usedIn: ["Custom upload"]
    };

    addMediaAsset(newAsset);
    setNewTitle("");
    setNewUrl("");
    setNewAlt("");
    setNewCaption("");
  };

  // Mock file upload handler simulating secure client-side image reading
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      addToast("File size exceeds 5MB limit", "error");
      return;
    }

    // Validate MIME type
    const validMimes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
    if (!validMimes.includes(file.type)) {
      addToast("Unsupported file type. Please upload JPEG, PNG, WebP, or SVG.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const uploadedItem = {
        id: `media-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        filename: file.name,
        url: dataUrl,
        fileSize: `${Math.round(file.size / 1024)} KB`,
        mimeType: file.type,
        dimensions: "Uploaded Image",
        altText: file.name,
        caption: "",
        uploadedAt: new Date().toISOString().split("T")[0],
        usedIn: ["Media Library"]
      };
      addMediaAsset(uploadedItem);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "6px" }}>
            Media Library & Assets
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Upload, inspect, and manage images, diagrams, and media attachments with safe validation.
          </p>
        </div>

        {/* Upload Button Trigger */}
        <label className="btn btn-primary btn-sm" style={{ cursor: "pointer", display: "flex", gap: "8px", alignItems: "center" }}>
          <Upload size={16} />
          <span>Upload Image File</span>
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp, image/svg+xml"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Search Bar */}
      <div
        style={{
          background: "#0d1424",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "28px",
          display: "flex",
          gap: "16px",
          alignItems: "center"
        }}
      >
        <Search size={16} style={{ color: "#64748b" }} />
        <input
          type="text"
          placeholder="Search media assets by filename, title, or alt text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          style={{ border: "none", background: "transparent", padding: 0 }}
        />
      </div>

      {/* Media Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "24px",
          marginBottom: "48px"
        }}
      >
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{ padding: "16px", display: "flex", flexDirection: "column" }}
          >
            {/* Preview Frame */}
            <div
              style={{
                width: "100%",
                height: "160px",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#070b13",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={item.url}
                alt={item.altText || item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#ffffff", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.title}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "var(--font-mono)", marginBottom: "12px" }}>
              {item.filename} ({item.fileSize})
            </div>

            <div style={{ display: "flex", gap: "8px", marginTop: "auto", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "12px" }}>
              <button
                onClick={() => handleCopyUrl(item.url, item.id)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, padding: "5px 10px", fontSize: "0.75rem" }}
              >
                {copiedId === item.id ? <Check size={13} style={{ color: "#34d399" }} /> : <Copy size={13} />}
                <span>{copiedId === item.id ? "Copied" : "Copy URL"}</span>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete media asset "${item.title}"?`)) {
                    deleteMediaAsset(item.id);
                  }
                }}
                style={{ padding: "5px 10px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", borderRadius: "6px" }}
                title="Delete Media"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
