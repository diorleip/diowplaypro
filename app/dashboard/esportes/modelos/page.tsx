"use client";

import Image from "next/image";
import Link from "next/link";

const cores = [
  {
    nome: "Azul",
    tema: "azul",
    cor: "#0066FF",
  },
  {
    nome: "Vermelho",
    tema: "vermelho",
    cor: "#DC2626",
  },
  {
    nome: "Verde",
    tema: "verde",
    cor: "#16A34A",
  },
  {
    nome: "Amarelo",
    tema: "amarelo",
    cor: "#EAB308",
  },
  {
    nome: "Preto",
    tema: "preto",
    cor: "#111827",
  },
];

export default function ModelosPage() {
  return (
    <div className="min-h-screen bg-[#020617] p-6">

      <div className="max-w-[1200px] mx-auto">

        {/* TOPO */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-5xl font-black text-white">
              ⚽ Modelos
            </h1>

            <p className="text-white/60 mt-2">
              Escolha o modelo e a cor do banner
            </p>
          </div>

          <Link
            href="/dashboard/esportes"
            className="px-6 py-3 rounded-2xl bg-cyan-500 text-black font-black"
          >
            ← Voltar
          </Link>

        </div>

        {/* MODELO 01 */}

        <div className="max-w-[420px] mx-auto">

          <div className="relative rounded-[30px] overflow-hidden bg-white/5 border border-cyan-400/20 p-4">

            {/* BADGE */}

            <div className="absolute top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-2xl font-black shadow-lg z-20">

              🎨 5 OPÇÕES

            </div>

            {/* PREVIEW */}

            <div className="bg-black rounded-3xl p-3">

              <Image
                src="/modelos/modelo01.png"
                alt="Modelo 01"
                width={400}
                height={700}
                className="w-full h-auto rounded-2xl"
                priority
              />

            </div>

            <hr className="border-white/10 my-5" />

            {/* TÍTULO */}

            <h2 className="text-center text-3xl font-black text-white mb-5">
              Modelo 01
            </h2>

            {/* CORES */}

            <div className="flex justify-center gap-3 flex-wrap">

              {cores.map((item) => (
                <Link
                  key={item.tema}
                  href={`/dashboard/esportes/banner?modelo=1&cor=${item.tema}`}
                  title={item.nome}
                  className="group"
                >

                  <div
                    className="w-[55px] h-[55px] rounded-2xl border-2 border-white/20 transition-all group-hover:scale-110 group-hover:border-white"
                    style={{
                      background: item.cor,
                    }}
                  />

                </Link>
              ))}

            </div>

            <p className="text-center text-white/50 mt-4 text-sm">
              Clique em uma cor para gerar o banner
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}