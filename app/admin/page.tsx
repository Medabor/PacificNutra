import Link from "next/link";
import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
} from "@/lib/supabase/server";
import { getProductBySlug } from "@/lib/products";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type OrderRow = {
  email: string;
  product_slug: string;
  status: string;
  amount_cents: number;
  created_at: string;
};

type SubscriberRow = {
  email: string;
  source: string | null;
  created_at: string;
};

const DAY = 24 * 60 * 60 * 1000;

function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();

  // Not signed in → sign-in form.
  if (!user?.email) {
    return (
      <div className="mx-auto max-w-md px-6 py-24">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-2 font-serif text-4xl text-kalo-950">Sign in.</h1>
        <p className="mt-3 text-kalo-800">
          Admin access only. Enter your admin email and we&apos;ll send a
          one-time sign-in link.
        </p>
        <div className="mt-8">
          <SignInForm redirectPath="/admin" buttonLabel="Email me a sign-in link" />
        </div>
      </div>
    );
  }

  // ADMIN_EMAIL not configured.
  if (!adminEmail) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24">
        <h1 className="font-serif text-3xl text-kalo-950">
          Admin not configured.
        </h1>
        <p className="mt-3 text-kalo-800">
          Set the <code className="rounded bg-cream-100 px-1">ADMIN_EMAIL</code>{" "}
          environment variable to your email address, then restart the app.
          You&apos;re currently signed in as{" "}
          <span className="font-medium">{user.email}</span>.
        </p>
      </div>
    );
  }

  // Signed in but not the admin.
  if (user.email.toLowerCase().trim() !== adminEmail) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24">
        <h1 className="font-serif text-3xl text-kalo-950">Not authorized.</h1>
        <p className="mt-3 text-kalo-800">
          The account <span className="font-medium">{user.email}</span> does
          not have admin access. If this is a mistake, check the{" "}
          <code className="rounded bg-cream-100 px-1">ADMIN_EMAIL</code>{" "}
          environment variable.
        </p>
        <Link href="/" className="mt-6 inline-block text-clay-600 underline">
          Back to the site
        </Link>
      </div>
    );
  }

  // Authorized — pull data with the service client (bypasses RLS).
  const service = createSupabaseServiceClient();
  const [ordersRes, subsRes] = await Promise.all([
    service
      .from("orders")
      .select("email, product_slug, status, amount_cents, created_at")
      .order("created_at", { ascending: false }),
    service
      .from("subscribers")
      .select("email, source, created_at")
      .order("created_at", { ascending: false }),
  ]);

  const orders = (ordersRes.data ?? []) as OrderRow[];
  const subscribers = (subsRes.data ?? []) as SubscriberRow[];
  const loadError = ordersRes.error?.message ?? subsRes.error?.message ?? null;

  const now = Date.now();
  const paidOrders = orders.filter((o) => o.status === "paid");
  const totalRevenue = paidOrders.reduce((s, o) => s + (o.amount_cents ?? 0), 0);
  const revenue30d = paidOrders
    .filter((o) => now - new Date(o.created_at).getTime() < 30 * DAY)
    .reduce((s, o) => s + (o.amount_cents ?? 0), 0);
  const subs7d = subscribers.filter(
    (s) => now - new Date(s.created_at).getTime() < 7 * DAY,
  ).length;

  const sourceTally = subscribers.reduce<Record<string, number>>((acc, s) => {
    const key = s.source || "unknown";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const stats = [
    { label: "Subscribers", value: subscribers.length.toLocaleString() },
    { label: "New · 7 days", value: subs7d.toLocaleString() },
    { label: "Paid orders", value: paidOrders.length.toLocaleString() },
    { label: "Revenue · all time", value: formatMoney(totalRevenue) },
    { label: "Revenue · 30 days", value: formatMoney(revenue30d) },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 font-serif text-4xl text-kalo-950">Dashboard</h1>
        </div>
        <p className="text-sm text-kalo-400">{user.email}</p>
      </div>

      {loadError && (
        <p className="mt-6 rounded-lg bg-clay-200 px-4 py-3 text-sm text-clay-700">
          Could not load some data: {loadError}
        </p>
      )}

      {/* Stat cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-cream-100 p-5">
            <p className="font-serif text-3xl text-kalo-950">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-forest-500">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Orders */}
      <section className="mt-16">
        <h2 className="font-serif text-2xl text-kalo-950">
          Orders{" "}
          <span className="text-sm font-sans text-kalo-400">
            ({orders.length})
          </span>
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-cream-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-100 text-xs uppercase tracking-wider text-kalo-400">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {orders.slice(0, 50).map((o, i) => (
                <tr key={`${o.email}-${o.created_at}-${i}`}>
                  <td className="whitespace-nowrap px-4 py-3 text-kalo-400">
                    {formatDate(o.created_at)}
                  </td>
                  <td className="px-4 py-3 text-kalo-950">{o.email}</td>
                  <td className="px-4 py-3 text-kalo-800">
                    {getProductBySlug(o.product_slug)?.title ?? o.product_slug}
                  </td>
                  <td className="px-4 py-3 text-kalo-950">
                    {formatMoney(o.amount_cents ?? 0)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        o.status === "paid"
                          ? "rounded-full bg-forest-500/15 px-2 py-0.5 text-xs font-medium text-forest-700"
                          : "rounded-full bg-cream-200 px-2 py-0.5 text-xs font-medium text-kalo-800"
                      }
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-kalo-400">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Subscribers */}
      <section className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-2xl text-kalo-950">
            Subscribers{" "}
            <span className="text-sm font-sans text-kalo-400">
              ({subscribers.length})
            </span>
          </h2>
          <p className="text-xs text-kalo-400">
            By source:{" "}
            {Object.entries(sourceTally)
              .sort((a, b) => b[1] - a[1])
              .map(([src, n]) => `${src} ${n}`)
              .join(" · ") || "—"}
          </p>
        </div>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-cream-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-100 text-xs uppercase tracking-wider text-kalo-400">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {subscribers.slice(0, 50).map((s, i) => (
                <tr key={`${s.email}-${i}`}>
                  <td className="whitespace-nowrap px-4 py-3 text-kalo-400">
                    {formatDate(s.created_at)}
                  </td>
                  <td className="px-4 py-3 text-kalo-950">{s.email}</td>
                  <td className="px-4 py-3 text-kalo-800">{s.source || "—"}</td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-kalo-400">
                    No subscribers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {(orders.length > 50 || subscribers.length > 50) && (
          <p className="mt-4 text-xs text-kalo-400">
            Showing the 50 most recent rows. For full exports, query Supabase
            directly.
          </p>
        )}
      </section>
    </div>
  );
}
