"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GuiaFutebolPage() {
  const [textoGuia, setTextoGuia] = useState("");
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState<"hoje" | "amanha">("hoje");

  useEffect(() => {
    buscarJogos("hoje");
  }, []);

  async function buscarJogos(
    dia: "hoje" | "amanha"
  ) {
    try {
      setLoading(true);
      setTipo(dia);

      const response = await fetch(
        `/api/jogos?dia=${dia}`
      );

      const data = await response.json();

      setTextoGuia(data.texto || "");
    } catch (error) {
      console.error(error);

      setTextoGuia(
        "Erro ao carregar os jogos."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copiarTexto() {
    await navigator.clipboard.writeText(
      textoGuia
    );

    alert("Guia copiado com sucesso!");
  }

  function enviarWhatsapp() {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        textoGuia
      )}`,
      "_blank"
    );
  }

  return (
    <div className="min-h-screen bg-[#030817] p-2">
      <div className="max-w-[600px] mx-auto">
        <div className="bg-gradient-to-b from-[#0b63b6] to-[#1389f3] rounded-[24px] p-4 shadow-[0_0_30px_rgba(0,180,255,0.25)]">

          <div className="flex items-center justify-between mb-4">
            <Link
              href="/dashboard"
              className="bg-[#0b4f8d] px-3 py-2 rounded-xl text-white font-bold text-xs"
            >
              ← Dashboard
            </Link>

            <h1 className="text-lg font-extrabold text-white">
              ⚽ Guia Futebol
            </h1>

            <div className="w-[70px]" />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() =>
                buscarJogos("hoje")
              }
              className={`rounded-xl py-2 text-sm font-bold text-white ${
                tipo === "hoje"
                  ? "bg-cyan-500"
                  : "bg-[#0b4f8d]"
              }`}
            >
              Hoje
            </button>

            <button
              onClick={() =>
                buscarJogos("amanha")
              }
              className={`rounded-xl py-2 text-sm font-bold text-white ${
                tipo === "amanha"
                  ? "bg-cyan-500"
                  : "bg-[#0b4f8d]"
              }`}
            >
              Amanhã
            </button>
          </div>

          <div className="bg-[#0b4f8d] rounded-2xl p-3 h-[520px] overflow-y-auto text-white whitespace-pre-line text-[12px] leading-[20px]">

            {loading
              ? "Carregando jogos..."
              : textoGuia}

          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">

            <button
              onClick={copiarTexto}
              className="bg-[#0b4f8d] rounded-xl py-2 text-white font-bold text-sm"
            >
              📋 Copiar
            </button>

            <button
              onClick={enviarWhatsapp}
              className="bg-green-600 rounded-xl py-2 text-white font-bold text-sm"
            >
              💬 WhatsApp
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}