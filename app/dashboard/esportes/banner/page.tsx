"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Jogo = {
  hora: string;
  confronto: string;
};

export default function BannerEsportesPage() {
  const [mounted, setMounted] = useState(false);
  const [cor, setCor] = useState("azul");
  const [jogos, setJogos] = useState<Jogo[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const corUrl =
      new URLSearchParams(
        window.location.search
      ).get("cor");

    if (corUrl) {
      setCor(corUrl);
    }
  }, []);

  useEffect(() => {
    async function carregarJogos() {
      try {
        const res = await fetch("/api/jogos");

        const data = await res.json();

        const linhas =
          data.texto.split("\n");

        const lista: Jogo[] = [];

        let confronto = "";

        linhas.forEach(
          (linha: string) => {
            if (
              linha.includes("⚽")
            ) {
              confronto = linha
                .replace("⚽", "")
                .replace(/\*/g, "")
                .trim();
            }

            if (
              linha.includes("⏰")
            ) {
              const hora = linha
                .replace("⏰", "")
                .trim();

              if (confronto) {
                lista.push({
                  hora,
                  confronto,
                });
              }
            }
          }
        );

        setJogos(
          lista.slice(0,4)
        );
      } catch (error) {
        console.error(error);
      }
    }

    carregarJogos();
  }, []);

  if (!mounted) {
    return null;
  }

  const logo =
    localStorage.getItem(
      "diow_logo"
    ) || "";

  if (!logo) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400">
            Nenhuma logo cadastrada
          </h1>

          <p className="mt-4 text-zinc-400">
            Cadastre uma logo em
            Configurações antes de
            gerar os banners.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <Link
              href="/dashboard/config"
              className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold"
            >
              ⚙️ Configurações
            </Link>

            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const contato =
    localStorage.getItem(
      "diow_contact"
    ) || "";

  const hoje =
    new Date().toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  return (
    <div className="min-h-screen bg-[#050505] p-6">
      <div className="flex flex-col items-center gap-6">

        <Link
          href="/dashboard/esportes"
          className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold text-white"
        >
          🎨 Gerar Outro Tema
        </Link>

        <div className="flex flex-row items-start justify-center gap-8 flex-wrap">

          {/* CAPA */}
          <div className="flex flex-col items-center">
            <div className="relative">

              <img
                src={`/modelos/${cor}/capa.png`}
                alt="Capa"
                style={{
                  width: 320,
                  borderRadius: 20,
                }}
              />

              <img
                src={logo}
                alt="Logo"
                style={{
                  position:
                    "absolute",
                  bottom: 70,
                  left: "50%",
                  transform:
                    "translateX(-50%)",
                  width: 110,
                  maxHeight: 70,
                  objectFit:
                    "contain",
                }}
              />

              <div
                style={{
                  position:
                    "absolute",
                  bottom: 25,
                  left: 0,
                  right: 0,
                  textAlign:
                    "center",
                  color:
                    "#ffffff",
                  fontSize: 18,
                  fontWeight: 900,
                }}
              >
                {hoje}

                
              </div>

            </div>
          </div>

          {/* JOGOS */}
          <div className="flex flex-col items-center">
            <div className="relative">

              <img
                src={`/modelos/${cor}/${cor}.png`}
                alt="Jogos"
                style={{
                  width: 320,
                  borderRadius: 20,
                }}
              />

              <div
                style={{
                  position:
                    "absolute",
                  top: 15,
                  left: 0,
                  right: 0,
                  textAlign:
                    "center",
                  color:
                    "#002244",
                  fontSize: 22,
                  fontWeight: 900,
                  fontFamily: "Impact"
                }}
              >
                ⚽ FUTEBOL AO VIVO ⚽
              </div>

              <div
                style={{
                  position:
                    "absolute",
                  top: 50,
                  left: 0,
                  right: 0,
                  textAlign:
                    "center",
                  color:
                    "#ffffff",
                  fontSize: 30,
                  fontWeight: 900,
                  fontFamily: "BebasNeue"
                }}
              >
                {hoje}

                <img
  src="/ligas.png"
  alt="Ligas"
  style={{
    position: "absolute",
    top: 340,
    left: "50%",
    transform: "translateX(-50%)",
    width: 200,
    objectFit: "contain",
  }}
/>
              </div>

              <div
                style={{
                  position:
                    "absolute",
                  top: 85,
                  left: 15,
                  right: 15,
                  display: "flex",
                  flexDirection:
                    "column",
                  gap: 8,
                }}
              >
                {jogos.map(
                  (
                    jogo,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      style={{
                        background:
                          "rgba(0,0,0,0.25)",
                        borderRadius: 10,
                        padding: 8,
                        textAlign:
                          "center",
                      }}
                    >
                      <div
                        style={{
                          color:
                            "#fff",
                          fontWeight: 900,
                          fontSize: 13,
                          fontFamily: "Arial Black"
                        }}
                      >
                        {
                          jogo.hora
                        }
                      </div>

                      <div
                        style={{
                          color:
                            "#fff",
                          fontSize: 20,
fontFamily: "BebasNeue",
letterSpacing: 1.0,
                        }}
                      >
                        {
                          jogo.confronto
                        }
                      </div>
                    </div>
                  )
                )}
              </div>

              <img
                src={logo}
                alt="Logo"
                style={{
                  position:
                    "absolute",
                  bottom: 420,
                  left: "10%",
                  transform:
                    "translateX(-50%)",
                  width: 80,
                  maxHeight: 40,
                  objectFit:
                    "contain",
                }}
              />

              {contato && (
                <div
                  style={{
                    position:
                      "absolute",
                    bottom:70,
                    left: 0,
                    right: 0,
                    display:
                      "flex",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    gap: 8,
                    color:
                      "#ffffff",
                    fontSize:20,
                    fontWeight: 700,
                  }}
                >
                  <img
                    src="/whatsapp.png"
                    alt="WhatsApp"
                    style={{
                      width: 22,
                      height: 22,
                    }}
                  />

                  <span>
                    {
                      contato
                    }
                  </span>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}