import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SECRET = "diowplay_secret";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token =
  cookieStore.get("diow_user")?.value;

    if (!token) {
      return NextResponse.json({
        username: null,
        perfil: null,
      });
    }

    const decoded = jwt.verify(
      token,
      SECRET
    ) as {
      id: string;
      perfil: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        username: true,
        role: true,
      },
    });

    return NextResponse.json({
      username: user?.username || null,
      perfil: user?.role || "USER",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      username: null,
      perfil: null,
    });
  }
}