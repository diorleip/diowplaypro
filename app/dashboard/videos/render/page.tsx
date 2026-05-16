"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import html2canvas from "html2canvas";

import {
  ArrowLeft,
  Copy,
  Download,
  Play,
  RefreshCw,
  Send,
  X,
} from "lucide-react";

export default function RenderVideo() {
  const cardRef =
    useRef<HTMLDivElement>(null);

  const [data, setData] =
    useState<any>(null);

  const [showPreview, setShowPreview] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "diow_video"
      );

    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center text-cyan-400 text-2xl">
        Carregando...
      </div>
    );
  }

  const legenda = `🎬 ${data.title}

🍿 NOVO CONTEÚDO ADICIONADO

📖 ${
    data.overview ||
    "Novo conteúdo disponível no Diow Play!"
  }

🔥 Assista agora no Diow Play!`;

  async function baixar() {
    try {
      if (!cardRef.current) return;

      const canvas =
        await html2canvas(
          cardRef.current,
          {
            scale: 2,
            useCORS: true,
          }
        );

      const url =
        canvas.toDataURL(
          "image/png"
        );

      const a =
        document.createElement("a");

      a.href = url;

      a.download = `${data.title}.png`;

      a.click();
    } catch (err) {
      alert("Erro ao baixar");
    }
  }

  async function telegram() {
    try {
      setLoading(true);

      if (!cardRef.current) return;

      const canvas =
        await html2canvas(
          cardRef.current,
          {
            scale: 2,
            useCORS: true,
          }
        );

      const blob: Blob | null =
        await new Promise((resolve) =>
          canvas.toBlob(resolve)
        );

      if (!blob) return;

      const form =
        new FormData();

      form.append(
        "photo",
        blob,
        "banner.png"
      );

      form.append(
        "caption",
        legenda
      );

      const req = await fetch(
        "/api/telegram",
        {
          method: "POST",
          body: form,
        }
      );

      const res =
        await req.json();

      if (res.ok) {
        alert(
          "Enviado ao Telegram!"
        );
      } else {
        alert("Erro Telegram");
      }
    } catch {
      alert("Erro Telegram");
    } finally {
      setLoading(false);
    }
  }

  function copiar() {
    navigator.clipboard.writeText(
      legenda
    );

    alert("Legenda copiada!");
  }

  return (
    <div className="min-h-screen bg-[#020817] p-6 text-white">
      {/* TOPO */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dashboard/videos"
          className="flex items-center gap-2 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3"
        >
          <ArrowLeft />
          Voltar
        </Link>
      </div>

      {/* CARD */}
      <div
        ref={cardRef}
        className="overflow-hidden rounded-[40px] border border-cyan-500/20 bg-[#030b18]"
      >
        {/* BACKDROP */}
        <div className="relative h-[550px]">
          <img
            src={data.backdrop}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817e6] to-transparent" />

          {/* LOGO */}
          {data.logo && (
            <div className="absolute left-8 top-8 z-20">
              <img
                src={data.logo}
                className="h-20"
              />
            </div>
          )}

          {/* TEXTO */}
          <div className="relative z-10 flex h-full items-center justify-between px-14">
            <div className="max-w-[700px]">
              <span className="mb-6 inline-flex rounded-full bg-cyan-400 px-5 py-2 text-sm font-black text-black">
                NOVO VÍDEO VOD
              </span>

              <h1 className="text-6xl font-black text-cyan-400">
                {data.title}
              </h1>

              <p className="mt-6 text-xl text-zinc-200">
                {data.overview}
              </p>
            </div>

            <img
              src={data.poster}
              className="w-[320px] rounded-[30px]"
            />
          </div>
        </div>

        {/* LEGENDA */}
        <div className="p-8">
          <div className="rounded-3xl border border-cyan-500/10 bg-black/40 p-8">
            <div className="whitespace-pre-line text-lg leading-9">
              {legenda}
            </div>

            {data.contato && (
              <div className="mt-6 border-t border-cyan-500/10 pt-5 text-center text-cyan-300">
                📞 {data.contato}
              </div>
            )}
          </div>

          {/* BOTÕES */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-5">
            <Link
              href="/dashboard/videos"
              className="flex items-center justify-center gap-3 rounded-3xl border border-cyan-500/20 bg-[#021225] px-6 py-6"
            >
              <RefreshCw />
              Criar Outro
            </Link>

            <button
              onClick={copiar}
              className="flex items-center justify-center gap-3 rounded-3xl border border-cyan-500/20 bg-[#021225] px-6 py-6"
            >
              <Copy />
              Copiar Legenda
            </button>

            <button
              onClick={() =>
                setShowPreview(true)
              }
              className="flex items-center justify-center gap-3 rounded-3xl border border-cyan-500/20 bg-[#021225] px-6 py-6"
            >
              <Play />
              Exibir Prévia
            </button>

            <button
              onClick={telegram}
              className="flex items-center justify-center gap-3 rounded-3xl bg-cyan-500 px-6 py-6"
            >
              <Send />

              {loading
                ? "Enviando..."
                : "Enviar Telegram"}
            </button>

            <button
              onClick={baixar}
              className="flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-6"
            >
              <Download />
              Baixar Banner
            </button>
          </div>
        </div>
      </div>

      {/* PREVIEW */}
      {showPreview &&
        data.trailer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-cyan-500/20 bg-black">
              <button
                onClick={() =>
                  setShowPreview(false)
                }
                className="absolute right-4 top-4 z-50 rounded-full bg-black/70 p-2"
              >
                <X />
              </button>

              <iframe
                width="100%"
                height="700"
                src={`https://www.youtube-nocookie.com/embed/${data.trailer}?autoplay=1`}
                allowFullScreen
              />
            </div>
          </div>
        )}
    </div>
  );
}