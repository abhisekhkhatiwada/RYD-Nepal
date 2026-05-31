import { useEffect } from 'react';

interface SEOMeta {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  jsonLd?: object | object[];
  ogImage?: string;
  /** "article" for blog posts, "website" (default) for everything else */
  ogType?: 'website' | 'article';
  /** Short, punchy hook line for Facebook / LinkedIn / WhatsApp / Twitter cards. Falls back to title. */
  ogTitle?: string;
  /** Compelling 150–160 char hook for social cards. Falls back to description. */
  ogDescription?: string;
  /** ISO date (YYYY-MM-DD) — used for article:published_time when ogType === 'article' */
  datePublished?: string;
  /** ISO date (YYYY-MM-DD) — used for article:modified_time. Defaults to datePublished. */
  dateModified?: string;
}

/**
 * Comprehensive SPA SEO hook.
 * Updates document.title, meta description, keywords, OG tags, Twitter cards,
 * canonical URL, and injects per-page JSON-LD structured data.
 */
export function useSEO({
  title,
  description,
  keywords,
  path = '/',
  jsonLd,
  ogImage,
  ogType = 'website',
  ogTitle,
  ogDescription,
  datePublished,
  dateModified,
}: SEOMeta) {
  useEffect(() => {
    const base = 'https://www.rydnepal.com';
    const url = `${base}${path}`;
    const defaultImage = 'https://www.rydnepal.com/og/why-ryd-nepal.jpg';
    const image = ogImage || defaultImage;
    const socialTitle = ogTitle || title;
    const socialDescription = ogDescription || description;

    document.title = title;

    const set = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    const setOrCreate = (name: string, content: string, property = false) => {
      const attrName = property ? 'property' : 'name';
      const selector = `meta[${attrName}="${name}"]`;
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute(attrName, name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Core meta
    setOrCreate('description', description);
    if (keywords) {
      setOrCreate('keywords', keywords);
    }

    // Open Graph
    setOrCreate('og:type', ogType, true);
    setOrCreate('og:title', socialTitle, true);
    setOrCreate('og:description', socialDescription, true);
    setOrCreate('og:url', url, true);
    setOrCreate('og:image', image, true);

    // Twitter (X)
    setOrCreate('twitter:card', 'summary_large_image');
    setOrCreate('twitter:title', socialTitle);
    setOrCreate('twitter:description', socialDescription);
    setOrCreate('twitter:image', image);

    // Article-only tags — clean up if the previous page set them
    const removeIfExists = (selector: string) => {
      const el = document.querySelector(selector);
      if (el) el.remove();
    };
    if (ogType === 'article' && datePublished) {
      setOrCreate('article:published_time', datePublished, true);
      setOrCreate('article:modified_time', dateModified || datePublished, true);
      setOrCreate('article:author', 'RYD Nepal Pvt. Ltd.', true);
      setOrCreate('article:section', 'Blog', true);
    } else {
      removeIfExists('meta[property="article:published_time"]');
      removeIfExists('meta[property="article:modified_time"]');
      removeIfExists('meta[property="article:author"]');
      removeIfExists('meta[property="article:section"]');
    }

    // Canonical
    set('link[rel="canonical"]', 'href', url);

    // Per-page JSON-LD injection
    const existingPageLd = document.getElementById('page-jsonld');
    if (existingPageLd) existingPageLd.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'page-jsonld';
      script.type = 'application/ld+json';
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
      document.head.appendChild(script);
    }

    return () => {
      const el = document.getElementById('page-jsonld');
      if (el) el.remove();
    };
  }, [title, description, keywords, path, jsonLd, ogImage, ogType, ogTitle, ogDescription, datePublished, dateModified]);
}

/** Generate BreadcrumbList JSON-LD */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
