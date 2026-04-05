import { useEffect } from 'react';

interface SEOMeta {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  jsonLd?: object | object[];
  ogImage?: string;
}

/**
 * Comprehensive SPA SEO hook.
 * Updates document.title, meta description, keywords, OG tags, Twitter cards,
 * canonical URL, and injects per-page JSON-LD structured data.
 */
export function useSEO({ title, description, keywords, path = '/', jsonLd, ogImage }: SEOMeta) {
  useEffect(() => {
    const base = 'https://rydnepal.com';
    const url = `${base}${path}`;
    const defaultImage = 'https://images.deccanchronicle.com/dc-Cover-ilbrrabfksagbfb0ompgpgran2-20180314162754.Medi.jpeg';
    const image = ogImage || defaultImage;

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
    setOrCreate('og:title', title, true);
    setOrCreate('og:description', description, true);
    setOrCreate('og:url', url, true);
    setOrCreate('og:image', image, true);

    // Twitter
    setOrCreate('twitter:title', title);
    setOrCreate('twitter:description', description);
    setOrCreate('twitter:image', image);

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
  }, [title, description, keywords, path, jsonLd, ogImage]);
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
