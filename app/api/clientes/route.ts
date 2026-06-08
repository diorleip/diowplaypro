import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const clientes = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        username: true,
        nome: true,
        whatsapp: true,
        email: true,
        status: true,
        plano: true,
        expiraEm: true,
        createdAt: true,
      },
    });

    return NextResponse.json(clientes);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar clientes" },
      { status: 500 }
    );
  }
}