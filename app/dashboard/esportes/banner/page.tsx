"use client";

import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import JSZip from "jszip";

export default function BannerEsportesPage() {
  const [jogos, setJogos] = useState<any[]>([]);
  const [logo, setLogo] = useState("");
  const [contato, setContato] = useState("");

  useEffect(() => {
    setLogo(localStorage.getItem("diow_logo") || "");
    setContato(localStorage.getItem("diow_contact") || "");

    carregarJogos();
  }, []);

async function baixarTodos() {
  const zip = new JSZip();

  for (let i = 0; i < grupos.length; i++) {
    const elemento = document.getElementById(`banner-${i}`);

    if (!elemento) continue;

    const canvas = await html2canvas(elemento, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });

    const base64 = canvas
      .toDataURL("image/png")
      .split(",")[1];

    zip.file(`banner-${i + 1}.png`, base64, {
      base64: true,
    });
  }

  const blob = await zip.generateAsync({
    type: "blob",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "banners.zip";

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

async function enviarSoltos() {
  try {
    const chatId = localStorage.getItem(
      "diow_telegram_chat_id"
    );

        if (!chatId) {
      alert(
        "Configure o Chat ID do Telegram."
      );
      return;
    }

    const legenda = `📅 ${new Date().toLocaleDateString(
      "pt-BR"
    )}

🚀 Assista tudo no Diow Play.`;

    let enviados = 0;

    for (let i = 0; i < grupos.length; i++) {
      const elemento = document.getElementById(
        `banner-${i}`
      );

      if (!elemento) continue;

    const canvas = await html2canvas(elemento, {
  scale: 1,
  useCORS: true,
  backgroundColor: null,
});

const photo = canvas.toDataURL(
  "image/jpeg",
  0.8
);

      const response = await fetch("/api/telegram", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            chatId,
            photo,
            caption: legenda,
          }),
        }
      );

   const result = await response.json();

console.log("TELEGRAM:");
console.log(result);

if (!result.ok) {
  alert(
    JSON.stringify(result, null, 2)
  );

  throw new Error(
    result.description ||
    result.error ||
    "Erro Telegram"
  );
}

      enviados++;
    }

    alert(
      `✅ ${enviados} banners enviados com sucesso.`
    );
  } catch (error: any) {
    console.error(error);

    alert(
      `❌ ${
        error.message ||
        "Erro ao enviar banners."
      }`
    );
  }
}

  async function carregarJogos() {
    try {
      const response = await fetch("/api/jogos?dia=hoje");
      const data = await response.json();

      setJogos(data.jogos || []);
    } catch (error) {
      console.error(error);
    }
  }

  const dataHoje = new Date().toLocaleDateString(
    "pt-BR",
    {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }
  );
  
  const jogosPorBanner = 6;

const grupos = [];

for (
  let i = 0;
  i < jogos.length;
  i += jogosPorBanner
) {
  grupos.push(
    jogos.slice(i, i + jogosPorBanner)
  );
}

  return (
   <div
  style={{
    minHeight: "100vh",
    background: "#050505",
    padding: 50,
  }}

    >

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: 15,
    marginBottom: 30,
    flexWrap: "wrap",
  }}
>
  <button
  onClick={() => window.location.href = "/dashboard/esportes"}
  style={{
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 28px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 16,
  }}
>
  ← ⚽ Voltar aos Esportes
</button>

<button
  onClick={baixarTodos}
  style={{
    background: "#8b5cf6",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 28px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 16,
  }}
>
  ⬇ Baixar Todos
</button>

<button
  onClick={enviarSoltos}
  style={{
    background: "#475569",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 28px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 16,
  }}
>
  📤 Enviar Soltos
</button>

  <button
    style={{
      background: "#0284c7",
      color: "#fff",
      border: "none",
      borderRadius: 12,
      padding: "14px 28px",
      fontWeight: 700,
      cursor: "pointer",
      fontSize: 16,
    }}
  >
    📚 Enviar Álbum
  </button>

</div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 25,
    justifyItems: "center",
  }}
>
      {grupos.map((grupo: any, bannerIndex: number) => (

<div
  id={`banner-${bannerIndex}`}
  key={bannerIndex}
  style={{
    width: 520,
    position: "relative",
  }}
>

    <img
      src="/modelos/banner.png"
      alt={`Banner ${bannerIndex + 1}`}
      style={{
        width: "100%",
        display: "block",
      }}
    />

        {/* LOGO */}
        {logo && (
          <img
            src={logo}
            alt="Logo"
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 115,
              maxHeight: 80,
              objectFit: "contain",
            }}
          />
        )}

        {/* DATA */}
        <div
          style={{
            position: "absolute",
            top: 170,
            left: 115,
            right: 50,
            textAlign: "center",
            color: "#fff",
            fontWeight: 900,
            fontSize: 18,
            textTransform: "uppercase",
          }}
        >
          {dataHoje}
        </div>

        {/* JOGOS */}
        <div
          style={{
            position: "absolute",
            top: 340,
            left: 35,
            right: 35,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {grupo.map((jogo: any, index: number) => (
            <div
              key={index}
              style={{
                color: "#fff",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 70px 1fr",
                  alignItems: "center",
                  fontWeight: 800,
                  fontSize: 17,
                }}
              >
                <div
                  style={{
                    textAlign: "left",
                  }}
                >
                  {jogo.casa}
                </div>

                <div
                  style={{
                    textAlign: "center",
                    color: "#ffd700",
                  }}
                >
                  {jogo.hora}
                </div>

                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  {jogo.fora}
                </div>
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  color: "#ffd700",
                  marginTop: 2,
                }}
              >
                {jogo.campeonato}
              </div>
            </div>
          ))}
        </div>


        {/* CONTATO */}
        <div
          style={{
            position: "absolute",
            bottom: 25,
            left: "85%",
            transform: "translateX(-50%)",
            fontSize: 24,
            width: 480,
            color: "#fff",
            fontWeight: 900,
          }}
        >
          {contato}
        </div>

      </div>

))}
      </div>
    </div>
  );
}