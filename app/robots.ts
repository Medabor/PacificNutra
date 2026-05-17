import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pacificnutra.com";

// Site-wide crawl block while building — mirrors the `noindex` in
// app/layout.tsx. At launch, replace the rule below with:
//   { userAgent: "*", allow: "/", disallow: ["/admin", "/library", "/api/"] }
// and remove the `robots` line in app/layout.tsx.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
