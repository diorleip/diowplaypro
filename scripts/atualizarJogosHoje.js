const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function atualizarJogosHoje() {
  try {
    const { data } = await axios.get(
      "https://mantosdofutebol.com.br/guia-de-jogos-tv-hoje-ao-vivo/"
    );

    const texto = decodeURIComponent(
      data.replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
    );

    const regex =
      /(\d{2}h\d{2}) - (.*?) x (.*?) - (.*?)\nCanais: (.*?)(?=\n\d{2}h\d{2}|\n\n|$)/gs;

    const jogos = [];

    let match;

    while ((match = regex.exec(texto)) !== null) {
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

 const jogosFiltrados = jogos.filter(jogo =>
  campeonatosPermitidos.some(c =>
    jogo.campeonato.includes(c)
  )
);

const jogosUnicos = [
  ...new Map(
    jogosFiltrados.map(jogo => [
      `${jogo.casa}-${jogo.fora}-${jogo.hora}`,
      jogo
    ])
  ).values()
];

    const arquivo = path.join(
      process.cwd(),
      "data",
      "jogos.json"
    );

    fs.writeFileSync(
      arquivo,
      JSON.stringify(jogosUnicos, null, 2)
    );

    console.log(
      `✅ ${jogosUnicos.length} jogos salvos em data/jogos.json`
    );
  } catch (err) {
    console.log("ERRO:");
    console.log(err.message);
  }
}

atualizarJogosHoje();