"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  Copy,
  Download,
  RefreshCw,
  Send,
  PlayCircle,
} from "lucide-react";

export default function VideoGerado({
  videoUrl,
  legenda,
  logo,
  contato,
}: {
  videoUrl: string;
  legenda: string;
  logo?: string;
  contato?: string;
}) {
  const bannerRef = useRef<HTMLDivElement>(null);

  const [loadingTelegram, setLoadingTelegram] = useState(false);

  async function copiarLegenda() {
    await navigator.clipboard.writeText(legenda);
    alert("Legenda copiada!");
  }

  async function baixarBanner() {
    if (!bannerRef.current) return;

    const canvas = await html2canvas(bannerRef.current, {
      backgroundColor: null,
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = "video-diowplay.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function enviarTelegram() {
    try {
      setLoadingTelegram(true);

      if (!bannerRef.current) return;

      const canvas = await html2canvas(bannerRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) return;

      const formData = new FormData();

      formData.append("chat_id", "-1003928092121");
      formData.append("caption", legenda);
      formData.append("photo", blob, "banner.png");

      await fetch(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendPhoto`,
        {
          method: "POST",
          body: formData,
        }
      );

      alert("Enviado para o Telegram!");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar.");
    } finally {
      setLoadingTelegram(false);
    }
  }

  return (
    <div className="w-full mt-8">
      {/* CARD */}
      <div
        ref={bannerRef}
        className="w-full rounded-[32px] border border-cyan-500/20 bg-[#020817] p-8 shadow-[0_0_50px_rgba(0,183,255,0.15)]"
      >
        {/* VIDEO */}
        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20">
          <video
            src={videoUrl}
            controls
            className="w-full rounded-3xl"
          />
        </div>

        {/* LOGO SOMENTE SE EXISTIR */}
        {logo && (
          <div className="mt-6 flex justify-center">
            <img
              src={logo}
              alt="Logo"
              className="h-20 object-contain drop-shadow-[0_0_20px_rgba(0,200,255,0.8)]"
            />
          </div>
        )}

        {/* LEGENDA */}
        <div className="mt-8">
          <div className="rounded-3xl border border-cyan-500/10 bg-black/40 p-6 text-white">
            <div className="whitespace-pre-line text-[17px] leading-9 text-zinc-100">
              {legenda}
            </div>

            {/* CONTATO SOMENTE SE EXISTIR */}
            {contato && contato.trim() !== "" && (
              <div className="mt-6 border-t border-cyan-500/10 pt-5 text-center text-cyan-300">
                📞 {contato}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTÕES ABAIXO IGUAL BANNER */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-4">
        {/* CRIAR OUTRO */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-3 rounded-3xl border border-cyan-500/20 bg-[#021225] px-6 py-6 text-xl font-semibold text-white transition hover:border-cyan-400 hover:bg-cyan-500/10"
        >
          <RefreshCw size={24} />
          Criar Outro
        </button>

        {/* COPIAR */}
        <button
          onClick={copiarLegenda}
          className="flex items-center justify-center gap-3 rounded-3xl border border-cyan-500/20 bg-[#021225] px-6 py-6 text-xl font-semibold text-white transition hover:border-cyan-400 hover:bg-cyan-500/10"
        >
          <Copy size={24} />
          Copiar Legenda
        </button>

        {/* TELEGRAM */}
        <button
          onClick={enviarTelegram}
          disabled={loadingTelegram}
          className="flex items-center justify-center gap-3 rounded-3xl bg-cyan-500 px-6 py-6 text-xl font-semibold text-white transition hover:scale-[1.02] hover:bg-cyan-400 disabled:opacity-50"
        >
          <Send size={24} />
          {loadingTelegram ? "Enviando..." : "Enviar Telegram"}
        </button>

        {/* BAIXAR */}
        <button
          onClick={baixarBanner}
          className="flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-6 text-xl font-semibold text-white transition hover:scale-[1.02]"
        >
          <Download size={24} />
          Baixar Banner
        </button>
      </div>

      {/* EXIBIR PRÉVIA */}
      <div className="mt-5">
        <button
          onClick={() => window.open(videoUrl, "_blank")}
          className="flex w-full items-center justify-center gap-3 rounded-3xl border border-cyan-500/20 bg-[#021225] px-6 py-5 text-lg font-semibold text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/10"
        >
          <PlayCircle size={24} />
          Exibir Prévia do Vídeo
        </button>
      </div>
    </div>
  );
}