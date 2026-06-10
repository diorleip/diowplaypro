"use client";

import Link from "next/link";

export default function DivulgacaoPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🚀 Em Breve
        </h1>

        <p className="text-gray-400 mb-8">
          Esta funcionalidade estará disponível em uma próxima atualização.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          Voltar para Dashboard
        </Link>
      </div>
    </div>
  );
}