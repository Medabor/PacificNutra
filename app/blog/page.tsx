import Link from "next/link";
import Photo from "@/components/Photo";
import { getAllPosts } from "@/lib/posts";
import type { PhotoSlotKey } from "@/lib/photos";

export const metadata = {
  title: "Field Notes",
  description:
    "Articles and recipes rooted in the ancestral diets of the Pacific Islands.",
};

// Map post slugs to photo slots. New posts default to a panel until you
// add their slot here.
const POST_PHOTO: Record<string, PhotoSlotKey> = {
  "the-polynesian-diet-why-pacific-islanders-live-longer": "postPolynesianDiet",
  "breadfruit-the-superfood-hawaiians-have-eaten-for-3000-years": "postBreadfruit",
  "what-is-poi-a-complete-guide-to-hawaiis-original-superfood": "postPoi",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="eyebrow">Field Notes</p>
      <h1 className="mt-2 font-serif text-5xl text-kalo-950">
        Notes from the Pacific pantry.
      </h1>
      <p className="mt-4 max-w-xl text-kalo-800">
        Long-form notes on traditional Polynesian foods, the people who grew
        them, and how to put them on your table this week.
      </p>
      <div className="mt-16 space-y-12">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid gap-6 sm:grid-cols-5 items-start"
          >
            <div className="sm:col-span-2">
              <Photo slot={POST_PHOTO[post.slug] ?? "postPolynesianDiet"} ratio="4/3" />
            </div>
            <div className="sm:col-span-3">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                {post.category}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-kalo-950 group-hover:text-clay-600">
                {post.title}
              </h2>
              <p className="mt-3 text-kalo-800">{post.excerpt}</p>
              {post.date && (
                <p className="mt-3 text-xs text-kalo-400">{post.date}</p>
              )}
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="py-8 text-kalo-800">No notes yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
