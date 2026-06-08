import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SECRET = "diowplay_secret";

export async function GET() {
  try {
    const cookieStore = await cookies();

    // Pega o valor do cookie correto
    const token = cookieStore.get("diow_user")?.value;

    if (!token) {
      return NextResponse.json(
        {
          error: "Não autenticado",
        },
        {
          status: 401,
        }
      );
    }

    // Decodifica o JWT
    const decoded = jwt.verify(token as string, SECRET) as {
      id: string;
      perfil: string;
    };

    // Busca o usuário logado pelo id do JWT
    const usuario = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!usuario) {
      return NextResponse.json(
        {
          error: "Usuário não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    // Busca todos os usuários indicados por este usuário
    const indicados = await prisma.user.findMany({
      where: {
        indicadoPor: usuario.username,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        username: true,
        status: true,
        role: true,
        createdAt: true,
      },
    });

    const total = indicados.length;
    const ativos = indicados.filter((u) => u.status === "ATIVO").length;
    const pendentes = indicados.filter((u) => u.status === "PENDENTE").length;

    return NextResponse.json({
      total,
      ativos,
      pendentes,
      indicados,
    });
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