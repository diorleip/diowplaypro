import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.username || !body.password) {
      return NextResponse.json({
        error: "Preencha usuário e senha",
      });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (userExists) {
      return NextResponse.json({
        error: "Usuário já existe",
      });
    }

    const hashedPassword = await bcrypt.hash(
      body.password,
      10
    );

    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: "Erro interno no cadastro",
    });
  }
}