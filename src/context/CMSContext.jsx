import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  quotesStore,
  blogStore,
  categoriesStore,
  mediaStore,
  adSettingsStore
} from "../utils/storage";
import { apiService } from "../services/api";

const CMSContext = createContext();

export function CMSProvider({ children }) {
  const [quotes, setQuotes] = useState(() => quotesStore.getAll());
  const [posts, setPosts] = useState(() => blogStore.getAll());
  const [categories, setCategories] = useState(() => categoriesStore.getAll());
  const [media, setMedia] = useState(() => mediaStore.getAll());
  const [adSettings, setAdSettings] = useState(() => adSettingsStore.get());
  const [toasts, setToasts] = useState([]);
  const [dbStatus, setDbStatus] = useState({
    online: false,
    connected: false,
    engine: "MongoDB",
    status: "checking",
    counts: null
  });

  // Toast notification helper
  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Synchronize data from MongoDB if online
  const refreshData = useCallback(async () => {
    try {
      const health = await apiService.checkHealth();
      setDbStatus(health.database || { online: false, connected: false, engine: "MongoDB", status: "offline" });

      if (health.connected) {
        const [qRes, pRes, cRes, mRes, aRes] = await Promise.allSettled([
          apiService.getQuotes(),
          apiService.getPosts(true),
          apiService.getCategories(),
          apiService.getMedia(),
          apiService.getAdSettings()
        ]);

        if (qRes.status === "fulfilled" && qRes.value?.data) setQuotes(qRes.value.data);
        if (pRes.status === "fulfilled" && pRes.value?.data) setPosts(pRes.value.data);
        if (cRes.status === "fulfilled" && cRes.value?.data) setCategories(cRes.value.data);
        if (mRes.status === "fulfilled" && mRes.value?.data) setMedia(mRes.value.data);
        if (aRes.status === "fulfilled" && aRes.value?.data) setAdSettings(aRes.value.data);
      }
    } catch {
      // Keep local state
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Quotes Actions
  const submitQuote = async (quoteData) => {
    const res = await apiService.createQuote(quoteData);
    const created = res.data;
    setQuotes((prev) => [created, ...prev.filter((q) => q.id !== created.id)]);
    const sourceLabel = res.source === "mongodb" ? "Saved to MongoDB database." : "Saved to local storage cache.";
    addToast(`Quote request submitted! Reference: ${created.id} (${sourceLabel})`, "success");
    return created;
  };

  const updateQuoteStatus = async (id, status, notes = "") => {
    const res = await apiService.updateQuote(id, { status, notes });
    const updated = res.data;
    if (updated) {
      setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, ...updated } : q)));
      addToast(`Request ${id} updated to ${status}`, "success");
    }
    return updated;
  };

  const deleteQuote = async (id) => {
    await apiService.deleteQuote(id);
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    addToast("Quote request removed", "info");
  };

  // Blog Posts Actions
  const savePost = async (postData) => {
    const exists = posts.some((p) => p.id === postData.id);
    if (exists && postData.id) {
      const res = await apiService.updatePost(postData.id, postData);
      const updated = res.data;
      setPosts((prev) => prev.map((p) => (p.id === postData.id ? updated : p)));
      addToast("Article updated successfully!", "success");
      return updated;
    } else {
      const res = await apiService.createPost(postData);
      const created = res.data;
      setPosts((prev) => [created, ...prev]);
      addToast("New article created successfully!", "success");
      return created;
    }
  };

  const deletePost = async (id) => {
    await apiService.deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    addToast("Article deleted", "info");
  };

  // Categories Actions
  const saveCategory = async (categoryData) => {
    const exists = categories.some((c) => c.id === categoryData.id);
    if (exists && categoryData.id) {
      const res = await apiService.updateCategory(categoryData.id, categoryData);
      const updated = res.data;
      setCategories((prev) => prev.map((c) => (c.id === categoryData.id ? updated : c)));
      addToast("Category updated", "success");
      return updated;
    } else {
      const res = await apiService.createCategory(categoryData);
      const created = res.data;
      setCategories((prev) => [...prev, created]);
      addToast("New category added", "success");
      return created;
    }
  };

  const deleteCategory = async (id) => {
    const isUsed = posts.some((p) => p.category?.toLowerCase() === id?.toLowerCase());
    if (isUsed) {
      addToast("Cannot delete category: active articles are assigned to it.", "error");
      return false;
    }
    await apiService.deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addToast("Category removed", "info");
    return true;
  };

  // Media Actions
  const addMediaAsset = async (mediaItem) => {
    const res = await apiService.addMedia(mediaItem);
    const created = res.data;
    setMedia((prev) => [created, ...prev.filter((m) => m.id !== created.id)]);
    addToast("Media asset saved successfully", "success");
    return created;
  };

  const deleteMediaAsset = async (id) => {
    await apiService.deleteMedia(id);
    setMedia((prev) => prev.filter((m) => m.id !== id));
    addToast("Media asset deleted", "info");
  };

  // AdSense Settings Actions
  const updateAdSettings = async (newSettings) => {
    const res = await apiService.saveAdSettings(newSettings);
    const saved = res.data;
    setAdSettings(saved);
    addToast("Monetization settings saved", "success");
    return saved;
  };

  // Sync all local data to MongoDB
  const syncToMongoDB = async () => {
    try {
      const result = await apiService.syncLocalToMongoDB();
      await refreshData();
      addToast(`Sync complete! Pushed to MongoDB.`, "success");
      return result;
    } catch (err) {
      addToast(`Sync failed: ${err.message}`, "error");
      throw err;
    }
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
        dbStatus,
        refreshData,
        syncToMongoDB,
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
