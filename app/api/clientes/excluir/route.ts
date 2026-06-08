import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          error: "ID não informado",
        },
        {
          status: 400,
        }
      );
    }

    const cliente = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!cliente) {
      return NextResponse.json(
        {
          error: "Cliente não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("ERRO EXCLUIR:", error);

    return NextResponse.json(
      {
        error: "Erro ao excluir cliente",
      },
      {
        status: 500,
      }
    );
  }
}