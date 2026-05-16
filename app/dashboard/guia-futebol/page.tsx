"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  ClipboardList,
  ArrowLeft,
  Copy,
  MessageCircle,
  Send,
} from "lucide-react";

// API FOOTBALL
const API_KEY =
  "4191b1b51509e0b8a929503e0d7ba8e3";

// TELEGRAM
const TELEGRAM_BOT_TOKEN =
  "8281514496:AAH08eOOHLPoQwYiPVu8JHu1DJJgJ8NBb8I";

const TELEGRAM_CHAT_ID =
  "-1003928092121";

// LIGAS IMPORTANTES
const leagues = [
  71,   // Brasileirão
  72,   // Série B
  39,   // Premier League
  140,  // La Liga
  78,   // Bundesliga
  61,   // Ligue 1
  135,  // Serie A
  2,    // Champions
  3,    // Europa League
  848,  // Conference League
  13,   // Libertadores
  11,   // Sudamericana
  88,   // Eredivisie
  94,   // Primeira Liga
  307,  // Saudi League
  203,  // Superliga Turca
  253,  // MLS
  292,  // J League
];

export default function GuiaFutebolPage() {
  const [activeTab, setActiveTab] =
    useState("today");

  const [loading, setLoading] =
    useState(true);

  const [todayGames, setTodayGames] =
    useState("");

  const [tomorrowGames, setTomorrowGames] =
    useState("");

  // FORMATO BRASIL
  function formatDateBR(
    date: Date
  ) {
    const brasilDate =
      new Date(
        date.toLocaleString(
          "en-US",
          {
            timeZone:
              "America/Sao_Paulo",
          }
        )
      );

    const year =
      brasilDate.getFullYear();

    const month = String(
      brasilDate.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      brasilDate.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // DATA VISUAL BR
  function visualDateBR(
    date: Date
  ) {
    return date.toLocaleDateString(
      "pt-BR",
      {
        timeZone:
          "America/Sao_Paulo",
      }
    );
  }

  // CARREGAR
  useEffect(() => {
    fetchGames();
  }, []);

  // TELEGRAM 18H BRASIL
  useEffect(() => {
    const interval = setInterval(() => {
      const brasilNow =
        new Date(
          new Date().toLocaleString(
            "en-US",
            {
              timeZone:
                "America/Sao_Paulo",
            }
          )
        );

      const hour =
        brasilNow.getHours();

      const minute =
        brasilNow.getMinutes();

      const todayKey =
        brasilNow.toLocaleDateString(
          "pt-BR"
        );

      const sentToday =
        localStorage.getItem(
          "diow_sent_today"
        );

      if (
        hour === 18 &&
        minute === 0 &&
        sentToday !== todayKey &&
        todayGames
      ) {
        sendTelegram(todayGames);

        localStorage.setItem(
          "diow_sent_today",
          todayKey
        );
      }
    }, 60000);

    return () =>
      clearInterval(interval);
  }, [todayGames]);

  // BUSCAR JOGOS
  async function fetchGames() {
    try {
      setLoading(true);

      const today = new Date("2026-05-16");

const tomorrow = new Date(today);

tomorrow.setDate(
  today.getDate() + 1
);

      const todayDate =
        formatDateBR(today);

      const tomorrowDate =
        formatDateBR(tomorrow);

      // BUSCAR LIGA
      async function getLeagueGames(
        league: number,
        date: string
      ) {
        try {
          const response = await fetch(
            `https://v3.football.api-sports.io/fixtures?league=${league}&date=${date}`,
            {
              headers: {
                "x-apisports-key":
                  API_KEY,
              },
            }
          );

          const data =
            await response.json();

          // FALLBACK
          if (
            !data.response ||
            data.response.length === 0
          ) {
            return {
              response: [],
            };
          }

          return data;
        } catch (error) {
          console.log(error);

          return {
            response: [],
          };
        }
      }

      // TODAS LIGAS
      async function getAllGames(
        date: string
      ) {
        const requests =
          leagues.map((league) =>
            getLeagueGames(
              league,
              date
            )
          );

        const results =
          await Promise.all(
            requests
          );

        let matches: any[] = [];

        results.forEach((item) => {
          if (
            item.response &&
            item.response.length > 0
          ) {
            matches = [
              ...matches,
              ...item.response,
            ];
          }
        });

        return matches;
      }

      // HOJE
      const todayMatches =
        await getAllGames(
          todayDate
        );

      // AMANHÃ
      const tomorrowMatches =
        await getAllGames(
          tomorrowDate
        );

      // FORMATAR
      setTodayGames(
        buildText(
          todayMatches,
          "JOGOS DE HOJE",
          visualDateBR(today)
        )
      );

      setTomorrowGames(
        buildText(
          tomorrowMatches,
          "JOGOS DE AMANHÃ",
          visualDateBR(tomorrow)
        )
      );
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  // CANAIS
  function getChannel(
    league: string
  ) {
    if (
      league.includes(
        "Serie A"
      )
    ) {
      return "PREMIERE FC";
    }

    if (
      league.includes(
        "Premier League"
      )
    ) {
      return "ESPN/DISNEY+";
    }

    if (
      league.includes(
        "La Liga"
      )
    ) {
      return "ESPN 4";
    }

    if (
      league.includes(
        "Bundesliga"
      )
    ) {
      return "CANAL GOAT";
    }

    if (
      league.includes(
        "Champions"
      )
    ) {
      return "TNT SPORTS/HBO MAX";
    }

    if (
      league.includes(
        "Libertadores"
      )
    ) {
      return "PARAMOUNT+";
    }

    return "ESPN";
  }

  // FORMATAR TEXTO
  function buildText(
    matches: any[],
    title: string,
    date: string
  ) {
    let text = `📆 | *${title} - ${date}*\n`;

    text +=
      "━━━━━━━━━━━━━━━━━━\n";

    if (
      !matches ||
      matches.length === 0
    ) {
      text +=
        "\nNenhum jogo encontrado.\n\n";

      text +=
        "No Diow Play🚀 você assiste todos os jogos sem travamentos🔥";

      return text;
    }

    // ORDENAR
    matches.sort(
      (a, b) =>
        new Date(
          a.fixture.date
        ).getTime() -
        new Date(
          b.fixture.date
        ).getTime()
    );

    let currentLeague = "";

    matches.forEach((game) => {
      const league =
        game.league.name;

      // NOVA LIGA
      if (
        currentLeague !== league
      ) {
        currentLeague = league;

        text += `🏆 *${league.toUpperCase()}*\n`;
      }

      // HORÁRIO BRASIL
      const time = new Date(
        game.fixture.date
      ).toLocaleTimeString(
        "pt-BR",
        {
          timeZone:
            "America/Sao_Paulo",

          hour: "2-digit",

          minute: "2-digit",
        }
      );

      // TIMES
      const home =
        game.teams.home.name;

      const away =
        game.teams.away.name;

      // CANAL
      const channel =
        getChannel(league);

      text += `⚽ *${home}* x *${away}*\n`;

      text += `⏰ ${time}\n`;

      text += `📺 ${channel}\n`;

      text +=
        "━━━━━━━━━━━━━━━━━━\n";
    });

    // FINAL
    text +=
      "No Diow Play🚀 você assiste todos os jogos sem travamentos🔥";

    return text;
  }

  // TELEGRAM
  async function sendTelegram(
    text: string
  ) {
    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            chat_id:
              TELEGRAM_CHAT_ID,

            text,

            parse_mode:
              "Markdown",
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // ENVIAR AGORA
  async function sendNow() {
    await sendTelegram(
      currentText
    );

    alert(
      "Enviado para o Telegram!"
    );
  }

  const currentText =
    activeTab === "today"
      ? todayGames
      : tomorrowGames;

  // COPIAR
  function copyText() {
    navigator.clipboard.writeText(
      currentText
    );

    alert("Texto copiado!");
  }

  // WHATS
  function sendWhatsApp() {
    const text =
      encodeURIComponent(
        currentText
      );

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank"
    );
  }

  return (
    <main className="min-h-screen bg-[#020817] p-4 text-white">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500">
            <ClipboardList
              size={20}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-lg font-bold">
              Guia Futebol
            </h1>

            <p className="text-xs text-zinc-400">
              Jogos automáticos
            </p>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20"
        >
          <ArrowLeft size={15} />
          Dashboard
        </Link>
      </div>

      {/* BOX */}
      <div className="mx-auto max-w-[620px] rounded-[30px] border border-cyan-400/20 bg-gradient-to-b from-[#0f6dc0] to-[#1593ff] p-5 shadow-[0_0_40px_rgba(0,174,255,0.2)]">
        {/* TITULO */}
        <div className="text-center">
          <h1 className="text-2xl font-black">
            ⚽ GERADOR DE JOGOS ⚽
          </h1>

          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-cyan-300" />
        </div>

        {/* TABS */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() =>
              setActiveTab("today")
            }
            className={`rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
              activeTab ===
              "today"
                ? "bg-cyan-400 text-white"
                : "bg-[#0f6dc0]"
            }`}
          >
            Jogos de Hoje
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "tomorrow"
              )
            }
            className={`rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
              activeTab ===
              "tomorrow"
                ? "bg-cyan-400 text-white"
                : "bg-[#0f6dc0]"
            }`}
          >
            Jogos de Amanhã
          </button>
        </div>

        {/* TEXTO */}
        <div className="mt-5 rounded-2xl bg-[#07569b] p-4">
          {loading ? (
            <div className="py-20 text-center text-sm">
              Buscando jogos...
            </div>
          ) : (
            <textarea
              value={currentText}
              readOnly
              className="h-[340px] w-full resize-none rounded-xl bg-transparent text-xs leading-relaxed text-white outline-none"
            />
          )}
        </div>

        {/* BOTÕES */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <button
            onClick={copyText}
            className="rounded-2xl bg-[#0f6dc0] px-4 py-4 text-xs font-bold"
          >
            Copiar
          </button>

          <button
            onClick={sendWhatsApp}
            className="rounded-2xl bg-[#0f6dc0] px-4 py-4 text-xs font-bold"
          >
            Whats
          </button>

          <button
            onClick={sendNow}
            className="rounded-2xl bg-cyan-500 px-4 py-4 text-xs font-bold"
          >
            Telegram
          </button>
        </div>
      </div>
    </main>
  );
}