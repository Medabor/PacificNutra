import Link from "next/link";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase/server";
import { getProductBySlug } from "@/lib/products";
import SignInForm from "./SignInForm";

export const metadata = { title: "Library" };
export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) {
    return (
      <div className="mx-auto max-w-md px-6 py-20">
        <h1 className="font-serif text-3xl text-ocean-950">Your library</h1>
        <p className="mt-3 text-ocean-700">
          Sign in with the email you used at checkout. We&apos;ll send you a
          one-time magic link.
        </p>
        <div className="mt-8">
          <SignInForm />
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
      <h1 className="font-serif text-3xl text-ocean-950">Your library</h1>
      <p className="mt-2 text-ocean-700">Signed in as {user.email}</p>
      {purchased.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-ocean-100 bg-white p-8 text-center">
          <p className="text-ocean-700">
            No purchases yet. {" "}
            <Link href="/shop" className="text-coral-600 underline">
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
    <div className="flex items-center justify-between rounded-2xl border border-ocean-100 bg-white p-6">
      <div>
        <p className="text-xs uppercase tracking-wider text-coral-600">{slug}</p>
        <p className="mt-1 font-serif text-xl text-ocean-950">{title}</p>
      </div>
      {data?.signedUrl ? (
        <a
          href={data.signedUrl}
          className="rounded-full bg-coral-500 px-5 py-2 font-medium text-white hover:bg-coral-600"
        >
          Download PDF
        </a>
      ) : (
        <span className="text-sm text-coral-600">
          {error?.message ?? "File not available yet"}
        </span>
      )}
    </div>
  );
}
