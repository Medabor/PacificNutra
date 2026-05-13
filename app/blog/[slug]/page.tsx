import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import LeafDivider from "@/components/LeafDivider";
import Photo from "@/components/Photo";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import type { PhotoSlotKey } from "@/lib/photos";

type Props = { params: Promise<{ slug: string }> };

const POST_PHOTO: Record<string, PhotoSlotKey> = {
  "the-polynesian-diet-why-pacific-islanders-live-longer": "postPolynesianDiet",
  "breadfruit-the-superfood-hawaiians-have-eaten-for-3000-years": "postBreadfruit",
  "what-is-poi-a-complete-guide-to-hawaiis-original-superfood": "postPoi",
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
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <header className="text-center">
        <p className="eyebrow">{post.category}</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-kalo-950 leading-tight">
          {post.title}
        </h1>
        {post.date && (
          <p className="mt-3 text-sm text-kalo-400">{post.date}</p>
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
