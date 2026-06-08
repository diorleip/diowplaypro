import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const usuarios = await prisma.user.findMany({
      select: {
        username: true,
        indicadoPor: true,
      },
    });

    const ranking: Record<string, number> = {};

    usuarios.forEach((user) => {
      if (user.indicadoPor) {
        ranking[user.indicadoPor] =
          (ranking[user.indicadoPor] || 0) + 1;
      }
    });

    const resultado = Object.entries(ranking)
      .map(([username, total]) => ({
        username,
        total,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    return NextResponse.json(resultado);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro interno",
      },
      {
        status: 500,
      }
    );
  }
}