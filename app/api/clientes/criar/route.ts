import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      nome,
      username,
      password,
      whatsapp,
      plano,
      dias,
    } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Usuário e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const existe = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existe) {
      return NextResponse.json(
        { error: "Usuário já existe" },
        { status: 400 }
      );
    }

    const senhaHash = await bcrypt.hash(password, 10);

    const expiraEm = new Date();

    expiraEm.setDate(
      expiraEm.getDate() + Number(dias || 30)
    );

    const cliente = await prisma.user.create({
      data: {
        nome,
        username,
        password: senhaHash,
        whatsapp,
        plano: plano || "30 Dias",
        status: "ATIVO",
        role: "USER",
        expiraEm,
      },
    });

    return NextResponse.json({
      success: true,
      cliente,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao criar cliente" },
      { status: 500 }
    );
  }
}