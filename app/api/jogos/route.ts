import { NextResponse } from "next/server";

export async function GET() {
  const jogos = [
    {
      liga: "🇧🇷 Brasileirão Série A",
      casa: "Flamengo",
      fora: "Palmeiras",
      horario: "16:00",
      transmissao: "Globo e Premiere",
      logoCasa: "https://media.api-sports.io/football/teams/127.png",
      logoFora: "https://media.api-sports.io/football/teams/121.png",
    },
    {
      liga: "🇧🇷 Brasileirão Série A",
      casa: "Corinthians",
      fora: "São Paulo",
      horario: "18:30",
      transmissao: "Premiere",
      logoCasa: "https://media.api-sports.io/football/teams/131.png",
      logoFora: "https://media.api-sports.io/football/teams/126.png",
    },
    {
      liga: "🏆 Libertadores",
      casa: "River Plate",
      fora: "Boca Juniors",
      horario: "19:00",
      transmissao: "ESPN e Disney+",
      logoCasa: "https://media.api-sports.io/football/teams/435.png",
      logoFora: "https://media.api-sports.io/football/teams/451.png",
    },
    {
      liga: "🇪🇸 La Liga",
      casa: "Barcelona",
      fora: "Real Madrid",
      horario: "20:00",
      transmissao: "ESPN e Disney+",
      logoCasa: "https://media.api-sports.io/football/teams/529.png",
      logoFora: "https://media.api-sports.io/football/teams/541.png",
    },
    {
      liga: "🏴 Premier League",
      casa: "Liverpool",
      fora: "Manchester City",
      horario: "21:00",
      transmissao: "ESPN e Disney+",
      logoCasa: "https://media.api-sports.io/football/teams/40.png",
      logoFora: "https://media.api-sports.io/football/teams/50.png",
    },
    {
      liga: "🇮🇹 Serie A",
      casa: "Inter",
      fora: "Juventus",
      horario: "21:45",
      transmissao: "ESPN e Disney+",
      logoCasa: "https://media.api-sports.io/football/teams/505.png",
      logoFora: "https://media.api-sports.io/football/teams/496.png",
    },
    {
      liga: "🇩🇪 Bundesliga",
      casa: "Bayern",
      fora: "Dortmund",
      horario: "22:00",
      transmissao: "GOAT",
      logoCasa: "https://media.api-sports.io/football/teams/157.png",
      logoFora: "https://media.api-sports.io/football/teams/165.png",
    },
    {
      liga: "🏆 Sul-Americana",
      casa: "Grêmio",
      fora: "Internacional",
      horario: "22:30",
      transmissao: "Paramount+",
      logoCasa: "https://media.api-sports.io/football/teams/119.png",
      logoFora: "https://media.api-sports.io/football/teams/120.png",
    },
  ];

  return NextResponse.json(jogos);
}