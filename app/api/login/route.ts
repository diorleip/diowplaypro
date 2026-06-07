import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { createToken } from "../../../lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.username || !body.password) {
      return NextResponse.json({
        error: "Preencha usuário e senha",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
      select: {
        id: true,
        username: true,
        password: true,
        status: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        error: "Usuário não encontrado",
      });
    }

    if (user.status !== "ATIVO") {
      return NextResponse.json({
        error: "Sua conta ainda não foi aprovada",
      });
    }

    const passwordMatch = await bcrypt.compare(
      body.password,
      user.password
    );

    if (!passwordMatch) {
      return NextResponse.json({
        error: "Senha incorreta",
      });
    }

    const token = createToken(
  user.id,
  user.role || "USER"
);

    const cookieStore = await cookies();

    cookieStore.set("diow_user", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json({
      error: "Erro interno no login",
    });
  }
}