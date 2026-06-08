import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/dashboard"
      className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl bg-[#0B1220] border border-blue-500/20 hover:border-blue-500/60 hover:bg-[#101827] transition-all text-white"
    >
      ← Voltar ao Dashboard
    </Link>
  );
}