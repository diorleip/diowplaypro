"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Send,
  Copy,
} from "lucide-react";

const TMDB_API =
  "29167ef57aa318463781e17b293618ac";

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
      setLoading(true);

      let response =
        await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=${TMDB_API}&language=pt-BR`
        );

      let data =
        await response.json();

      if (
        data.success === false
      ) {
        response =
          await fetch(
            `https://api.themoviedb.org/3/tv/${params.id}?api_key=${TMDB_API}&language=pt-BR`
          );

        data =
          await response.json();
      }

      setMovie(data);
    } catch (error) {
      console.log(error);

      alert(
        "Erro ao carregar conteúdo"
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyCaption() {
    const text = `🎬 ${
      movie.title || movie.name
    }

⭐️ Nota: ${movie.vote_average?.toFixed(
      1
    )}

📅 Ano: ${
      (
        movie.release_date ||
        movie.first_air_date ||
        ""
      ).split("-")[0]
    }

🍿 ${
      movie?.overview &&
      movie.overview.length > 0
        ? movie.overview
        : "Uma experiência incrível disponível agora no Diow Play 🚀"
    }

🔥 Assista agora no Diow Play!`;

    await navigator.clipboard.writeText(
      text
    );

    alert("Legenda copiada!");
  }

  async function createCanvas() {
    if (!bannerRef.current)
      return null;

    const images =
      bannerRef.current.querySelectorAll(
        "img"
      );

    await Promise.all(
      Array.from(images).map(
        (img: any) => {
          if (
            img.complete &&
            img.naturalHeight !== 0
          ) {
            return Promise.resolve();
          }

          return new Promise(
            (resolve) => {
              img.onload = resolve;
              img.onerror =
                resolve;
            }
          );
        }
      )
    );

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 1000)
    );

    const canvas =
      await html2canvas(
        bannerRef.current,
        {
          useCORS: true,
          allowTaint: false,
          scale: 1,
          backgroundColor:
            "#000000",
          logging: false,
        }
      );

    return canvas;
  }

  async function downloadBanner() {
    try {
      const canvas =
        await createCanvas();

      if (!canvas) return;

      const image =
        canvas.toDataURL(
          "image/jpeg",
          0.9
        );

      const link =
        document.createElement("a");

      link.href = image;

      link.download = `${
        movie.title ||
        movie.name
      }.jpg`;

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );
    } catch (error) {
      console.log(error);

      alert(
        "Erro ao baixar banner"
      );
    }
  }

  async function sendTelegram() {
    try {
      const canvas =
        await createCanvas();

      if (!canvas) return;

      const image =
        canvas.toDataURL(
          "image/jpeg",
          0.9
        );

      const blob =
        await (
          await fetch(image)
        ).blob();

      const formData =
        new FormData();

      formData.append(
        "chat_id",
        TELEGRAM_CHAT
      );

      formData.append(
        "caption",
        `🎬 ${
          movie.title ||
          movie.name
        }

⭐️ Nota: ${movie.vote_average?.toFixed(
          1
        )}

📅 Ano: ${
          (
            movie.release_date ||
            movie.first_air_date ||
            ""
          ).split("-")[0]
        }

🔥 Assista agora no Diow Play!`
      );

      formData.append(
        "photo",
        blob,
        "banner.jpg"
      );

      const response =
        await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT}/sendPhoto`,
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      console.log(data);

      if (data.ok) {
        alert(
          "Banner enviado!"
        );
      } else {
        console.log(data);

        alert(
          "Erro Telegram"
        );
      }
    } catch (error) {
      console.log(error);

      alert(
        "Erro ao enviar banner"
      );
    }
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

  const backdrop =
    movie.backdrop_path
      ? `/api/tmdb-image?path=${movie.backdrop_path}`
      : "/logo.png";

  return (
    <main className="min-h-screen bg-[#020817] p-8 text-white">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/dashboard/banner"
          className="flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-300"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={downloadBanner}
            className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 font-bold"
          >
            <Download size={18} />
            Baixar Banner
          </button>

          <button
            onClick={copyCaption}
            className="flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 font-bold"
          >
            <Copy size={18} />
            Copiar Legenda
          </button>

          <button
            onClick={sendTelegram}
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-bold"
          >
            <Send size={18} />
            Enviar Telegram
          </button>

          <Link
            href="/dashboard/banner"
            className="rounded-2xl bg-zinc-700 px-6 py-3 font-bold"
          >
            Criar Outro
          </Link>
        </div>
      </div>

      {/* Banner */}
      <div className="flex justify-center">
        <div
          ref={bannerRef}
          style={{
            width: "1280px",
            height: "720px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "40px",
            background: "#000",
          }}
        >
          {/* Fundo */}
          <img
            src={backdrop}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />

          {/* Conteúdo */}
          <div className="relative z-10 flex h-full items-center gap-14 px-16">
            {/* Poster */}
            <div className="flex min-w-[320px] justify-center">
              <img
                src={
                  movie?.poster_path
                    ? `/api/tmdb-image?path=${movie.poster_path}`
                    : "/logo.png"
                }
                alt={title}
                width={320}
                height={480}
                loading="eager"
                style={{
                  width: "320px",
                  height: "480px",
                  objectFit: "cover",
                  borderRadius: "24px",
                  display: "block",
                }}
              />
            </div>

            {/* Infos */}
            <div className="max-w-[700px]">
              {/* Logo */}
              <img
                src="/logo.png"
                alt="Logo"
                className="mb-8 w-44"
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

                <span>
                  📅 {year}
                </span>
              </div>

              {/* Sinopse */}
              <p className="mt-7 text-2xl leading-relaxed text-zinc-200">
                {movie?.overview &&
                movie.overview.length > 0
                  ? movie.overview
                  : "Uma experiência incrível disponível agora no Diow Play 🚀"}
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
      </div>
    </main>
  );
}