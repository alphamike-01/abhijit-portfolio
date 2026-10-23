import {
  quotesStore,
  blogStore,
  categoriesStore,
  mediaStore,
  adSettingsStore
} from "../utils/storage";

const API_BASE = import.meta.env.VITE_API_URL || "/api";
const TIMEOUT_MS = 3500;

/**
 * Robust fetch wrapper with timeout
 */
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = TIMEOUT_MS, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...(fetchOptions.headers || {})
      },
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export const apiService = {
  /**
   * Health Check: tests MongoDB + Express connectivity
   */
  async checkHealth() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/health`, { timeout: 2000 });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return {
        online: true,
        connected: Boolean(data?.database?.connected),
        database: data?.database || { engine: "MongoDB", status: "unknown" }
      };
    } catch {
      return {
        online: false,
        connected: false,
        database: { engine: "MongoDB", status: "offline", reason: "API or MongoDB unreachable" }
      };
    }
  },

  // ===========================================================================
  // QUOTES
  // ===========================================================================
  async getQuotes() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/quotes`);
      if (!res.ok) throw new Error("Backend response error");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return { data: json.data, source: "mongodb" };
      }
    } catch {
      // Graceful fallback to localStorage
    }
    return { data: quotesStore.getAll(), source: "local" };
  },

  async createQuote(quoteData) {
    let createdItem = null;
    try {
      const res = await fetchWithTimeout(`${API_BASE}/quotes`, {
        method: "POST",
        body: JSON.stringify(quoteData)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) createdItem = json.data;
      }
    } catch {
      // Backend offline
    }

    // Always mirror to localStorage for instant client state and offline persistence
    if (!createdItem) {
      createdItem = quotesStore.create(quoteData);
      return { data: createdItem, source: "local" };
    } else {
      // Also cache in localStorage
      quotesStore.create(createdItem);
      return { data: createdItem, source: "mongodb" };
    }
  },

  async updateQuote(id, updates) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/quotes/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          quotesStore.update(id, updates);
          return { data: json.data, source: "mongodb" };
        }
      }
    } catch {
      // Fallback
    }
    const local = quotesStore.update(id, updates);
    return { data: local, source: "local" };
  },

  async deleteQuote(id) {
    try {
      await fetchWithTimeout(`${API_BASE}/quotes/${id}`, { method: "DELETE" });
    } catch {
      // Fallback
    }
    quotesStore.delete(id);
    return true;
  },

  // ===========================================================================
  // BLOG POSTS
  // ===========================================================================
  async getPosts(all = false) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/posts?all=${all}`);
      if (!res.ok) throw new Error("Backend response error");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return { data: json.data, source: "mongodb" };
      }
    } catch {
      // Fallback
    }
    const local = all ? blogStore.getAll() : blogStore.getPublished();
    return { data: local, source: "local" };
  },

  async getPostBySlug(slug) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/posts/${slug}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return { data: json.data, source: "mongodb" };
      }
    } catch {
      // Fallback
    }
    return { data: blogStore.getBySlug(slug), source: "local" };
  },

  async createPost(postData) {
    let created = null;
    try {
      const res = await fetchWithTimeout(`${API_BASE}/posts`, {
        method: "POST",
        body: JSON.stringify(postData)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) created = json.data;
      }
    } catch {
      // Fallback
    }
    if (!created) {
      created = blogStore.create(postData);
      return { data: created, source: "local" };
    } else {
      blogStore.create(created);
      return { data: created, source: "mongodb" };
    }
  },

  async updatePost(id, updates) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          blogStore.update(id, updates);
          return { data: json.data, source: "mongodb" };
        }
      }
    } catch {
      // Fallback
    }
    const local = blogStore.update(id, updates);
    return { data: local, source: "local" };
  },

  async deletePost(id) {
    try {
      await fetchWithTimeout(`${API_BASE}/posts/${id}`, { method: "DELETE" });
    } catch {
      // Fallback
    }
    blogStore.delete(id);
    return true;
  },

  // ===========================================================================
  // CATEGORIES
  // ===========================================================================
  async getCategories() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/categories`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return { data: json.data, source: "mongodb" };
        }
      }
    } catch {
      // Fallback
    }
    return { data: categoriesStore.getAll(), source: "local" };
  },

  async createCategory(catData) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/categories`, {
        method: "POST",
        body: JSON.stringify(catData)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          categoriesStore.create(json.data);
          return { data: json.data, source: "mongodb" };
        }
      }
    } catch {
      // Fallback
    }
    const local = categoriesStore.create(catData);
    return { data: local, source: "local" };
  },

  async updateCategory(id, updates) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          categoriesStore.update(id, updates);
          return { data: json.data, source: "mongodb" };
        }
      }
    } catch {
      // Fallback
    }
    const local = categoriesStore.update(id, updates);
    return { data: local, source: "local" };
  },

  async deleteCategory(id) {
    try {
      await fetchWithTimeout(`${API_BASE}/categories/${id}`, { method: "DELETE" });
    } catch {
      // Fallback
    }
    categoriesStore.delete(id);
    return true;
  },

  // ===========================================================================
  // MEDIA
  // ===========================================================================
  async getMedia() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/media`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return { data: json.data, source: "mongodb" };
        }
      }
    } catch {
      // Fallback
    }
    return { data: mediaStore.getAll(), source: "local" };
  },

  async addMedia(mediaItem) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/media`, {
        method: "POST",
        body: JSON.stringify(mediaItem)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          mediaStore.add(json.data);
          return { data: json.data, source: "mongodb" };
        }
      }
    } catch {
      // Fallback
    }
    const local = mediaStore.add(mediaItem);
    return { data: local, source: "local" };
  },

  async deleteMedia(id) {
    try {
      await fetchWithTimeout(`${API_BASE}/media/${id}`, { method: "DELETE" });
    } catch {
      // Fallback
    }
    mediaStore.delete(id);
    return true;
  },

  // ===========================================================================
  // ADSENSE SETTINGS
  // ===========================================================================
  async getAdSettings() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/settings/ads`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return { data: json.data, source: "mongodb" };
        }
      }
    } catch {
      // Fallback
    }
    return { data: adSettingsStore.get(), source: "local" };
  },

  async saveAdSettings(settings) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/settings/ads`, {
        method: "PUT",
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          adSettingsStore.save(settings);
          return { data: json.data, source: "mongodb" };
        }
      }
    } catch {
      // Fallback
    }
    const local = adSettingsStore.save(settings);
    return { data: local, source: "local" };
  },

  // ===========================================================================
  // HYDRATION: Sync Local Storage data to MongoDB
  // ===========================================================================
  async syncLocalToMongoDB() {
    const health = await this.checkHealth();
    if (!health.connected) {
      throw new Error("MongoDB is not connected. Start MongoDB or update MONGODB_URI in server/.env.");
    }

    const localPosts = blogStore.getAll();
    const localCats = categoriesStore.getAll();
    const localMedia = mediaStore.getAll();
    const localQuotes = quotesStore.getAll();

    let synced = { posts: 0, categories: 0, media: 0, quotes: 0 };

    for (const post of localPosts) {
      try {
        await fetchWithTimeout(`${API_BASE}/posts`, { method: "POST", body: JSON.stringify(post) });
        synced.posts++;
      } catch {
        // ignore duplicate
      }
    }

    for (const cat of localCats) {
      try {
        await fetchWithTimeout(`${API_BASE}/categories`, { method: "POST", body: JSON.stringify(cat) });
        synced.categories++;
      } catch {
        // ignore duplicate
      }
    }

    for (const media of localMedia) {
      try {
        await fetchWithTimeout(`${API_BASE}/media`, { method: "POST", body: JSON.stringify(media) });
        synced.media++;
      } catch {
        // ignore duplicate
      }
    }

    for (const quote of localQuotes) {
      try {
        await fetchWithTimeout(`${API_BASE}/quotes`, { method: "POST", body: JSON.stringify(quote) });
        synced.quotes++;
      } catch {
        // ignore duplicate
      }
    }

    return synced;
  }
};
