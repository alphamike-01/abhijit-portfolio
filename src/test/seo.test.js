import { describe, it, expect } from "vitest";
import { generatePersonSchema, generateServiceSchema, generateArticleSchema } from "../utils/seo";
import { initialServices } from "../data/initialServices";
import { initialBlogPosts } from "../data/initialBlogPosts";

describe("Technical SEO & JSON-LD Schemas", () => {
  it("should generate a valid Person JSON-LD schema for Abhijit Mondal", () => {
    const schema = generatePersonSchema();
    expect(schema["@type"]).toBe("Person");
    expect(schema.name).toBe("Abhijit Mondal");
    expect(schema.url).toBe("https://abhijitmondal.dev");
    expect(schema.image).toBe("https://abhijitmondal.dev/profile-square.png");
    expect(schema.sameAs).toContain("https://github.com/alphamike-01");
    expect(schema.alumniOf.length).toBeGreaterThanOrEqual(2);
  });

  it("should generate a valid Service JSON-LD schema with deliverables offer catalog", () => {
    const service = initialServices[0];
    const schema = generateServiceSchema(service);
    expect(schema["@type"]).toBe("Service");
    expect(schema.name).toBe(service.title);
    expect(schema.hasOfferCatalog.itemListElement.length).toBe(service.deliverables.length);

    // Verify all 6 services generate valid schema
    expect(initialServices.length).toBe(6);
    const consultancy = initialServices.find((s) => s.id === "cybersecurity-consultancy");
    expect(consultancy).toBeDefined();
    expect(consultancy.title).toContain("Consultancy");
    const consultSchema = generateServiceSchema(consultancy);
    expect(consultSchema["@type"]).toBe("Service");
    expect(consultSchema.hasOfferCatalog.itemListElement.length).toBe(consultancy.deliverables.length);

    const training = initialServices.find((s) => s.id === "technical-training");
    expect(training).toBeDefined();
    expect(training.title).toContain("Training");
    const trainingSchema = generateServiceSchema(training);
    expect(trainingSchema["@type"]).toBe("Service");
    expect(trainingSchema.hasOfferCatalog.itemListElement.length).toBe(training.deliverables.length);
  });

  it("should generate a valid BlogPosting JSON-LD schema for articles", () => {
    const post = initialBlogPosts[0];
    const schema = generateArticleSchema(post);
    expect(schema["@type"]).toBe("BlogPosting");
    expect(schema.headline).toBe(post.title);
    expect(schema.author.name).toBe(post.author);
    expect(schema.datePublished).toBe(post.publishedDate);
  });
});
