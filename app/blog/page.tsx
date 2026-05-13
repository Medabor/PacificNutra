import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Stories",
  description:
    "Articles and recipes rooted in the ancestral diets of the Pacific Islands.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-coral-600">Stories</p>
      <h1 className="mt-2 font-serif text-4xl text-ocean-950">
        Field notes on Pacific nutrition.
      </h1>
      <p className="mt-3 text-ocean-700">
        Long-form articles on traditional Polynesian foods, the people who grew them,
        and how to put them on your table this week.
      </p>
      <div className="mt-12 divide-y divide-ocean-100">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block py-8 transition hover:bg-sand-100/40"
          >
            <p className="text-xs uppercase tracking-wider text-coral-600">
              {post.category}
            </p>
            <h2 className="mt-1 font-serif text-2xl text-ocean-950 group-hover:text-coral-600">
              {post.title}
            </h2>
            <p className="mt-2 text-ocean-700">{post.excerpt}</p>
            {post.date && (
              <p className="mt-2 text-xs text-ocean-500">{post.date}</p>
            )}
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="py-8 text-ocean-600">No posts yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
