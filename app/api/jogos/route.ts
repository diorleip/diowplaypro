import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const hoje = new Date();

const nomeArquivo =
  `${hoje.getFullYear()}-${
    String(hoje.getMonth() + 1).padStart(2, "0")
  }-${
    String(hoje.getDate()).padStart(2, "0")
  }.json`;

const arquivoJogos = path.join(
  process.cwd(),
  "data",
  nomeArquivo
);

if (fs.existsSync(arquivoJogos)) {

  const jogosCache =
    JSON.parse(
      fs.readFileSync(
        arquivoJogos,
        "utf8"
      )
    );

  console.log(
    "📁 Jogos carregados do cache"
  );

  return NextResponse.json({
    texto: "",
    jogos: jogosCache,
  });

}
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

    const regex = new RegExp(
  "(\\d{2}h\\d{2}) - (.*?) x (.*?) - (.*?)\\nCanais: ([\\s\\S]*?)(?=\\n\\d{2}h\\d{2}|\\n\\n|$)",
  "g"
);

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

    if (!fs.existsSync(path.join(process.cwd(), "data"))) {
  fs.mkdirSync(
    path.join(process.cwd(), "data")
  );
}

fs.writeFileSync(
  arquivoJogos,
  JSON.stringify(
    jogosUnicos,
    null,
    2
  )
);

console.log(
  "💾 Jogos salvos:",
  arquivoJogos
);

    const dataBase = new Date();

if (dia === "amanha") {
  dataBase.setDate(dataBase.getDate() + 1);
}

const dataFormatada =
  dataBase.toLocaleDateString("pt-BR", {
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
  `📺 ${jogo.tv}\n`;
    });

    texto += "━━━━━━━━━━━━━━━━━━\n";
    texto +=
      "⚽ Todos os jogos disponíveis no Diow Play! 🚀";

      console.log(
  "TOTAL JOGOS:",
  jogosUnicos.length
);

console.log(jogosUnicos);

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