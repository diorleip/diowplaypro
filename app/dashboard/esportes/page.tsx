"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const cores = [
  {
    nome: "Azul",
    arquivo: "/modelos/modelo01.png",
    valor: "azul",
    cor: "#2563eb",
  },
  {
    nome: "Vermelho",
    arquivo: "/modelos/modelo02.png",
    valor: "vermelho",
    cor: "#dc2626",
  },
  {
    nome: "Verde",
    arquivo: "/modelos/modelo03.png",
    valor: "verde",
    cor: "#16a34a",
  },
  {
    nome: "Amarelo",
    arquivo: "/modelos/modelo04.png",
    valor: "amarelo",
    cor: "#eab308",
  },
  {
    nome: "Preto",
    arquivo: "/modelos/modelo05.png",
    valor: "preto",
    cor: "#111827",
  },
];

export default function ModelosPage() {
  const [corSelecionada, setCorSelecionada] =
    useState(cores[0]);

  return (
    <main className="min-h-screen bg-[#020617] text-white p-4">

      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-3xl font-black">
              🎨 Modelos
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Escolha a cor do Modelo 01
            </p>
          </div>

<Link
  href="/dashboard"
  className="bg-slate-900 px-4 py-2 rounded-xl font-bold border border-slate-700 text-sm"
>
  ← Voltar
</Link>

        </div>

        <div className="max-w-[280px] mx-auto">

          <div className="bg-slate-900 rounded-3xl p-4 border border-slate-800">

            <div className="flex justify-end mb-3">

              <div className="bg-pink-600 text-white font-bold px-3 py-1 rounded-full text-xs">
                🎨 5 OPÇÕES
              </div>

            </div>

            <div className="bg-black rounded-2xl overflow-hidden border border-slate-700">

              <Image
                key={corSelecionada.arquivo}
                src={corSelecionada.arquivo}
                alt="Modelo 01"
                width={220}
                height={390}
                priority
                className="mx-auto w-auto max-h-[420px]"
              />

            </div>

            <h2 className="text-center text-xl font-black mt-4">
              Modelo 01
            </h2>

            <div className="flex justify-center gap-2 mt-4">

              {cores.map((cor) => (
                <button
                  key={cor.valor}
                  onClick={() =>
                    setCorSelecionada(cor)
                  }
                  className={`w-10 h-10 rounded-xl border-4 transition-all ${
                    corSelecionada.valor === cor.valor
                      ? "border-white scale-110"
                      : "border-white/10"
                  }`}
                  style={{
                    background: cor.cor,
                  }}
                />
              ))}

            </div>

            <Link
              href={`/dashboard/esportes/banner?modelo=1&cor=${corSelecionada.valor}`}
              className="block text-center mt-5 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold text-sm"
            >
              USAR MODELO
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}