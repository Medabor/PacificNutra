import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const EBOOK_PATH = path.join(
  process.cwd(),
  "content",
  "ebook",
  "the-pacific-plate.md",
);

// The free sample is the introduction plus the whole of Section 1.
// Everything from Section 2 onward is paid-only.
export function getEbookSample(): string {
  const raw = fs.readFileSync(EBOOK_PATH, "utf8");
  const { content } = matter(raw);
  const beforeSection2 = content.split(/\n#\s+Section 2\b/)[0];
  // Drop the leading book-title block — the page supplies its own heading.
  const introStart = beforeSection2.indexOf("## What this book");
  return beforeSection2.slice(introStart).trimEnd();
}
