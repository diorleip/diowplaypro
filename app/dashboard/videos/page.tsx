"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  Film,
  Search,
  Sparkles,
  ArrowRight,
  Star,
  LayoutDashboard,
} from "lucide-react";

export default function VideosPage() {
  const router = useRouter();

  const [filme, setFilme] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [resultados, setResultados] =
    useState<any[]>([]);

  useEffect(() => {
    const delayDebounce =
      setTimeout(() => {
        if (filme.length >= 2) {
          buscar();
        } else {
          setResultados([]);
        }
      }, 400);

    return () =>
      clearTimeout(
        delayDebounce
      );
  }, [filme]);

  async function buscar() {
    try {
      const res = await fetch(
        `/api/tmdb?query=${filme}`
      );

      const data =
        await res.json();

      setResultados(
        data.results || []
      );
    } catch (error) {
      console.log(error);
    }
  }

  function gerar(id: number) {
    setLoading(true);

    router.push(
      `/dashboard/videos/${id}`
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] p-6 lg:p-10">
      {/* CARD */}
      <div className="w-full bg-[#111827] border border-cyan-500/20 rounded-[35px] p-8 md:p-12 shadow-[0_0_60px_rgba(0,255,255,0.08)]">
        
        {/* TOPO */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <Film
                size={40}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Gerador de Vídeo
              </h1>

              <p className="text-zinc-400 text-lg mt-2">
                Busque e gere vídeos VOD premium
              </p>
            </div>
          </div>

          {/* DASHBOARD */}
          <button
            onClick={() =>
              router.push(
                "/dashboard"
              )
            }
            className="h-[58px] px-8 rounded-2xl border border-cyan-500/20 bg-[#071120] hover:bg-[#0b1629] transition-all text-white font-semibold flex items-center gap-3"
          >
            <LayoutDashboard
              size={18}
              className="text-cyan-400"
            />

            Dashboard
          </button>
        </div>

        {/* INPUT */}
        <div className="mt-6">
          <label className="text-cyan-400 font-bold text-xl">
            Nome do Filme ou Série
          </label>

          <div className="flex flex-col lg:flex-row gap-5 mt-5">
            <input
              type="text"
              value={filme}
              onChange={(e) =>
                setFilme(
                  e.target.value
                )
              }
              placeholder="Digite o nome..."
              className="flex-1 h-[72px] bg-[#1f2937] border border-cyan-500/20 rounded-2xl px-6 text-xl text-white outline-none"
            />

            <button
              onClick={buscar}
              disabled={loading}
              className="h-[72px] px-10 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black text-xl flex items-center justify-center gap-3"
            >
              <Search size={24} />

              BUSCAR
            </button>
          </div>
        </div>

        {/* RESULTADOS */}
        {resultados.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-black text-white mb-8">
              Resultados encontrados
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {resultados.map(
                (item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      gerar(item.id)
                    }
                    className="cursor-pointer bg-[#071120] border border-cyan-500/10 hover:border-cyan-400/40 transition-all rounded-[28px] overflow-hidden group hover:-translate-y-1"
                  >
                    {/* CAPA */}
                    <div className="relative h-[300px] overflow-hidden bg-black">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* INFO */}
                    <div className="p-5">
                      <h3 className="text-lg font-black line-clamp-1 text-white">
                        {item.title ||
                          item.name}
                      </h3>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 text-yellow-400 font-bold">
                          <Star
                            size={16}
                            fill="currentColor"
                          />

                          {item.vote_average?.toFixed(
                            1
                          )}
                        </div>

                        <span className="text-zinc-400 text-sm">
                          {item.release_date?.slice(
                            0,
                            4
                          ) ||
                            item.first_air_date?.slice(
                              0,
                              4
                            )}
                        </span>
                      </div>

                      <button className="w-full mt-5 h-[50px] rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">
                        Gerar Vídeo
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}