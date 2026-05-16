"use client";

import {
  useEffect,
  useRef,
  useState
} from "react";

import html2canvas from "html2canvas";

export default function RenderBanner() {

  const bannerRef =
    useRef<HTMLDivElement>(null);

  const [titulo, setTitulo] =
    useState("");

  const [imagem, setImagem] =
    useState("");

  const [sinopse, setSinopse] =
    useState("");

  const [cast, setCast] =
    useState<any[]>([]);

  const [logo, setLogo] =
    useState("");

  const [whatsapp,
    setWhatsapp] =
    useState("");

  const [usarWhatsapp,
    setUsarWhatsapp] =
    useState(false);

  const [telegramChatId,
    setTelegramChatId] =
    useState("");

  const [tipo, setTipo] =
    useState("");

  const [ano, setAno] =
    useState("");

  const [nota, setNota] =
    useState("");

  const [generos,
    setGeneros] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  useEffect(() => {

    setTitulo(
      localStorage.getItem(
        "banner_titulo"
      ) || ""
    );

    setImagem(
      localStorage.getItem(
        "banner_imagem"
      ) || ""
    );

    setSinopse(
      localStorage.getItem(
        "banner_sinopse"
      ) || ""
    );

    setTipo(
      localStorage.getItem(
        "banner_tipo"
      ) || ""
    );

    setAno(
      localStorage.getItem(
        "banner_ano"
      ) || ""
    );

    setNota(
      localStorage.getItem(
        "banner_nota"
      ) || ""
    );

    setGeneros(
      localStorage.getItem(
        "banner_generos"
      ) || ""
    );

    const castStorage =
      localStorage.getItem(
        "banner_cast"
      );

    if (castStorage) {

      setCast(
        JSON.parse(
          castStorage
        )
      );

    }

    setLogo(
      localStorage.getItem(
        "user_logo"
      ) || ""
    );

    setWhatsapp(
      localStorage.getItem(
        "user_whatsapp"
      ) || ""
    );

    setUsarWhatsapp(
      localStorage.getItem(
        "use_whatsapp"
      ) === "true"
    );

    setTelegramChatId(
      localStorage.getItem(
        "telegram_chatid"
      ) || ""
    );

  }, []);

  /* COPIAR */
  function copiarLegenda() {

    const atores =
      cast
        .map(
          (a) => a.nome
        )
        .join(", ");

    const legenda =
`
🎬 ${titulo}

⭐ ${nota} • ${ano} • ${tipo}

🎭 ${generos}

${sinopse}

🎬 Elenco:
${atores}

📺 Disponível para:
TV Box • Smart TV • Celulares • Tablets

${usarWhatsapp
? `🟢 ${whatsapp}`
: ""}
`;

    navigator.clipboard.writeText(
      legenda
    );

    alert(
      "Legenda copiada 🚀"
    );

  }

  /* DOWNLOAD */
  async function baixarBanner() {

    if (!bannerRef.current)
      return;

    const canvas =
      await html2canvas(
        bannerRef.current,
        {
          useCORS: true,
          scale: 2
        }
      );

    const link =
      document.createElement("a");

    link.download =
      `${titulo}.png`;

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();

  }

  /* TELEGRAM */
  async function enviarTelegram() {

    if (!bannerRef.current)
      return;

    setLoading(true);

    try {

      const canvas =
        await html2canvas(
          bannerRef.current,
          {
            useCORS: true,
            scale: 2
          }
        );

      const imagemBase64 =
        canvas.toDataURL(
          "image/png"
        );

      const response =
        await fetch(
          "/api/banner",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              imagem:
                imagemBase64,

              titulo,
              sinopse,

              chatId:
                telegramChatId,

              ano,
              nota,
              tipo,
              generos,

              elenco:
                cast
                  .map(
                    (a) => a.nome
                  )
                  .join(", "),

              whatsapp,
              usarWhatsapp

            })

          }
        );

      const data =
        await response.json();

      console.log(data);

      if (data.ok) {

        alert(
          "Banner enviado 🚀"
        );

      } else {

        alert(
          JSON.stringify(data)
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Erro ao enviar."
      );

    }

    setLoading(false);

  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "#020617",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial"
      }}
    >

      {/* BANNER */}
      <div
        ref={bannerRef}
        style={{
          width: "820px",
          minHeight: "1450px",
          background:
            "#030712",
          borderRadius: "28px",
          border:
            "2px solid #06b6d4",
          overflow: "hidden",
          boxShadow:
            "0 0 40px rgba(6,182,212,0.45)",
          position: "relative"
        }}
      >

        {/* BG */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              `url(${imagem})`,
            backgroundSize: "cover",
            backgroundPosition:
              "center",
            filter:
              "blur(2px)",
            opacity: 0.22
          }}
        />

        <div
          style={{
            position: "relative",
            padding: "26px"
          }}
        >

          {/* LOGO */}
          {logo && (

            <div
              style={{
                marginBottom: "22px"
              }}
            >

              <img
                src={logo}
                alt="logo"
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "contain"
                }}
              />

            </div>

          )}

          {/* TOPO */}
          <div
            style={{
              display: "flex",
              gap: "26px"
            }}
          >

            {/* POSTER */}
            <div
              style={{
                width: "360px"
              }}
            >

              <img
                src={imagem}
                alt={titulo}
                style={{
                  width: "100%",
                  height: "560px",
                  objectFit: "cover",
                  borderRadius: "18px",
                  border:
                    "2px solid #06b6d4",
                  boxShadow:
                    "0 0 25px rgba(6,182,212,0.45)"
                }}
              />

            </div>

            {/* INFO */}
            <div
              style={{
                flex: 1
              }}
            >

              <div
                style={{
                  color: "#22d3ee",
                  fontSize: "58px",
                  fontWeight: "bold",
                  lineHeight: "64px",
                  marginBottom: "18px"
                }}
              >
                {titulo}
              </div>

              {/* META */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "18px"
                }}
              >

                <div
                  style={{
                    background:
                      "#2563eb",
                    padding:
                      "10px 18px",
                    borderRadius: "14px",
                    fontWeight: "bold"
                  }}
                >
                  ⭐ {nota}
                </div>

                <div
                  style={{
                    background:
                      "#111827",
                    padding:
                      "10px 18px",
                    borderRadius: "14px",
                    fontWeight: "bold"
                  }}
                >
                  📅 {ano}
                </div>

                <div
                  style={{
                    background:
                      "#16a34a",
                    padding:
                      "10px 18px",
                    borderRadius: "14px",
                    fontWeight: "bold"
                  }}
                >
                  🎬 {tipo}
                </div>

              </div>

              {/* GENEROS */}
              <div
                style={{
                  color: "#22d3ee",
                  fontSize: "18px",
                  marginBottom: "22px",
                  lineHeight: "30px"
                }}
              >
                {generos}
              </div>

              {/* SINOPSE */}
              <div
                style={{
                  color: "#22d3ee",
                  fontSize: "22px",
                  marginBottom: "14px",
                  fontWeight: "bold"
                }}
              >
                SINOPSE:
              </div>

              <div
                style={{
                  color: "#ffffff",
                  fontSize: "22px",
                  lineHeight: "36px"
                }}
              >
                {sinopse}
              </div>

            </div>

          </div>

          {/* ELENCO */}
          <div
            style={{
              marginTop: "36px"
            }}
          >

            <div
              style={{
                color: "#22d3ee",
                fontSize: "30px",
                fontWeight: "bold",
                marginBottom: "22px"
              }}
            >
              ELENCO PRINCIPAL
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(5,1fr)",
                gap: "16px"
              }}
            >

              {cast.map(
                (
                  ator,
                  index
                ) => (

                <div
                  key={index}
                  style={{
                    background:
                      "rgba(255,255,255,0.04)",
                    border:
                      "1px solid rgba(34,211,238,0.25)",
                    borderRadius: "18px",
                    overflow: "hidden"
                  }}
                >

                  <img
                    src={ator.foto}
                    alt={ator.nome}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover"
                    }}
                  />

                  <div
                    style={{
                      padding: "12px",
                      color: "white",
                      fontSize: "16px",
                      textAlign: "center",
                      fontWeight: "bold"
                    }}
                  >
                    {ator.nome}
                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* WHATS */}
          {usarWhatsapp && (

            <div
              style={{
                marginTop: "30px",
                border:
                  "1px solid rgba(34,211,238,0.25)",
                borderRadius: "18px",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: "14px"
              }}
            >

              <div
                style={{
                  fontSize: "36px"
                }}
              >
                🟢
              </div>

              <div
                style={{
                  flex: 1,
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold"
                }}
              >
                {whatsapp}
              </div>

            </div>

          )}

        </div>

      </div>

      {/* BOTOES */}
      <div
        style={{
          width: "820px",
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr 1fr",
          gap: "16px"
        }}
      >

        <button
          onClick={baixarBanner}
          style={{
            background:
              "#2b2b2b",
            border: "none",
            borderRadius: "18px",
            padding: "18px",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          ⬇ SALVAR
        </button>

        <button
          onClick={copiarLegenda}
          style={{
            background:
              "#16a34a",
            border: "none",
            borderRadius: "18px",
            padding: "18px",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          📋 COPIAR
        </button>

        <button
          onClick={enviarTelegram}
          disabled={loading}
          style={{
            background:
              "#2563eb",
            border: "none",
            borderRadius: "18px",
            padding: "18px",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading
            ? "ENVIANDO..."
            : "✈ TELEGRAM"}
        </button>

      </div>

    </main>
  );
}