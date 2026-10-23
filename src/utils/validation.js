/**
 * Input sanitization and validation utilities
 * Ensures application security against XSS, spam bots, and malicious payloads
 */

export function sanitizeText(input) {
  if (typeof input !== "string") return "";
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

export function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPhone(phone) {
  if (!phone) return true; // Phone is optional in some contexts
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ""));
}

export function validateQuoteForm(formData) {
  const errors = {};

  // Honeypot spam check (if filled, likely a bot)
  if (formData.websiteHoneypot && formData.websiteHoneypot.length > 0) {
    return { isValid: false, errors: { bot: "Spam activity detected." } };
  }

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = "Full name is required (minimum 2 characters).";
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = "A valid work or personal email address is required.";
  }

  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = "Please provide a valid contact phone number or leave blank.";
  }

  if (!formData.serviceId) {
    errors.serviceId = "Please select the service required.";
  }

  if (!formData.projectTitle || formData.projectTitle.trim().length < 3) {
    errors.projectTitle = "Project title is required.";
  }

  if (!formData.projectDescription || formData.projectDescription.trim().length < 20) {
    errors.projectDescription = "Please provide project details (minimum 20 characters).";
  }

  if (!formData.budgetRange) {
    errors.budgetRange = "Please select your planned budget investment range.";
  }

  if (!formData.timeline) {
    errors.timeline = "Please specify your target project launch timeline.";
  }

  if (!formData.privacyConsent) {
    errors.privacyConsent = "You must agree to the privacy policy to submit a request.";
  }

  // Penetration testing legal authorization verification
  if (formData.serviceId === "penetration-testing" && !formData.authorizedAttestation) {
    errors.authorizedAttestation = "You must confirm you possess verified legal authorization for security assessment on target systems.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateAdSenseConfig(config) {
  const errors = {};
  if (config.enabled) {
    if (!config.publisherId || !config.publisherId.startsWith("ca-pub-")) {
      errors.publisherId = "Publisher ID must start with 'ca-pub-' (e.g., ca-pub-1234567890123456).";
    }
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
