import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      username,
      password,
      indicadoPor,
    } = await req.json();

    if (!username || !password) {
      return NextResponse.json({
        error: "Preencha todos os campos",
      });
    }

    const exists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (exists) {
      return NextResponse.json({
        error: "Usuário já existe",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        status: "PENDENTE",
        role: "USER",
        indicadoPor: indicadoPor || null,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: "Erro ao criar conta",
    });
  }
}