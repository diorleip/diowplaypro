import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const dia =
      req.nextUrl.searchParams.get("dia") || "hoje";

const url =
  dia === "amanha"
    ? "https://mantosdofutebol.com.br/jogos-de-amanha-tv/"
    : "https://mantosdofutebol.com.br/guia-de-jogos-tv-hoje-ao-vivo/";
    
    const { data } = await axios.get(url);

    const textoPagina = decodeURIComponent(
      data.replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
    );

    const regex =
      /(\d{2}h\d{2}) - (.*?) x (.*?) - (.*?)\nCanais: (.*?)(?=\n\d{2}h\d{2}|\n\n|$)/gs;

    const jogos: any[] = [];

    let match;

    while ((match = regex.exec(textoPagina)) !== null) {
      jogos.push({
        campeonato: match[4].trim(),
        casa: match[2].trim(),
        fora: match[3].trim(),
        hora: match[1].replace("h", ":"),
        tv: match[5].trim(),
      });
    }

    const campeonatosPermitidos = [
      "Copa do Mundo",
      "Brasileirão Série A",
      "Brasileirão Série B",
      "Brasileirão Série C",
      "Brasileirão Série D",
      "Libertadores",
      "Sul-Americana",
      "Premier League",
      "La Liga",
      "Serie A",
      "Bundesliga",
      "Ligue 1",
      "Champions League",
      "Europa League",
      "Conference League",
      "Copa do Nordeste",
      "Mundial de Clubes",
    ];

    const jogosFiltrados = jogos.filter((jogo) =>
      campeonatosPermitidos.some((c) =>
        jogo.campeonato.includes(c)
      )
    );

    const jogosUnicos = [
      ...new Map(
        jogosFiltrados.map((jogo) => [
          `${jogo.casa}-${jogo.fora}-${jogo.hora}`,
          jogo,
        ])
      ).values(),
    ];

    const dataFormatada =
      new Date().toLocaleDateString("pt-BR", {
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

    jogosUnicos.forEach((jogo: any) => {
      texto += "━━━━━━━━━━━━━━━━━━\n";

      texto +=
        `🏆 *${jogo.campeonato.toUpperCase()}*\n`;

      texto +=
        `⚽ *${jogo.casa}* x *${jogo.fora}*\n`;

      texto +=
        `⏰ ${jogo.hora}\n`;

      texto +=
        `📺 Consulte o Diow Play\n`;
    });

    texto += "━━━━━━━━━━━━━━━━━━\n";
    texto +=
      "⚽ Todos os jogos disponíveis no Diow Play! 🚀";

    return NextResponse.json({
      texto,
      jogos: jogosUnicos,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      texto: "❌ Erro ao carregar os jogos.",
      jogos: [],
    });
  }
}