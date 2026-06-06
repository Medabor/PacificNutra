import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import LeafDivider from "@/components/LeafDivider";
import Photo from "@/components/Photo";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import type { PhotoSlotKey } from "@/lib/photos";

type Props = { params: Promise<{ slug: string }> };

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pacificnutra.com";

// Render an ISO date (YYYY-MM-DD) as e.g. "May 23, 2026". Falls back to
// the raw string if it isn't parseable.
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const POST_PHOTO: Record<string, PhotoSlotKey> = {
  "the-polynesian-diet-why-pacific-islanders-live-longer": "postPolynesianDiet",
  "breadfruit-the-superfood-hawaiians-have-eaten-for-3000-years": "postBreadfruit",
  "what-is-poi-a-complete-guide-to-hawaiis-original-superfood": "postPoi",
  "what-is-taro-the-root-vegetable-of-polynesia": "postTaro",
  "poke-bowl-history-and-how-to-make-it-at-home": "postPoke",
  "what-is-haupia-hawaiian-coconut-pudding": "postHaupia",
  "coconut-milk-coconut-oil-coconut-aminos-guide": "postCoconut",
};

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date || undefined,
      images: ["/og-default.png"],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE}/og-default.png`,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    author: { "@type": "Person", name: post.author ?? "Pacific Nutra" },
    publisher: {
      "@type": "Organization",
      name: "Pacific Nutra",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/brand/pacific-nutra-logo.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${slug}` },
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleLd }}
      />
      <header className="text-center">
        <p className="eyebrow">{post.category}</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-kalo-950 leading-tight">
          {post.title}
        </h1>
        {post.date && (
          <time dateTime={post.date} className="mt-3 block text-sm text-kalo-400">
            {formatDate(post.date)}
          </time>
        )}
      </header>

      <div className="mt-12">
        <Photo slot={POST_PHOTO[slug] ?? "postPolynesianDiet"} ratio="16/9" priority />
      </div>

      <div className="prose prose-lg prose-kalo mt-12 max-w-none prose-headings:font-serif prose-headings:text-kalo-950 prose-a:text-clay-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-clay-400 prose-blockquote:text-kalo-800">
        <MDXRemote source={post.content} />
      </div>

      <LeafDivider />
    </article>
  );
}
