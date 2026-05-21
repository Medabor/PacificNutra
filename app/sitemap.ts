import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllProducts } from "@/lib/products";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pacificnutra.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/pantry",
    "/blog",
    "/shop",
    "/sample",
    "/privacy",
    "/refund",
    "/terms",
  ].map((route) => ({ url: `${SITE}${route}`, lastModified: now }));

  const posts = getAllPosts().map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
  }));

  const products = getAllProducts().map((product) => ({
    url: `${SITE}/shop/${product.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...posts, ...products];
}
