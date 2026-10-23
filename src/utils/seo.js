/**
 * Technical SEO and Structured Data (JSON-LD) Manager
 */

export function updateSEO({
  title = "Abhijit Mondal — Software Engineering, AI & Cybersecurity Specialist",
  description = "Portfolio, engineering services, and technical publications of Abhijit Mondal — specializing in Full-Stack Web & Mobile Development, Machine Learning Systems, and Authorized Cybersecurity Assessments.",
  canonical = window.location.href,
  ogType = "website",
  ogImage = "/blog/blog-malware-ml.svg",
  jsonLd = null
}) {
  // Update document title
  document.title = title;

  // Helper to update or create meta tag
  const setMeta = (selector, attr, val, content) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, val);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  // Standard Meta
  setMeta('meta[name="description"]', "name", "description", description);

  // Open Graph
  setMeta('meta[property="og:title"]', "property", "og:title", title);
  setMeta('meta[property="og:description"]', "property", "og:description", description);
  setMeta('meta[property="og:type"]', "property", "og:type", ogType);
  setMeta('meta[property="og:url"]', "property", "og:url", canonical);
  setMeta('meta[property="og:image"]', "property", "og:image", ogImage);

  // Twitter
  setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
  setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

  // Canonical Link
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement("link");
    linkCanonical.setAttribute("rel", "canonical");
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute("href", canonical);

  // JSON-LD Structured Data
  let scriptLd = document.getElementById("json-ld-script");
  if (jsonLd) {
    if (!scriptLd) {
      scriptLd = document.createElement("script");
      scriptLd.id = "json-ld-script";
      scriptLd.type = "application/ld+json";
      document.head.appendChild(scriptLd);
    }
    scriptLd.textContent = JSON.stringify(jsonLd);
  } else if (scriptLd) {
    scriptLd.remove();
  }
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abhijit Mondal",
    "image": "https://abhijitmondal.dev/profile-square.png",
    "jobTitle": "Software Engineer & Cybersecurity Specialist",
    "url": "https://abhijitmondal.dev",
    "sameAs": [
      "https://github.com/alphamike-01",
      "https://linkedin.com/in/abhijit-mondal-79309426a"
    ],
    "email": "mailto:abhijitmondaljaihind@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Durgapur",
      "addressRegion": "West Bengal",
      "addressCountry": "IN"
    },
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Parul University"
      },
      {
        "@type": "CollegeOrUniversity",
        "name": "Kazi Nazrul University"
      }
    ],
    "knowsAbout": [
      "Cybersecurity",
      "Penetration Testing",
      "Machine Learning",
      "Full-Stack Web Development",
      "Mobile App Development",
      "Linux Forensics"
    ]
  };
}

export function generateServiceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "provider": {
      "@type": "Person",
      "name": "Abhijit Mondal"
    },
    "description": service.summary,
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.shortTitle,
      "itemListElement": service.deliverables.map((item, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item
        }
      }))
    }
  };
}

export function generateArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage || "/blog/blog-malware-ml.svg",
    "datePublished": post.publishedDate,
    "dateModified": post.updatedAt || post.publishedDate,
    "author": {
      "@type": "Person",
      "name": post.author || "Abhijit Mondal"
    },
    "publisher": {
      "@type": "Person",
      "name": "Abhijit Mondal"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://abhijitmondal.dev/blog/${post.slug}`
    }
  };
}
