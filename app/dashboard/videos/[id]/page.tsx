"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  Download,
  Send,
 RefreshCcw,
  Copy,
  Play,
  X,
} from "lucide-react";

export default function VideoPage() {
  const params = useParams();

  const router = useRouter();

  const [dados, setDados] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [showTrailer, setShowTrailer] =
    useState(false);

  const [trailer, setTrailer] =
    useState("");

  const [manualTrailer, setManualTrailer] =
    useState("");

  useEffect(() => {
    buscarConteudo();
  }, []);

  async function buscarConteudo() {
    try {
      let tipo = "movie";

      let res = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?language=pt-BR`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      let data = await res.json();

      if (!data?.id) {
        tipo = "tv";

        res = await fetch(
          `https://api.themoviedb.org/3/tv/${params.id}?language=pt-BR`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
              accept: "application/json",
            },
          }
        );

        data = await res.json();
      }

      setDados(data);

      // TRAILER
      const trailerReq =
        await fetch(
          `https://api.themoviedb.org/3/${tipo}/${params.id}/videos?language=pt-BR`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
          }
        );

      const trailerData =
        await trailerReq.json();

      const officialTrailer =
        trailerData.results?.find(
          (v: any) =>
            v.site === "YouTube" &&
            (v.type ===
              "Trailer" ||
              v.type ===
                "Teaser")
        );

      if (officialTrailer) {
        setTrailer(
          officialTrailer.key
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!dados) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">
        Carregando...
      </div>
    );
  }

  const titulo =
    dados.title || dados.name;

  const descricao =
    dados.overview ||
    "🔥 Novo conteúdo disponível agora no Diow Play.";

  const poster = dados.poster_path
    ? `https://image.tmdb.org/t/p/original${dados.poster_path}`
    : "/logo.png";

  const backdrop =
    dados.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${dados.backdrop_path}`
      : poster;

  const ano =
    dados.release_date?.slice(
      0,
      4
    ) ||
    dados.first_air_date?.slice(
      0,
      4
    ) ||
    "----";

  const categoria =
    dados.genres?.[0]?.name ||
    "Conteúdo";

  const nota =
    dados.vote_average?.toFixed(
      1
    ) || "0";

  const duracao = dados.runtime
    ? `${Math.floor(
        dados.runtime / 60
      )}h ${
        dados.runtime % 60
      }min`
    : "N/A";

  const legenda = `🎬 ${titulo}

🍿 NOVO VÍDEO ADICIONADO

• 👻 Categoria: ${categoria}
• ⏱️ Duração: ${duracao}
• ⭐️ Avaliação: ${nota}/10

📖 ${descricao}

