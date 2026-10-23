import { describe, it, expect } from "vitest";
import { validateQuoteForm } from "../utils/validation";
import { generateQuoteId } from "../utils/formatters";

describe("Quote Request Workflow & Validation", () => {
  it("should generate a valid reference ID with REQ prefix and current year", () => {
    const id = generateQuoteId();
    const currentYear = new Date().getFullYear();
    expect(id).toMatch(new RegExp(`^REQ-${currentYear}-\\d{4}$`));
  });

  it("should block submissions where the honeypot trap is filled by spam bots", () => {
    const invalidSpamData = {
      name: "Bot User",
      email: "bot@spam.com",
      serviceId: "web-development-seo",
      projectTitle: "Spam title",
      projectDescription: "Spam project description with enough characters.",
      budgetRange: "₹50,000 – ₹1,00,000",
      timeline: "2-4 Weeks",
      privacyConsent: true,
      websiteHoneypot: "http://malicious-spam-url.com"
    };

    const res = validateQuoteForm(invalidSpamData);
    expect(res.isValid).toBe(false);
    expect(res.errors.bot).toBe("Spam activity detected.");
  });

  it("should require legal authorization attestation for Penetration Testing services", () => {
    const unconfirmedPentest = {
      name: "Vikram Roy",
      email: "vikram@example.com",
      serviceId: "penetration-testing",
      projectTitle: "Security Audit on API",
      projectDescription: "We need an authorized penetration test on our internal servers.",
      budgetRange: "₹50,000 – ₹1,00,000",
      timeline: "2-4 Weeks",
      privacyConsent: true,
      authorizedAttestation: false
    };

    const res = validateQuoteForm(unconfirmedPentest);
    expect(res.isValid).toBe(false);
    expect(res.errors.authorizedAttestation).toBeDefined();
  });

  it("should pass validation for fully compliant quote request submissions", () => {
    const validData = {
      name: "Dr. Vikram Sethi",
      email: "vikram.sethi@healthcloud.org",
      serviceId: "penetration-testing",
      projectTitle: "Healthcare API Penetration Test",
      projectDescription: "Full-scale authorized penetration test on FHIR API and admin portal.",
      budgetRange: "₹50,000 – ₹1,00,000",
      timeline: "2-4 Weeks",
      privacyConsent: true,
      authorizedAttestation: true,
      websiteHoneypot: ""
    };

    const res = validateQuoteForm(validData);
    expect(res.isValid).toBe(true);
    expect(Object.keys(res.errors).length).toBe(0);
  });
});
