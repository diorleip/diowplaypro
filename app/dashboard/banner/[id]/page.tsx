"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Send,
} from "lucide-react";

const TMDB_API =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTE2N2VmNTdhYTMxODQ2Mzc4MWUxN2IyOTM2MThhYyIsIm5iZiI6MTc3ODQzMTQ3OS43MTIsInN1YiI6IjZhMDBiNWY3ZGZmMWFhMTgyMzc5MDQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.plMPCjSrtzpoRLc3GNMi58CkIcq_7qmSfVZcAXNbJX4";

const TELEGRAM_BOT =
  "8281514496:AAH08eOOHLPoQwYiPVu8JHu1DJJgJ8NBb8I";

const TELEGRAM_CHAT =
  "-1003928092121";

export default function BannerPage() {
  const params = useParams();

  const bannerRef =
    useRef<HTMLDivElement>(null);

  const [movie, setMovie] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchMovie();
  }, []);

  async function fetchMovie() {
    try {
      // Primeiro tenta FILME
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${TMDB_API}&language=pt-BR`
      );

      let data = await response.json();

      // Se não existir tenta TV
      if (data.success === false) {
        response = await fetch(
          `https://api.themoviedb.org/3/tv/${params.id}?api_key=${TMDB_API}&language=pt-BR`
        );

        data = await response.json();
      }

      setMovie(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function downloadBanner() {
    if (!bannerRef.current) return;

    const canvas = await html2canvas(
      bannerRef.current,
      {
        useCORS: true,
        allowTaint: true,
        scale: 3,
        backgroundColor: null,
      }
    );

    const link =
      document.createElement("a");

    link.download = `${movie.title || movie.name}.png`;

    link.href = canvas.toDataURL(
      "image/png",
      1
    );

    link.click();
  }

  async function sendTelegram() {
    if (!bannerRef.current) return;

    const canvas = await html2canvas(
      bannerRef.current,
      {
        useCORS: true,
        allowTaint: true,
        scale: 3,
        backgroundColor: null,
      }
    );

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();

      formData.append(
        "chat_id",
        TELEGRAM_CHAT
      );

      formData.append(
        "caption",
        `🎬 ${movie.title || movie.name}

⭐ Nota: ${movie.vote_average}

📅 ${
  (
    movie.release_date ||
    movie.first_air_date ||
    ""
  ).split("-")[0]
}

🍿 Já disponível no Diow Play`
      );

      formData.append(
        "photo",
        blob,
        "banner.png"
      );

      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT}/sendPhoto`,
        {
          method: "POST",
          body: formData,
        }
      );

      alert(
        "Banner enviado para o Telegram!"
      );
    }, "image/png");
  }

  if (loading || !movie) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020817] text-white">
        Carregando banner...
      </main>
    );
  }

  const title =
    movie.title || movie.name;

  const year = (
    movie.release_date ||
    movie.first_air_date ||
    ""
  ).split("-")[0];

  return (
    <main className="min-h-screen bg-[#020817] p-8 text-white">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/dashboard/banner"
          className="flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <div className="flex gap-4">
          <button
            onClick={downloadBanner}
            className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 font-bold transition-all hover:bg-cyan-400"
          >
            <Download size={18} />
            Baixar Banner
          </button>

          <button
            onClick={sendTelegram}
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-bold transition-all hover:bg-blue-500"
          >
            <Send size={18} />
            Enviar Telegram
          </button>
        </div>
      </div>

      {/* Banner */}
      <div
        ref={bannerRef}
        className="relative mx-auto aspect-video w-full max-w-[1400px] overflow-hidden rounded-[40px] bg-black"
      >
        {/* Fundo */}
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          crossOrigin="anonymous"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />

        {/* Conteúdo */}
        <div className="relative z-10 flex h-full items-center gap-14 px-16">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={title}
            className="h-[75%] rounded-3xl object-cover shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            crossOrigin="anonymous"
          />

          {/* Infos */}
          <div className="max-w-[700px]">
            {/* Logo */}
            <img
              src={
                typeof window !==
                "undefined"
                  ? localStorage.getItem(
                      "diow_logo"
                    ) || "/logo.png"
                  : "/logo.png"
              }
              alt="Logo"
              className="mb-8 w-44"
              crossOrigin="anonymous"
            />

            {/* Título */}
            <h1 className="text-6xl font-black leading-tight">
              {title}
            </h1>

            {/* Dados */}
            <div className="mt-5 flex gap-6 text-2xl text-zinc-300">
              <span>
                ⭐{" "}
                {movie.vote_average?.toFixed(
                  1
                )}
              </span>

              <span>📅 {year}</span>
            </div>

            {/* Sinopse */}
            <p className="mt-7 line-clamp-5 text-2xl leading-relaxed text-zinc-200">
              {movie.overview}
            </p>

            {/* Contato */}
            <div className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-6 py-4">
              <p className="text-xl font-bold text-cyan-300">
                {typeof window !==
                "undefined"
                  ? localStorage.getItem(
                      "diow_contact"
                    ) ||
                    "47 99202-7636"
                  : "47 99202-7636"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}