import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, dias } = await req.json();

    const cliente = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!cliente) {
      return NextResponse.json({
        error: "Cliente não encontrado",
      });
    }

    const hoje = new Date();

    const base =
      cliente.expiraEm &&
      new Date(cliente.expiraEm) > hoje
        ? new Date(cliente.expiraEm)
        : hoje;

    const novaData = new Date(base);

    novaData.setDate(
      novaData.getDate() + Number(dias)
    );

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        expiraEm: novaData,
        status: "ATIVO",
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao renovar cliente",
      },
      {
        status: 500,
      }
    );
  }
}