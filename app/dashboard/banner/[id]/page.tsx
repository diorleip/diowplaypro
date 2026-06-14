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
   const year = (
  movie.release_date ||
  movie.first_air_date ||
  ""
).split("-")[0];

const text = `${
  Number(year) >= 2026
    ? "🚀 *LANÇAMENTO NO DIOW PLAY!* 🚀"
    : "🎬 *NOVO CONTEÚDO ADICIONADO!* 🎬"
}

🎬 ${movie.title || movie.name}

📅 Ano: ${year}

⭐ Nota: ${movie.vote_average?.toFixed(
  1
)}

🎭 Categoria: ${
  movie?.genres
    ?.map((g: any) => g.name)
    .join(", ") || ""
}

📖 Sinopse:

${
  movie?.overview
    ? movie.overview.slice(
        0,
        250
      )
    : "Uma experiência incrível disponível agora no Diow Play 🚀"
}

#diowplay
#FilmesESeries
#MaratonaPerfeita
#LançamentoDoDia
#StreamingSemLimites

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

      const year = (
  movie.release_date ||
  movie.first_air_date ||
  ""
).split("-")[0];

const caption = `${
  Number(year) >= 2026
    ? "🚀 *LANÇAMENTO NO DIOW PLAY!* 🚀"
    : "🎬 *NOVO CONTEÚDO ADICIONADO!* 🎬"
}

🎬 ${movie.title || movie.name}

📅 Ano: ${year}

⭐ Nota: ${movie.vote_average?.toFixed(
  1
)}

🎭 Categoria: ${
  movie?.genres
    ?.map((g: any) => g.name)
    .join(", ") || ""
}

📖 Sinopse:

${
  movie?.overview
    ? movie.overview.slice(0, 250)
    : "Uma experiência incrível disponível agora no Diow Play 🚀"
}

#diowplay
#FilmesESeries
#MaratonaPerfeita
#LançamentoDoDia
#StreamingSemLimites

🔥 Assista agora no Diow Play!`;

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
  caption
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

  const statusConteudo =
  Number(year) >= 2026
    ? "🚀 LANÇAMENTO"
    : "✅ CONTEÚDO ADICIONADO";

  const genres =
  movie?.genres
    ?.map((g: any) => g.name)
    .join(", ") || "";

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

</div>

{/* Banner */}
<div
  className="flex justify-center overflow-auto"
  style={{
    padding: "11px",
  }}
>
  <div
    ref={bannerRef}
    style={{
      width: "1080px",
      height: "1350px",
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
      style={{
        filter: "blur(4px) brightness(0.7)",
        transform: "scale(1.08)",
      }}
    />

    {/* Overlay */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,.25), rgba(0,0,0,.75))",
      }}
    />

    {/* Conteúdo */}
    <div
      className="relative z-10 h-full p-10"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
{/* Cabeçalho */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
  }}
>
  <div>
    <div
      style={{
        fontSize: "42px",
        fontWeight: 900,
        color: "#fff",
        lineHeight: 1,
      }}
    >
      FILME
    </div>

    <div
      style={{
        fontSize: "24px",
        color: "#fff",
        fontWeight: 700,
      }}
    >
      adicionado em nossa grade
    </div>
  </div>

  <img
    src="/logo.png"
    alt="Diow Play"
    style={{
      width: "140px",
    }}
  />
</div>

{/* Conteúdo */}
<div
  style={{
    display: "flex",
    gap: "20px",
    marginTop: "10px",
  }}
>
  {/* Poster */}
  <img
    src={
      movie?.poster_path
        ? `/api/tmdb-image?path=${movie.poster_path}`
        : "/logo.png"
    }
    alt={title}
    style={{
      width: "220px",
      height: "330px",
      objectFit: "cover",
      borderRadius: "10px",
      boxShadow:
        "0 0 20px rgba(0,0,0,.5)",
    }}
  />

  {/* Infos */}
  <div
    style={{
      flex: 1,
    }}
  >
    <div
      style={{
        color: "#ffd400",
        fontSize: "34px",
        fontWeight: 900,
        marginBottom: "15px",
      }}
    >
      {title.toUpperCase()}
    </div>

    <div
      style={{
        color: "#fff",
        fontSize: "24px",
        fontWeight: 700,
        marginBottom: "15px",
      }}
    >
      Lançamento: {year}
    </div>

    <div
      style={{
        color: "#ffd400",
        fontSize: "20px",
        fontWeight: 700,
        marginBottom: "10px",
      }}
    >
      Categoria:{" "}
      {movie?.genres
        ?.map((g: any) => g.name)
        .join(", ")}
    </div>

    <div
      style={{
        background:
          "rgba(0,0,0,.35)",
        padding: "10px",
        borderRadius: "10px",
        color: "#fff",
        fontSize: "18px",
        lineHeight: 1.5,
      }}
    >
      <strong>Sinopse:</strong>{" "}
      {movie?.overview
        ? movie.overview.slice(
            0,
            280
          ) + "..."
        : "Uma experiência incrível disponível agora no Diow Play 🚀"}
    </div>
  </div>
</div>
</div>

{/* Dispositivos */}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "10px",
  }}
>
  <img
    src="/dispositivos.png"
    alt="Dispositivos"
    style={{
      width: "300px",
      maxWidth: "100%",
      display: "block",
    }}
  />
</div>

</div> {/* fecha relative z-10 h-full p-10 */}


</div>

{/* Botões */}
<div className="mt-8 flex flex-wrap justify-center gap-4">
  <button
    onClick={downloadBanner}
    className="rounded-2xl bg-zinc-700 px-8 py-4 font-bold text-white"
  >
    ⬇️ SALVAR BANNER
  </button>

  <button
    onClick={copyCaption}
    className="rounded-2xl bg-green-500 px-8 py-4 font-bold text-white"
  >
    📋 COPIAR MENSAGEM
  </button>

  <button
    onClick={sendTelegram}
    className="rounded-2xl bg-sky-500 px-8 py-4 font-bold text-white"
  >
    ✈️ ENVIAR TELEGRAM
  </button>

  <Link
    href="/dashboard/banner"
    className="rounded-2xl bg-fuchsia-600 px-8 py-4 font-bold text-white"
  >
    ➕ CRIAR NOVO
  </Link>
</div>

{/* Prévia WhatsApp */}
<div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-cyan-500/30 bg-[#0b1120] p-6">
  <h2 className="mb-4 text-center text-3xl font-bold text-cyan-400">
    📱 Prévia da Mensagem para WhatsApp
  </h2>

  <textarea
    readOnly
    value={`${
      Number(year) >= 2026
        ? " *LANÇAMENTO NO DIOW PLAY!* "
        : " *NOVO CONTEÚDO ADICIONADO!* "
    }

🎬 *${title}*

📅 Ano: ${year}

⭐ Nota: ${movie.vote_average?.toFixed(1)}/10

🎭 Categorias: ${genres}

📖 Sinopse:

${
      movie?.overview
        ? movie.overview.slice(0, 350)
        : ""
    }

#DiowPlay
#FilmesESeries
#MaratonaPerfeita
#LançamentoDoDia
#StreamingSemLimites

🔥 Assista agora no Diow Play!`}
    className="h-[320px] w-full rounded-2xl bg-[#020617] p-4 text-white"
  />
</div>
    </main>
  );
}