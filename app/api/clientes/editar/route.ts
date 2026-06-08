import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      id,
      nome,
      username,
      password,
      whatsapp,
      plano,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID não informado" },
        { status: 400 }
      );
    }

    const cliente = await prisma.user.findUnique({
      where: { id },
    });

    if (!cliente) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    const dataUpdate: any = {
      nome,
      username,
      whatsapp,
      plano,
    };

    if (
      password &&
      password.trim() !== ""
    ) {
      dataUpdate.password =
        await bcrypt.hash(
          password,
          10
        );
    }

    await prisma.user.update({
      where: { id },
      data: dataUpdate,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao editar cliente" },
      { status: 500 }
    );
  }
}