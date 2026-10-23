import { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { validateAdSenseConfig } from "../../utils/validation";
import {
  DollarSign,
  ShieldAlert,
  Save,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Eye,
  FileCode,
  ExternalLink
} from "lucide-react";

export default function AdminAdSense() {
  const { adSettings, updateAdSettings, addToast } = useCMS();

  const [settings, setSettings] = useState(adSettings);
  const [errors, setErrors] = useState({});

  const handleGlobalToggle = (e) => {
    setSettings((prev) => ({ ...prev, enabled: e.target.checked }));
  };

  const handlePreviewToggle = (e) => {
    setSettings((prev) => ({ ...prev, previewMode: e.target.checked }));
  };

  const handlePublisherIdChange = (e) => {
    setSettings((prev) => ({ ...prev, publisherId: e.target.value.trim() }));
  };

  const handleSlotToggle = (slotKey) => {
    setSettings((prev) => ({
      ...prev,
      slots: {
        ...prev.slots,
        [slotKey]: {
          ...prev.slots[slotKey],
          enabled: !prev.slots[slotKey].enabled
        }
      }
    }));
  };

  const handleSlotIdChange = (slotKey, newSlotId) => {
    setSettings((prev) => ({
      ...prev,
      slots: {
        ...prev.slots,
        [slotKey]: {
          ...prev.slots[slotKey],
          slotId: newSlotId.trim()
        }
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const validation = validateAdSenseConfig(settings);
    if (!validation.isValid) {
      setErrors(validation.errors);
      addToast(validation.errors.publisherId || "Invalid AdSense configuration", "error");
      return;
    }

    setErrors({});
    updateAdSettings(settings);
  };

  return (
    <div style={{ maxWidth: "900px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "6px" }}>
          Google AdSense & Monetization Management
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
          Centralized configuration for editorial technology blog advertising slots and verification.
        </p>
      </div>

      {/* Advisory Notice */}
      <div
        style={{
          background: "rgba(14, 165, 233, 0.08)",
          border: "1px solid rgba(14, 165, 233, 0.25)",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "32px",
          display: "flex",
          gap: "16px",
          alignItems: "flex-start"
        }}
      >
        <HelpCircle size={22} style={{ color: "#38bdf8", flexShrink: 0, marginTop: "2px" }} />
        <div style={{ fontSize: "0.875rem", lineHeight: "1.6", color: "#cbd5e1" }}>
          <strong style={{ color: "#ffffff" }}>AdSense Architecture Standard:</strong> All advertisements are managed through a centralized, XSS-hardened container component with reserved aspect ratios to maintain a Cumulative Layout Shift (CLS) of 0. Before your domain is formally approved by Google, ads remain in <strong>Development Preview Mode</strong> or deactivated.
        </div>
      </div>

      <form onSubmit={handleSave}>
        {/* Global Controls Card */}
        <div className="card" style={{ padding: "28px", marginBottom: "28px" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "20px", color: "#ffffff" }}>
            Global Monetization Settings
          </h2>

          {/* Master Enable Toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "20px" }}>
            <div>
              <div style={{ fontWeight: 600, color: "#ffffff", fontSize: "0.95rem" }}>
                Enable Live Google AdSense Advertisements
              </div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                Toggle to inject approved Google AdSense ad units into public blog articles.
              </div>
            </div>
            <label style={{ position: "relative", display: "inline-block", width: "50px", height: "26px" }}>
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={handleGlobalToggle}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: settings.enabled ? "#00f2fe" : "rgba(255, 255, 255, 0.15)",
                  borderRadius: "34px",
                  transition: "0.3s"
                }}
              />
            </label>
          </div>

          {/* Development Preview Mode Toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "20px" }}>
            <div>
              <div style={{ fontWeight: 600, color: "#ffffff", fontSize: "0.95rem" }}>
                Development Preview Mode (Visual Placeholders)
              </div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                Renders dashed test containers on article pages without loading external Google scripts.
              </div>
            </div>
            <label style={{ position: "relative", display: "inline-block", width: "50px", height: "26px" }}>
              <input
                type="checkbox"
                checked={settings.previewMode}
                onChange={handlePreviewToggle}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: settings.previewMode ? "#34d399" : "rgba(255, 255, 255, 0.15)",
                  borderRadius: "34px",
                  transition: "0.3s"
                }}
              />
            </label>
          </div>

          {/* Publisher ID Input */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: "0.875rem" }}>
              Google AdSense Publisher ID
            </label>
            <input
              type="text"
              value={settings.publisherId}
              onChange={handlePublisherIdChange}
              placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              className="form-control mono"
              style={{ fontSize: "0.9rem" }}
            />
            {errors.publisherId && (
              <div className="form-error">{errors.publisherId}</div>
            )}
            <div className="form-help">
              Format must be <code>ca-pub-</code> followed by 16 digits provided in your official Google AdSense console.
            </div>
          </div>
        </div>

        {/* Slot-by-Slot Configuration Card */}
        <div className="card" style={{ padding: "28px", marginBottom: "28px" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "20px", color: "#ffffff" }}>
            Placement Slots & Ad Unit Identifiers
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {Object.entries(settings.slots || {}).map(([slotKey, slotData]) => (
              <div
                key={slotKey}
                style={{
                  background: "#111a30",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "8px",
                  padding: "18px 20px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "#ffffff", fontSize: "0.9rem" }}>
                      {slotData.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "#00f2fe" }}>
                      Slot Key: {slotKey}
                    </div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#cbd5e1", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={slotData.enabled}
                      onChange={() => handleSlotToggle(slotKey)}
                      style={{ accentColor: "var(--accent-cyan)" }}
                    />
                    <span>Active Slot</span>
                  </label>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "0.8rem", color: "#94a3b8", whiteSpace: "nowrap" }}>Ad Unit ID:</span>
                  <input
                    type="text"
                    value={slotData.slotId}
                    onChange={(e) => handleSlotIdChange(slotKey, e.target.value)}
                    placeholder="e.g. 1234567890"
                    className="form-control mono"
                    style={{ height: "36px", fontSize: "0.85rem" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ads.txt Information Card */}
        <div className="card" style={{ padding: "24px", marginBottom: "28px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FileCode size={18} style={{ color: "var(--accent-cyan)" }} />
            <span>Authorized Digital Sellers (ads.txt) Configuration</span>
          </h3>
          <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: "1.6", marginBottom: "14px" }}>
            To prevent ad fraud, Google AdSense requires placing an <code>ads.txt</code> file in your public root directory. Your current generated entry:
          </p>
          <pre style={{ margin: 0, padding: "12px 16px" }}>
            <code>google.com, {settings.publisherId.replace("ca-", "") || "pub-0000000000000000"}, DIRECT, f08c47fec0942fa0</code>
          </pre>
          <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "8px" }}>
            This entry is automatically mirrored in <code>public/ads.txt</code>.
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Save size={18} />
          <span>Save Monetization Configuration</span>
        </button>
      </form>
    </div>
  );
}
