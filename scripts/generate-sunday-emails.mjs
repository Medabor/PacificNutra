#!/usr/bin/env node
/**
 * Generates Sunday newsletter HTML email templates from the ebook manuscript.
 * One file per recipe, skipping 1.3 (used in the welcome email).
 *
 * Run from repo root: node scripts/generate-sunday-emails.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const MANUSCRIPT = join(ROOT, "content/ebook/the-pacific-plate.md");
const OUT_DIR = join(ROOT, "email-templates/sunday");
const SKIP = new Set(["1.3"]); // already in the welcome email

const SECTIONS = {
  1: "Roots & starches",
  2: "Fish & seafood",
  3: "Greens & vegetables",
  4: "Coconut",
  5: "Whole meals",
  6: "Sweet endings",
};

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ʻ'']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Convert inline markdown: **bold**, *italic*, `code`
function inline(s) {
  let out = escapeHtml(s);
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#1C3942;">$1</strong>');
  out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
  out = out.replace(/`(.+?)`/g, '<code style="font-family:ui-monospace,monospace; background:#efe7d3; padding:1px 5px; border-radius:4px;">$1</code>');
  return out;
}

// Parse the manuscript into structured recipe objects.
function parseRecipes(md) {
  const lines = md.split("\n");
  const recipes = [];
  let cur = null;

  function push() {
    if (cur) recipes.push(cur);
    cur = null;
  }

  let state = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headerMatch = line.match(/^##\s+(\d+)\.(\d+)\s+·\s+(.+)$/);

    if (headerMatch) {
      push();
      const [, section, num, title] = headerMatch;
      cur = {
        id: `${section}.${num}`,
        section: parseInt(section, 10),
        num: parseInt(num, 10),
        title: title.trim(),
        intro: [],
        serves: null,
        time: null,
        notes: [],
        ingredients: [],
        method: [],
      };
      state = "intro";
      continue;
    }

    if (!cur) continue;

    if (line.startsWith("---")) { push(); state = null; continue; }
    if (line.match(/^##\s/)) { push(); state = null; continue; }

    // Section heading inside a recipe
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      const h = h3[1].toLowerCase();
      if (h === "ingredients") state = "ingredients";
      else if (h === "method") state = "method";
      else state = "done"; // skip modern variation / what to plate with — keep emails short
      continue;
    }

    if (state === "intro") {
      const bq = line.match(/^>\s?(.*)$/);
      if (bq) {
        cur.intro.push(bq[1]);
        continue;
      }
      // serves
      const s = line.match(/^\*\*Serves\s+(.+?)\*\*\s*$/);
      if (s) { cur.serves = s[1]; continue; }
      const t = line.match(/^\*\*Time:\*\*\s+(.+)$/);
      if (t) { cur.time = t[1]; continue; }
      const note = line.match(/^\*\*Note[^:]*:\*\*\s+(.+)$/);
      if (note) { cur.notes.push(note[1]); continue; }
    }

    if (state === "ingredients") {
      const li = line.match(/^-\s+(.+)$/);
      if (li) {
        // Handle multi-line ingredients (next line indented)
        let txt = li[1];
        while (i + 1 < lines.length && lines[i + 1].match(/^\s{2,}\S/)) {
          i++;
          txt += " " + lines[i].trim();
        }
        cur.ingredients.push(txt);
        continue;
      }
    }

    if (state === "method") {
      const step = line.match(/^(\d+)\.\s+(.+)$/);
      if (step) {
        let txt = step[2];
        while (i + 1 < lines.length && lines[i + 1].match(/^\s{2,}\S/)) {
          i++;
          txt += " " + lines[i].trim();
        }
        cur.method.push(txt);
        continue;
      }
    }
  }
  push();
  return recipes;
}

// ---- HTML template ----

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="64" height="64" role="img" aria-label="Pacific Nutra logo">
  <circle cx="60" cy="60" r="60" fill="#1C3942"/>
  <circle cx="60" cy="60" r="50.5" fill="none" stroke="#D2BE93" stroke-width="1.4" opacity="0.65"/>
  <g fill="none" stroke="#DD7E5C" stroke-width="4.2" stroke-linecap="round">
    <path d="M38 86 Q49 80 60 86 T82 86"/>
    <path d="M44 95 Q52 90 60 95 T76 95"/>
  </g>
  <g transform="translate(60 47) scale(0.9) translate(-32 -36)">
    <path d="M32 6 L32 14" fill="none" stroke="#FAF6EE" stroke-width="4.6" stroke-linecap="round"/>
    <path d="M32 14 C26 6 14 7 8 17 C2 30 8 52 32 66 C56 52 62 30 56 17 C50 7 38 6 32 14 Z" fill="#FAF6EE"/>
    <g fill="none" stroke="#2F4F3A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 16 L32 62"/>
      <path d="M32 28 C26 30 22 32 16 32"/>
      <path d="M32 28 C38 30 42 32 48 32"/>
      <path d="M32 42 C27 44 24 46 20 48"/>
      <path d="M32 42 C37 44 40 46 44 48"/>
    </g>
  </g>
</svg>`;

function render(recipe) {
  const sectionName = SECTIONS[recipe.section] || "";
  const intro = recipe.intro.filter((l) => l.trim()).join(" ").trim();
  const previewText = intro.replace(/\*+/g, "").slice(0, 140);

  const ingredients = recipe.ingredients
    .map(
      (ing) =>
        `<tr><td style="font-family:'Manrope', sans-serif; color:#1C1209; font-size:15px; line-height:1.6; padding:3px 0;"><span style="color:#DD7E5C;">•</span>&nbsp; ${inline(ing)}</td></tr>`,
    )
    .join("\n");

  const method = recipe.method
    .map(
      (step, idx) =>
        `<tr><td valign="top" style="font-family:'Fraunces', Georgia, serif; color:#DD7E5C; font-size:15px; font-weight:600; padding:4px 10px 4px 0; width:22px;">${idx + 1}.</td><td style="font-family:'Manrope', sans-serif; color:#1C1209; font-size:15px; line-height:1.65; padding:4px 0;">${inline(step)}</td></tr>`,
    )
    .join("\n");

  const noteHtml = recipe.notes.length
    ? recipe.notes
        .map(
          (n) =>
            `<p style="font-family:'Manrope', sans-serif; color:#6e6256; font-size:13px; line-height:1.55; background:#efe7d3; padding:10px 14px; border-radius:8px; margin: 0 0 14px 0;"><strong style="color:#1C3942;">Note:</strong> ${inline(n)}</p>`,
        )
        .join("\n")
    : "";

  const metaCells = [];
  if (recipe.serves) metaCells.push(`<strong style="color:#1C3942;">Serves</strong> ${escapeHtml(recipe.serves)}`);
  if (recipe.time) metaCells.push(`<strong style="color:#1C3942;">Time</strong> ${escapeHtml(recipe.time)}`);
  const metaRow = metaCells
    .map(
      (c) =>
        `<td style="font-family:'Manrope', sans-serif; color:#6e6256; font-size:13px; letter-spacing:0.04em; padding-right:18px;">${c}</td>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(recipe.title)} · Pacific Nutra Sunday letter</title>
<meta name="description" content="${escapeHtml(previewText)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  body { margin: 0; padding: 0; background: #f3ece0; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  a { color: #1C3942; }
</style>
</head>
<body>
<!--
  Recipe ${recipe.id} — ${recipe.title}
  Subject:      ${recipe.title}
  Preview text: ${previewText}
-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3ece0; padding: 32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background:#FAF6EE; border-radius:14px; overflow:hidden; box-shadow: 0 1px 2px rgba(28,57,66,0.04);">

        <tr>
          <td align="center" style="padding: 32px 32px 6px 32px;">
            ${LOGO_SVG}
            <div style="font-family:'Fraunces', Georgia, serif; font-size:20px; line-height:1.2; margin-top:12px; letter-spacing:-0.01em;">
              <span style="color:#1C1209; font-weight:400;">Pacific</span><span style="color:#DD7E5C; font-style:italic; font-weight:500;">Nutra</span>
            </div>
            <div style="font-family:'Manrope', sans-serif; color:#6e6256; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; margin-top:10px;">
              Sunday letter · ${escapeHtml(sectionName)}
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding: 22px 40px 8px 40px;">
            <h1 style="font-family:'Fraunces', Georgia, serif; font-weight:600; color:#1C3942; font-size:32px; line-height:1.15; margin:0 0 14px 0; letter-spacing:-0.015em;">
              ${escapeHtml(recipe.title)}
            </h1>
            <p style="font-family:'Manrope', sans-serif; color:#4a4036; font-size:16px; line-height:1.7; margin:0;">
              ${inline(intro)}
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding: 22px 40px 0 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border:1px solid #e6dcc7; border-radius:12px;">
              <tr>
                <td style="padding: 26px 26px 22px 26px;">

                  <div style="font-family:'Manrope', sans-serif; color:#2F4F3A; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; font-weight:700;">
                    Recipe ${escapeHtml(recipe.id)}
                  </div>
                  <h2 style="font-family:'Fraunces', Georgia, serif; font-weight:600; color:#1C3942; font-size:24px; line-height:1.2; margin:6px 0 14px 0; letter-spacing:-0.01em;">
                    ${escapeHtml(recipe.title)}
                  </h2>

                  ${metaCells.length ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 16px 0;"><tr>${metaRow}</tr></table>` : ""}

                  <hr style="border:none; border-top:1px solid #efe7d3; margin: 2px 0 16px 0;" />

                  ${noteHtml}

                  <h3 style="font-family:'Fraunces', Georgia, serif; font-weight:600; color:#1C3942; font-size:16px; line-height:1.3; margin:0 0 10px 0;">
                    Ingredients
                  </h3>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${ingredients}
                  </table>

                  <h3 style="font-family:'Fraunces', Georgia, serif; font-weight:600; color:#1C3942; font-size:16px; line-height:1.3; margin:20px 0 10px 0;">
                    Method
                  </h3>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${method}
                  </table>

                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding: 26px 40px 0 40px;">
            <p style="font-family:'Manrope', sans-serif; color:#1C1209; font-size:15px; line-height:1.65; margin:0;">
              Want all 30 recipes in one place? <a href="https://pacificnutra.com/shop/the-pacific-plate" style="color:#1C3942; font-weight:600; text-decoration:none; border-bottom:2px solid #DD7E5C; padding-bottom:1px;">The Pacific Plate</a> is $24 — yours forever with free updates.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding: 24px 40px 8px 40px;">
            <p style="font-family:'Manrope', sans-serif; color:#1C1209; font-size:16px; line-height:1.65; margin:0 0 6px 0;">
              Cook well this week,
            </p>
            <p style="font-family:'Fraunces', Georgia, serif; font-style:italic; color:#1C3942; font-size:18px; line-height:1.3; margin:0;">
              — Simo
            </p>
            <p style="font-family:'Manrope', sans-serif; color:#6e6256; font-size:14px; line-height:1.6; margin:16px 0 0 0;">
              <em>P.S. If you cook it, hit reply and tell me how it went. I read every email.</em>
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding: 28px 40px 32px 40px;">
            <hr style="border:none; border-top:1px solid #e6dcc7; margin:0 0 16px 0;" />
            <p style="font-family:'Manrope', sans-serif; color:#8a7e72; font-size:12px; line-height:1.6; margin:0; text-align:center;">
              Pacific Nutra · <a href="https://pacificnutra.com" style="color:#8a7e72; text-decoration:underline;">pacificnutra.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
`;
}

// ---- main ----

const md = readFileSync(MANUSCRIPT, "utf8");
const recipes = parseRecipes(md);

if (existsSync(OUT_DIR)) rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

const manifest = [];
let written = 0;
for (const r of recipes) {
  if (SKIP.has(r.id)) continue;
  const slug = slugify(r.title);
  const filename = `${r.id.replace(".", "-")}-${slug}.html`;
  const path = join(OUT_DIR, filename);
  writeFileSync(path, render(r));
  manifest.push({ id: r.id, title: r.title, file: filename, section: SECTIONS[r.section] });
  written++;
}

// Write a manifest for quick reference
const manifestMd = [
  "# Sunday Newsletter Templates",
  "",
  "Generated from `content/ebook/the-pacific-plate.md` by `scripts/generate-sunday-emails.mjs`.",
  "Regenerate after manuscript changes: `node scripts/generate-sunday-emails.mjs`",
  "",
  "Recipe 1.3 (Sweet potato & ginger soup) is intentionally skipped — it ships in the welcome email.",
  "",
  "| # | Recipe | Section | File |",
  "|---|---|---|---|",
  ...manifest.map((m) => `| ${m.id} | ${m.title} | ${m.section} | [\`${m.file}\`](./${m.file}) |`),
].join("\n");
writeFileSync(join(OUT_DIR, "README.md"), manifestMd + "\n");

console.log(`Wrote ${written} Sunday templates to ${OUT_DIR}`);