🔥 Assista agora no Diow Play!`;

  // DOWNLOAD MP4
  async function baixarBanner() {
    try {
      setLoading(true);

      const a =
        document.createElement("a");

      a.href = `/api/video?id=${trailer}`;

      a.download = `${titulo}.mp4`;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
    } catch (error) {
      console.log(error);

      alert(
        "Erro ao baixar vídeo."
      );
    } finally {
      setLoading(false);
    }
  }

  // TELEGRAM VIDEO
  async function enviarTelegram() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/telegram",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            video: `${window.location.origin}/api/video?id=${trailer}`,

            caption: legenda,
          }),
        }
      );

      const data =
        await res.json();

      console.log(data);

      if (data.ok) {
        alert(
          "Vídeo enviado!"
        );
      } else {
        alert(
          JSON.stringify(data)
        );
      }
    } catch (error) {
      console.log(error);

      alert("Erro Telegram");
    } finally {
      setLoading(false);
    }
  }

  // PREVIEW
  function abrirTrailer() {
    let finalTrailer =
      trailer;

    if (manualTrailer) {
      finalTrailer =
        manualTrailer
          .split("v=")[1]
          ?.split("&")[0];
    }

    if (!finalTrailer) {
      alert(
        "Vídeo não encontrado."
      );

      return;
    }

    setTrailer(finalTrailer);

    setShowTrailer(true);
  }

  return (
    <>
      <div className="min-h-screen bg-[#030712] p-6 lg:p-10">
        {/* TOPO */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-5xl font-black text-white">
              Vídeo Premium
            </h1>

            <p className="text-zinc-400 text-lg mt-3">
              Pré-visualização automática
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-[#071120] border border-cyan-500/10 rounded-[35px] p-8">
          {/* BANNER */}
          <div className="relative overflow-hidden rounded-[35px] h-[360px]">
            {/* BG */}
            <img
              src={backdrop}
              className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
            />

            <div className="absolute inset-0 bg-black/60" />

            {/* INFO */}
            <div className="relative z-10 flex items-center h-full px-10">
              {/* POSTER */}
              <img
                src={poster}
                className="w-[190px] rounded-[28px] shadow-2xl"
              />

              {/* TEXTO */}
              <div className="ml-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[30px] p-7 max-w-[560px]">
                <h2 className="text-4xl font-black text-white">
                  {titulo}
                </h2>

                <p className="text-zinc-200 mt-5 text-lg leading-relaxed line-clamp-3">
                  {descricao}
                </p>

                <div className="flex items-center gap-6 mt-6 text-zinc-300">
                  <span>
                    ⭐ {nota}
                  </span>

                  <span>
                    🎬 {categoria}
                  </span>

                  <span>
                    ⏱️ {duracao}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* LEGENDA */}
          <div className="mt-8">
            <div className="bg-[#030712] border border-cyan-500/10 rounded-2xl p-5 text-zinc-300 whitespace-pre-line leading-relaxed">
              {legenda}
            </div>
          </div>

          {/* INPUT MANUAL */}
          <div className="mt-6">
            <input
              value={manualTrailer}
              onChange={(e) =>
                setManualTrailer(
                  e.target.value
                )
              }
              placeholder="Cole link manual do YouTube"
              className="w-full h-[60px] bg-[#030712] border border-cyan-500/10 rounded-2xl px-5 text-white outline-none"
            />
          </div>

          {/* BOTÕES */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-8">
            {/* NOVO */}
            <button
              onClick={() =>
                router.push(
                  "/dashboard/videos"
                )
              }
              className="h-[64px] rounded-2xl border border-cyan-500/20 bg-[#071120] hover:bg-[#0b1629] transition-all flex items-center justify-center gap-3 font-semibold text-white"
            >
              <RefreshCcw
                size={20}
                className="text-cyan-400"
              />

              Criar Outro
            </button>

            {/* COPIAR */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  legenda
                );

                alert(
                  "Legenda copiada!"
                );
              }}
              className="h-[64px] rounded-2xl border border-cyan-500/20 bg-[#071120] hover:bg-[#0b1629] transition-all flex items-center justify-center gap-3 font-semibold text-white"
            >
              <Copy
                size={20}
                className="text-cyan-400"
              />

              Copiar Legenda
            </button>

            {/* PREVIEW */}
            <button
              onClick={abrirTrailer}
              className="h-[64px] rounded-2xl border border-cyan-500/20 bg-[#071120] hover:bg-[#0b1629] transition-all flex items-center justify-center gap-3 font-semibold text-white"
            >
              <Play
                size={20}
                className="text-cyan-400"
              />

              Exibir Prévia
            </button>

            {/* TELEGRAM */}
            <button
              onClick={
                enviarTelegram
              }
              disabled={loading}
              className="h-[64px] rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-600 hover:opacity-90 transition-all flex items-center justify-center gap-3 font-bold text-white"
            >
              <Send size={20} />

              {loading
                ? "ENVIANDO..."
                : "Enviar Telegram"}
            </button>

            {/* DOWNLOAD */}
            <button
              onClick={
                baixarBanner
              }
              disabled={loading}
              className="h-[64px] rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-all flex items-center justify-center gap-3 font-bold text-white"
            >
              <Download size={20} />

              Baixar Vídeo
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6">
          <div className="relative w-full max-w-4xl rounded-[30px] overflow-hidden border border-cyan-500/20 bg-black shadow-[0_0_50px_rgba(0,255,255,0.15)]">
            {/* FECHAR */}
            <button
              onClick={() =>
                setShowTrailer(false)
              }
              className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-black/70 flex items-center justify-center text-white"
            >
              <X size={22} />
            </button>

            {/* VIDEO */}
            <video
              controls
              autoPlay
              playsInline
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              className="w-full h-full max-h-[720px] bg-black"
              src={`/api/video?id=${trailer}`}
            />
          </div>
        </div>
      )}
    </>
  );
}