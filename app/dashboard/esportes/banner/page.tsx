"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BannerEsportesPage() {
  
const [cor, setCor] = useState("azul");

useEffect(() => {
  const corUrl =
    new URLSearchParams(window.location.search).get("cor");

  if (corUrl) {
    setCor(corUrl);
  }
}, []);

  const logo =
    typeof window !== "undefined"
      ? localStorage.getItem("diow_logo") || ""
      : "";

 if (!logo) {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
      <div className="text-center">

        <h1 className="text-3xl font-bold text-red-400">
          Nenhuma logo cadastrada
        </h1>

        <p className="mt-4 text-zinc-400">
          Cadastre uma logo em Configurações antes de gerar os banners.
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
    typeof window !== "undefined"
      ? localStorage.getItem("diow_contact") || ""
      : "";

  const hoje = new Date().toLocaleDateString(
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

             {logo && (
  <img
    src={logo}
    alt="Logo"
    style={{
      position: "absolute",
      bottom: 60,
      left: "50%",
      transform: "translateX(-50%)",
      width: 90,
      maxHeight: 50,
      objectFit: "contain",
      zIndex: 9999,
      border: "2px solid red",
    }}
  />
)}

              <div
                style={{
                  position: "absolute",
                  bottom: 25,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 900,
                  textShadow: "0 0 10px #000",
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
                  position: "absolute",
                  top: 15,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                 color: "#002244",
                  fontSize: 16,
                  fontWeight: 900,
                  textShadow: "0 0 10px #000",
                }}
              >
                JOGOS DO DIA
              </div>

              <div
                style={{
                  position: "absolute",
                  top: 40,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: 900,
                  textShadow: "0 0 10px #000",
                }}
              >
                {hoje}
              </div>

              {contato && (
  <div
    style={{
      position: "absolute",
      bottom: 20,
      left: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      color: "#ffffff",
      fontSize: 14,
      fontWeight: 700,
      textShadow: "0 0 10px #000",
    }}
  >
    <img
      src="/whatsapp.png"
      alt="WhatsApp"
      style={{
        width: 22,
        height: 22,
        objectFit: "contain",
      }}
    />

    <span>{contato}</span>
  </div>
)}
        </div>
          </div>

        </div>

      </div>
    </div>
  );
}