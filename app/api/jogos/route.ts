import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const dia =
      req.nextUrl.searchParams.get("dia") || "hoje";

    const arquivo = path.join(
      process.cwd(),
      "data",
      dia === "amanha"
        ? "amanha.txt"
        : "hoje.txt"
    );

    const conteudo = fs.readFileSync(
      arquivo,
      "utf8"
    );

    return NextResponse.json({
      texto: conteudo,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      texto: "Nenhum jogo cadastrado.",
    });
  }
}