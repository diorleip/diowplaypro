import { NextRequest, NextResponse } from "next/server";

const LIGAS_PERMITIDAS = [
  71,  // Brasileirão Série A
  72,  // Brasileirão Série B
  73,  // Copa do Brasil
  13,  // Libertadores
  11,  // Sul-Americana
  268, // Série D
  239, // Campeonato Chileno
  270, // Campeonato Uruguaio
];

export async function GET(req: NextRequest) {
  try {
    const dia =
      req.nextUrl.searchParams.get("dia") || "hoje";

    const data = new Date();

    if (dia === "amanha") {
      data.setDate(data.getDate() + 1);
    }

    const dataFormatada =
      data.toISOString().split("T")[0];

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${dataFormatada}`,
      {
        headers: {
          "x-apisports-key":
            process.env.API_FOOTBALL_KEY || "",
        },
        cache: "no-store",
      }
    );

    const json = await response.json();

    const jogos =
      json?.response
        ?.filter((jogo: any) => {
          const nomeLiga =
            jogo.league?.name || "";

          const idLiga =
            jogo.league?.id || 0;

          const bloqueado =
            nomeLiga.includes("Women") ||
            nomeLiga.includes("Feminino") ||
            nomeLiga.includes("U15") ||
            nomeLiga.includes("U16") ||
            nomeLiga.includes("U17") ||
            nomeLiga.includes("U18") ||
            nomeLiga.includes("U19") ||
            nomeLiga.includes("U20") ||
            nomeLiga.includes("U21");

          return (
            !bloqueado &&
            LIGAS_PERMITIDAS.includes(idLiga)
          );
        })
        .map((jogo: any) => ({
          liga: `🏆 ${jogo.league.name}`,
          casa: jogo.teams.home.name,
          fora: jogo.teams.away.name,
          horario: new Date(
            jogo.fixture.date
          ).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          transmissao: "",
          logoCasa:
            jogo.teams.home.logo,
          logoFora:
            jogo.teams.away.logo,
        }))
        .sort((a: any, b: any) =>
          a.horario.localeCompare(
            b.horario
          )
        ) || [];

    return NextResponse.json(jogos);
  } catch (error) {
    console.error(error);

    return NextResponse.json([]);
  }
}