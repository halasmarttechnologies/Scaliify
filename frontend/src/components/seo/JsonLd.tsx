import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

/**
 * Security note: dangerouslySetInnerHTML is used here intentionally for JSON-LD
 * structured data (<script type="application/ld+json">). The `</` → `<\/` escape
 * prevents </script> injection. IMPORTANT: all `data` props passed to this component
 * MUST come from server-controlled static values only — never from user input or CMS
 * fields without sanitisation. Violating this assumption creates an XSS vector.
 */
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/<\//g, "<\\/");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: SITE_DESCRIPTION,
        foundingDate: "2024",
        areaServed: {
          "@type": "Place",
          name: "Europe",
        },
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          url: `${SITE_URL}/lets-talk`,
        },
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      }}
    />
  );
}

export function WebPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description,
        url: `${SITE_URL}${path}`,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.path}`,
        })),
      }}
    />
  );
}

export function BlogPostingJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author,
  image,
  category,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  category: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url: `${SITE_URL}/blog/${slug}`,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          "@type": "Organization",
          name: author,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/blog/${slug}`,
        },
        ...(image ? { image: `${SITE_URL}${image}` } : {}),
        articleSection: category,
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `${SITE_URL}${path}`,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Place",
          name: "Europe",
        },
      }}
    />
  );
}

export function FAQPageJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      }}
    />
  );
}
