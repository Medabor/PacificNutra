import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

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
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-coral-600">
        {post.category}
      </p>
      <h1 className="mt-2 font-serif text-4xl text-ocean-950">{post.title}</h1>
      {post.date && (
        <p className="mt-2 text-sm text-ocean-500">{post.date}</p>
      )}
      <div className="prose prose-lg prose-ocean mt-10 max-w-none prose-headings:font-serif prose-headings:text-ocean-950 prose-a:text-coral-600">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
