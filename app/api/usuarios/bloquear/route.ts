import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        status: "PENDENTE",
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      error: "Erro ao bloquear usuário",
    });
  }
}