"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GuiaFutebolPage() {
  const [jogos, setJogos] = useState<any[]>([]);
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

      setJogos(data);

      const dataTexto = new Date();

      if (dia === "amanha") {
        dataTexto.setDate(
          dataTexto.getDate() + 1
        );
      }

      let texto =
        `📅 JOGOS DE ${
          dia === "hoje"
            ? "HOJE"
            : "AMANHÃ"
        } - ${dataTexto.toLocaleDateString(
          "pt-BR"
        )}\n`;

      texto +=
        "━━━━━━━━━━━━━━━━━━\n\n";

      data.forEach((jogo: any) => {
        const liga = jogo.liga
          .replace("🇧🇷 ", "")
          .replace("🇺🇾 ", "")
          .replace("🇨🇱 ", "")
          .replace("🇧🇴 ", "")
          .replace("🇨🇦 ", "")
          .replace("🌎 ", "")
          .replace("🏆 ", "");

        texto += `🏆 ${liga.toUpperCase()}\n`;
        texto += `⚽ ${jogo.casa} x ${jogo.fora}\n`;
        texto += `🕒 ${jogo.horario}\n`;
        texto +=
          "━━━━━━━━━━━━━━━━━━\n";
      });

      texto +=
        "\n🔥 Todos os jogos disponíveis no Diow Play 🚀";

      setTextoGuia(texto);
    } catch (error) {
      console.error(error);
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

  const destaques = jogos
    .filter(
      (jogo) =>
        jogo.liga?.includes(
          "Brasileirão Série A"
        ) ||
        jogo.liga?.includes(
          "Libertadores"
        ) ||
        jogo.liga?.includes(
          "Sul-Americana"
        ) ||
        jogo.liga?.includes(
          "Amistosos Seleções"
        )
    )
    .slice(0, 5);

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

          {destaques.length > 0 && (
            <div className="bg-[#0b4f8d] rounded-2xl p-3 mb-4">
              <h2 className="text-yellow-300 font-bold mb-3">
                🔥 Destaques do Dia
              </h2>

              {destaques.map(
                (jogo, index) => (
                  <div
                    key={index}
                    className="text-white text-sm border-b border-white/10 pb-2 mb-2"
                  >
                    <div className="font-bold">
                      ⚽ {jogo.casa} x {jogo.fora}
                    </div>

                    <div className="text-cyan-300">
                      🕒 {jogo.horario}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          <div className="bg-[#0b4f8d] rounded-2xl p-3 h-[420px] overflow-y-auto text-white whitespace-pre-line text-[12px] leading-[20px]">

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