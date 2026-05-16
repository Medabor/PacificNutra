import Link from "next/link";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase/server";
import { getProductBySlug } from "@/lib/products";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "Library" };
export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) {
    return (
      <div className="mx-auto max-w-md px-6 py-20">
        <p className="eyebrow">My Library</p>
        <h1 className="mt-2 font-serif text-4xl text-kalo-950">Sign in.</h1>
        <p className="mt-3 text-kalo-800">
          Use the email you used at checkout. We&apos;ll send you a one-time
          magic link.
        </p>
        <div className="mt-8">
          <SignInForm redirectPath="/library" />
        </div>
      </div>
    );
  }

  const service = createSupabaseServiceClient();
  const { data: orders } = await service
    .from("orders")
    .select("product_slug, created_at")
    .eq("email", user.email)
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  const purchased = (orders ?? [])
    .map((o: { product_slug: string }) => getProductBySlug(o.product_slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="eyebrow">My Library</p>
      <h1 className="mt-2 font-serif text-4xl text-kalo-950">Your cookbooks.</h1>
      <p className="mt-2 text-kalo-800">Signed in as {user.email}</p>
      {purchased.length === 0 ? (
        <div className="mt-12 rounded-2xl bg-cream-100 p-8 text-center">
          <p className="text-kalo-800">
            No purchases yet.{" "}
            <Link href="/shop" className="text-clay-600 underline">
              Browse the shop
            </Link>{" "}
            to get your first cookbook.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {purchased.map((p) => (
            <DownloadCard key={p.slug} slug={p.slug} title={p.title} filePath={p.filePath} />
          ))}
        </div>
      )}
    </div>
  );
}

async function DownloadCard({
  slug,
  title,
  filePath,
}: {
  slug: string;
  title: string;
  filePath: string;
}) {
  const service = createSupabaseServiceClient();
  const { data, error } = await service.storage
    .from("ebooks")
    .createSignedUrl(filePath, 60 * 10);

  return (
    <div className="flex items-center justify-between rounded-2xl bg-cream-100 p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
          {slug}
        </p>
        <p className="mt-1 font-serif text-xl text-kalo-950">{title}</p>
      </div>
      {data?.signedUrl ? (
        <a href={data.signedUrl} className="btn-clay">
          Download PDF
        </a>
      ) : (
        <span className="text-sm text-clay-700">
          {error?.message ?? "File not available yet"}
        </span>
      )}
    </div>
  );
}
