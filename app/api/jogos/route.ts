import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const dia =
      req.nextUrl.searchParams.get("dia") || "hoje";

    const data = new Date();

    if (dia === "amanha") {
      data.setDate(data.getDate() + 1);
    }

    const dataFormatada = data
      .toISOString()
      .split("T")[0];

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

    if (!json.response) {
      return NextResponse.json([]);
    }

    const jogos = json.response
      .filter((jogo: any) => {
        const liga =
          jogo.league?.name?.toLowerCase() || "";

        return (
          !liga.includes("women") &&
          !liga.includes("feminino") &&
          !liga.includes("u15") &&
          !liga.includes("u16") &&
          !liga.includes("u17") &&
          !liga.includes("u18") &&
          !liga.includes("u19") &&
          !liga.includes("u20") &&
          !liga.includes("u21")
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
        logoCasa: jogo.teams.home.logo,
        logoFora: jogo.teams.away.logo,
      }))
      .sort((a: any, b: any) =>
        a.horario.localeCompare(b.horario)
      );

    return NextResponse.json(jogos);
  } catch (error) {
    console.error(error);

    return NextResponse.json([]);
  }
}