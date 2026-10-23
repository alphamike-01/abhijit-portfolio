import { describe, it, expect } from "vitest";
import { slugify, calculateReadTime } from "../utils/formatters";
import { initialBlogPosts } from "../data/initialBlogPosts";

describe("Blog Publishing & Formatting", () => {
  it("should generate clean URL-safe slugs", () => {
    expect(slugify("Static PE Malware Classification with Machine Learning!")).toBe(
      "static-pe-malware-classification-with-machine-learning"
    );
    expect(slugify("OWASP API Security Top 10: 2026 Edition")).toBe(
      "owasp-api-security-top-10-2026-edition"
    );
  });

  it("should calculate reading times realistically", () => {
    const shortText = "Word ".repeat(150);
    expect(calculateReadTime(shortText)).toBe("1 min read");

    const longText = "Word ".repeat(1000);
    expect(calculateReadTime(longText)).toBe("5 min read");
  });

  it("should have initial high-value technical articles with valid structures", () => {
    expect(initialBlogPosts.length).toBeGreaterThanOrEqual(4);
    initialBlogPosts.forEach((post) => {
      expect(post.title).toBeDefined();
      expect(post.slug).toBeDefined();
      expect(post.content).toBeDefined();
      expect(post.category).toBeDefined();
      expect(post.status).toBe("published");
      expect(post.readTime).toMatch(/min read/);
    });
  });
});
