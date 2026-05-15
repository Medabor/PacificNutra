import Link from "next/link";
import LeafMark from "@/components/LeafMark";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 py-20 text-center">
      <span className="text-clay-500">
        <LeafMark size={48} />
      </span>
      <p className="mt-6 eyebrow">404 · Off the trail</p>
      <h1 className="mt-3 font-serif text-4xl text-kalo-950">
        That page doesn&apos;t exist.
      </h1>
      <p className="mt-3 text-kalo-800">
        Maybe a link aged out. Maybe a recipe got renamed. Either way,
        these are the places worth going next.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-clay">
          Home
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-kalo-200 px-5 py-3 text-sm font-medium text-kalo-900 hover:border-clay-400 hover:text-clay-600"
        >
          Field Notes
        </Link>
        <Link
          href="/shop"
          className="rounded-full border border-kalo-200 px-5 py-3 text-sm font-medium text-kalo-900 hover:border-clay-400 hover:text-clay-600"
        >
          Shop
        </Link>
      </div>
    </div>
  );
}
