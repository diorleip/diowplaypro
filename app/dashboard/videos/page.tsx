"use client";

import { useRouter } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

export default function VideosPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#111827] border border-cyan-500/20 rounded-[35px] p-10 text-center shadow-[0_0_60px_rgba(0,255,255,0.08)]">
        <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
          🚀 Em Breve
        </h1>

        <p className="text-zinc-400 text-lg mb-10">
          Esta funcionalidade estará disponível em uma próxima atualização do
          Diow Play.
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="h-[58px] px-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold flex items-center gap-3 mx-auto"
        >
          <LayoutDashboard size={20} />
          Voltar para Dashboard
        </button>
      </div>
    </div>
  );
}