import LeafMark from "@/components/LeafMark";

export default function LeafDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden="true">
      <span className="h-px w-16 bg-cream-200" />
      <LeafMark size={18} className="text-clay-500" />
      <span className="h-px w-16 bg-cream-200" />
    </div>
  );
}
