import { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { slugify } from "../../utils/formatters";
import { FolderTree, Plus, Edit2, Trash2, Check, X } from "lucide-react";

export default function AdminCategories() {
  const { categories, saveCategory, deleteCategory, posts, addToast } = useCMS();

  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const slug = slugify(newCatName);
    if (categories.some((c) => c.slug === slug)) {
      addToast("A category with this name or slug already exists", "error");
      return;
    }

    saveCategory({
      id: slug,
      slug,
      name: newCatName.trim(),
      description: newCatDesc.trim(),
      count: 0
    });

    setNewCatName("");
    setNewCatDesc("");
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description || "");
  };

  const handleSaveEdit = (cat) => {
    if (!editName.trim()) return;
    saveCategory({
      ...cat,
      name: editName.trim(),
      description: editDesc.trim()
    });
    setEditingId(null);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "6px" }}>
          Taxonomy & Category Management
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
          Organize editorial content, technical research, and guide topics.
        </p>
      </div>

      <div className="admin-two-col">
        {/* Categories Table */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Slug</th>
                <th>Articles Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => {
                const articleCount = posts.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
                const isEditing = editingId === cat.id;

                return (
                  <tr key={cat.id}>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="form-control"
                          style={{ height: "34px", fontSize: "0.85rem" }}
                        />
                      ) : (
                        <div>
                          <div style={{ fontWeight: 600, color: "#ffffff" }}>{cat.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{cat.description}</div>
                        </div>
                      )}
                    </td>
                    <td style={{ fontFamily: "var(--font-mono)", color: "#00f2fe", fontSize: "0.8rem" }}>
                      /{cat.slug}
                    </td>
                    <td>
                      <span className="card-badge" style={{ fontSize: "0.75rem" }}>
                        {articleCount}
                      </span>
                    </td>
                    <td>
                      {isEditing ? (
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button
                            onClick={() => handleSaveEdit(cat)}
                            className="btn btn-primary btn-sm"
                            style={{ padding: "4px 8px" }}
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: "4px 8px" }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => startEdit(cat)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: "4px 8px" }}
                            title="Edit Category"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
                                deleteCategory(cat.id);
                              }
                            }}
                            style={{ padding: "4px 8px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", borderRadius: "6px" }}
                            title="Delete Category"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Category Form Card */}
        <div>
          <div className="card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} style={{ color: "var(--accent-cyan)" }} />
              <span>Add New Category</span>
            </h3>

            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: "0.85rem" }}>
                  Category Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Cloud Security"
                  className="form-control"
                />
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label className="form-label" style={{ fontSize: "0.85rem" }}>
                  Description (Optional)
                </label>
                <textarea
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Brief description of topics covered..."
                  className="form-control"
                  rows={3}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Create Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
