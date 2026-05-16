import { NextResponse } from "next/server";

export const runtime =
  "nodejs";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      imagem,
      titulo,
      sinopse,
      chatId,
      ano,
      nota,
      tipo,
      generos,
      elenco,
      whatsapp,
      usarWhatsapp
    } = body;

    const token =
      "SEU_TOKEN_AQUI";

    if (!chatId) {

      return NextResponse.json({

        ok: false,
        erro:
          "CHAT ID não configurado"

      });

    }

    /* BASE64 */
    const base64 =
      imagem.replace(
        /^data:image\/png;base64,/,
        ""
      );

    const buffer =
      Buffer.from(
        base64,
        "base64"
      );

    const file =
      new File(
        [buffer],
        "banner.png",
        {
          type: "image/png"
        }
      );

    /* LEGENDA */
    const legenda =
`
🎬 ${titulo}

⭐ ${nota} • ${ano} • ${tipo}

🎭 ${generos}

${sinopse}

🎬 Elenco:
${elenco}

📺 Disponível para:
TV Box • Smart TV • Celulares • Tablets

${usarWhatsapp
? `🟢 ${whatsapp}`
: ""}
`;

    const formData =
      new FormData();

    formData.append(
      "chat_id",
      chatId
    );

    formData.append(
      "caption",
      legenda
    );

    formData.append(
      "photo",
      file
    );

    const telegram =
      await fetch(
        `https://api.telegram.org/bot${token}/sendPhoto`,
        {
          method: "POST",
          body: formData
        }
      );

    const data =
      await telegram.json();

    console.log(
      "TELEGRAM:",
      data
    );

    return NextResponse.json(
      data
    );

  } catch (error: any) {

    console.log(error);

    return NextResponse.json({

      ok: false,
      erro: error.message

    });

  }

}