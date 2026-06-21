import Link from "next/link";

export const metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ status?: string }> };

export default async function UnsubscribePage({ searchParams }: Props) {
  const { status } = await searchParams;
  const invalid = status === "invalid";

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="eyebrow">Pacific Nutra</p>
      <h1 className="mt-3 font-serif text-4xl text-kalo-950">
        {invalid ? "That link didn't work" : "You're unsubscribed"}
      </h1>
      <p className="mt-5 text-lg text-kalo-800">
        {invalid
          ? "This unsubscribe link is invalid or has expired. If you'd still like to stop receiving emails, reply to any email from us and we'll take care of it."
          : "You won't receive any more emails from Pacific Nutra. No hard feelings — the kitchen's always open if you change your mind."}
      </p>
      <div className="mt-10">
        <Link href="/" className="btn-clay">
          Back to Pacific Nutra
        </Link>
      </div>
    </section>
  );
}
