"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowLeft,
  Home,
  Settings,
  Image,
  Trophy,
  Send,
  Users,
  MessageCircle,
  Crown,
  PlayCircle,
  Globe,
} from "lucide-react";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTE2N2VmNTdhYTMxODQ2Mzc4MWUxN2IyOTM2MThhYyIsIm5iZiI6MTc3ODQzMTQ3OS43MTIsInN1YiI6IjZhMDBiNWY3ZGZmMWFhMTgyMzc5MDQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.plMPCjSrtzpoRLc3GNMi58CkIcq_7qmSfVZcAXNbJX4";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },

  {
    title: "Chamar suporte",
    href: "https://wa.me/5547992027636",
    icon: MessageCircle,
  },

  {
    title: "Gerar esporte",
    href: "/dashboard/esportes",
    icon: Trophy,
  },

  {
    title: "Gerar Vods",
    href: "/dashboard/videos",
    icon: PlayCircle,
  },

  {
    title: "Gerar banner",
    href: "/dashboard/banner",
    icon: Image,
  },

  {
    title: "Gerar Divulgação",
    href: "/dashboard/divulgacao",
    icon: Send,
  },

  {
    title: "Link de indicação",
    href: "/dashboard/indicacao",
    icon: Globe,
  },

  {
    title: "Revendas",
    href: "/dashboard/revendas",
    icon: Crown,
  },

  {
    title: "Clientes",
    href: "/dashboard/clientes",
    icon: Users,
  },

  {
    title: "Configurações",
    href: "/dashboard/config",
    icon: Settings,
  },
];

export default function BannerSearchPage() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function searchMovies() {
    if (!query) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          query
        )}&language=pt-BR`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      const data = await response.json();

      const filtered =
        data.results?.filter(
          (item: any) =>
            item.poster_path &&
            (item.media_type === "movie" ||
              item.media_type === "tv")
        ) || [];

      setResults(filtered);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-50 h-screen w-[240px] flex-col border-r border-cyan-400/10 bg-[#050b1a]">
        {/* LOGO */}
        <div className="flex items-center gap-3 border-b border-cyan-400/10 p-4">
          <img
            src="/logo.png"
            alt="Diow Play"
            className="w-10"
          />

          <div>
            <h1 className="text-base font-bold">
              Diow{" "}
              <span className="text-cyan-400">
                Play
              </span>
            </h1>

            <p className="text-[11px] text-zinc-400">
              Painel Administrativo
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition-all hover:bg-cyan-500/10 hover:text-white"
                >
                  <Icon
                    size={17}
                    className="text-cyan-400"
                  />

                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <section className="min-h-screen p-3 md:p-5 lg:ml-[240px]">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-cyan-400/10 pb-5">
          <div>
            <h1 className="text-2xl font-bold">
              Gerador de Banner
            </h1>

            <p className="mt-1 text-xs text-zinc-400">
              Filmes • Séries • Novelas
            </p>
          </div>

          {/* VOLTAR */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>

        {/* BUSCA */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
            />

            <input
              type="text"
              placeholder="Buscar filme ou série..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchMovies();
                }
              }}
              className="h-13 w-full rounded-2xl border border-cyan-400/20 bg-[#0b1228] pl-12 pr-4 text-sm text-white outline-none"
            />
          </div>

          {/* BOTÃO */}
          <button
  onClick={searchMovies}
  className="h-12 w-full sm:w-auto rounded-2xl bg-cyan-500 px-6 text-sm font-bold text-white transition-all hover:bg-cyan-400"
>
            Buscar
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="py-20 text-center text-sm text-zinc-400">
            Buscando conteúdos...
          </div>
        )}

        {/* RESULTADOS */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {results.map((item) => {
              const title =
                item.title || item.name;

              const year = (
                item.release_date ||
                item.first_air_date ||
                ""
              ).split("-")[0];

              return (
                <Link
                  key={item.id}
                  href={`/dashboard/banner/${item.id}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b1228] transition-all hover:-translate-y-1 hover:border-cyan-400/30"
                >
                  {/* POSTER */}
                  <div className="overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={title}
                      className="aspect-[2/3] w-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* INFO */}
                  <div className="p-4">
                    {/* NOME */}
                    <h2 className="line-clamp-1 text-sm font-bold text-white">
                      {title}
                    </h2>

                    {/* ANO */}
                    <p className="mt-1 text-xs font-semibold text-cyan-400">
                      📅 {year || "Sem data"}
                    </p>

                    {/* SINOPSE */}
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-400">
                      {item.overview ||
                        "Sinopse não disponível."}
                    </p>

                    {/* TEXTO */}
                    <div className="mt-4 rounded-xl bg-cyan-500 py-2 text-center text-xs font-bold text-white transition-all group-hover:bg-cyan-400">
                      Gerar Banner
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* SEM RESULTADO */}
        {!loading &&
          results.length === 0 &&
          query.length > 0 && (
            <div className="py-20 text-center text-sm text-zinc-500">
              Nenhum resultado encontrado.
            </div>
          )}
      </section>
    </main>
  );
}