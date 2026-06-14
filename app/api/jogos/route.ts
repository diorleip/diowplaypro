import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const dia =
      req.nextUrl.searchParams.get("dia") || "hoje";

    const arquivo =
      dia === "amanha"
        ? path.join(
            process.cwd(),
            "data",
            "jogos-amanha.json"
          )
        : path.join(
            process.cwd(),
            "data",
            "jogos.json"
          );

    if (!fs.existsSync(arquivo)) {
      return NextResponse.json({
        texto: "❌ Arquivo de jogos não encontrado.",
        jogos: [],
      });
    }

    const conteudo = fs.readFileSync(
      arquivo,
      "utf8"
    );

    const jogos = JSON.parse(conteudo);

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

    jogos.forEach((jogo: any) => {
      texto +=
        "━━━━━━━━━━━━━━━━━━\n";

      texto +=
        `🏆 *${jogo.campeonato.toUpperCase()}*\n`;

      texto +=
        `⚽ *${jogo.casa}* x *${jogo.fora}*\n`;

      texto +=
        `⏰ ${jogo.hora}\n`;

      texto +=
        `📺 Consulte o Diow Play\n`;
    });

    texto +=
      "━━━━━━━━━━━━━━━━━━\n";

    texto +=
      "⚽ Todos os jogos disponíveis no Diow Play! 🚀";

    return NextResponse.json({
      texto,
      jogos,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      texto:
        "❌ Erro ao carregar os jogos.",
      jogos: [],
    });
  }
}