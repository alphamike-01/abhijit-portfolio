import { createContext, useContext, useState, useEffect } from "react";
import {
  quotesStore,
  blogStore,
  categoriesStore,
  mediaStore,
  adSettingsStore
} from "../utils/storage";

const CMSContext = createContext();

export function CMSProvider({ children }) {
  const [quotes, setQuotes] = useState(() => quotesStore.getAll());
  const [posts, setPosts] = useState(() => blogStore.getAll());
  const [categories, setCategories] = useState(() => categoriesStore.getAll());
  const [media, setMedia] = useState(() => mediaStore.getAll());
  const [adSettings, setAdSettings] = useState(() => adSettingsStore.get());
  const [toasts, setToasts] = useState([]);

  // Toast notification helper
  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Quotes Actions
  const submitQuote = (quoteData) => {
    const created = quotesStore.create(quoteData);
    setQuotes((prev) => [created, ...prev]);
    addToast("Quote request submitted successfully! Reference: " + created.id, "success");
    return created;
  };

  const updateQuoteStatus = (id, status, notes = "") => {
    const updated = quotesStore.update(id, { status, notes });
    if (updated) {
      setQuotes((prev) => prev.map((q) => (q.id === id ? updated : q)));
      addToast(`Request ${id} status updated to ${status}`, "success");
    }
    return updated;
  };

  const deleteQuote = (id) => {
    quotesStore.delete(id);
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    addToast("Quote request removed", "info");
  };

  // Blog Posts Actions
  const savePost = (postData) => {
    if (postData.id && blogStore.getAll().some((p) => p.id === postData.id)) {
      const updated = blogStore.update(postData.id, postData);
      setPosts((prev) => prev.map((p) => (p.id === postData.id ? updated : p)));
      addToast("Article updated successfully!", "success");
      return updated;
    } else {
      const created = blogStore.create(postData);
      setPosts((prev) => [created, ...prev]);
      addToast("New article created successfully!", "success");
      return created;
    }
  };

  const deletePost = (id) => {
    blogStore.delete(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    addToast("Article deleted", "info");
  };

  // Categories Actions
  const saveCategory = (categoryData) => {
    if (categoryData.id && categories.some((c) => c.id === categoryData.id)) {
      const updated = categoriesStore.update(categoryData.id, categoryData);
      setCategories((prev) => prev.map((c) => (c.id === categoryData.id ? updated : c)));
      addToast("Category updated", "success");
      return updated;
    } else {
      const created = categoriesStore.create(categoryData);
      setCategories((prev) => [...prev, created]);
      addToast("New category added", "success");
      return created;
    }
  };

  const deleteCategory = (id) => {
    // Check if category is used in existing posts
    const isUsed = posts.some((p) => p.category.toLowerCase() === id.toLowerCase());
    if (isUsed) {
      addToast("Cannot delete category because active articles are assigned to it.", "error");
      return false;
    }
    categoriesStore.delete(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addToast("Category removed", "info");
    return true;
  };

  // Media Actions
  const addMediaAsset = (mediaItem) => {
    const created = mediaStore.add(mediaItem);
    setMedia((prev) => [created, ...prev]);
    addToast("Media asset uploaded successfully", "success");
    return created;
  };

  const deleteMediaAsset = (id) => {
    mediaStore.delete(id);
    setMedia((prev) => prev.filter((m) => m.id !== id));
    addToast("Media asset deleted", "info");
  };

  // AdSense Settings Actions
  const updateAdSettings = (newSettings) => {
    const saved = adSettingsStore.save(newSettings);
    setAdSettings(saved);
    addToast("Monetization settings saved", "success");
    return saved;
  };

  return (
    <CMSContext.Provider
      value={{
        quotes,
        submitQuote,
        updateQuoteStatus,
        deleteQuote,
        posts,
        savePost,
        deletePost,
        categories,
        saveCategory,
        deleteCategory,
        media,
        addMediaAsset,
        deleteMediaAsset,
        adSettings,
        updateAdSettings,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
