import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.API_FOOTBALL_KEY!;

const LIGAS_PERMITIDAS = [
  71, // Série A
  72, // Série B
  73, // Série C
  848, // Série D
  74, // Copa do Brasil

  13,
  11,
  10,

  39,
  140,
  135,

  78,
  61,

  2,
  3,

  1,
  15,

  960,
];

export async function GET(req: NextRequest) {
  try {
    const dia =
      req.nextUrl.searchParams.get("dia") || "hoje";

    const data = new Date();

    if (dia === "amanha") {
      data.setDate(data.getDate() + 1);
    }

    const dataApi = data
      .toISOString()
      .split("T")[0];

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${dataApi}`,
      {
        headers: {
          "x-apisports-key": API_KEY,
        },
        cache: "no-store",
      }
    );

    const json = await response.json();

    let jogos = json.response || [];

    jogos = jogos.filter((jogo: any) =>
      LIGAS_PERMITIDAS.includes(
        Number(jogo.league.id)
      )
    );

jogos.sort((a: any, b: any) => {
  const horarioA = new Date(
    a.fixture.date
  ).toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const horarioB = new Date(
    b.fixture.date
  ).toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return horarioA.localeCompare(horarioB);
});
    const dataFormatada =
      data.toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });

    let texto = "";

    if (dia === "amanha") {
      texto =
        `📆 | *JOGOS DE AMANHÃ - ${dataFormatada}*\n`;
    } else {
      texto =
        `📆 | *JOGOS DE HOJE - ${dataFormatada}*\n`;
    }

    jogos.forEach((jogo: any) => {
      const horario = new Date(
        jogo.fixture.date
      ).toLocaleTimeString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
      });

      texto +=
        "━━━━━━━━━━━━━━━━━━\n";

      texto +=
        `🏆 *${jogo.league.name.toUpperCase()}*\n`;

      texto +=
        `⚽ *${jogo.teams.home.name}* x *${jogo.teams.away.name}*\n`;

      texto +=
        `⏰ ${horario}\n`;

      texto +=
        `📺 Consulte o Diow Play\n`;
    });

    texto +=
      "━━━━━━━━━━━━━━━━━━\n";
    texto +=
      "⚽ Todos os jogos disponíveis no Diow Play! 🚀";

    return NextResponse.json({
      texto,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      texto:
        "❌ Erro ao carregar os jogos.",
    });
  }
}