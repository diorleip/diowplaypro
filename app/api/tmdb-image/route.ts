import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest
) {
  try {
    const path =
      request.nextUrl.searchParams.get(
        "path"
      );

    if (!path) {
      return new Response(
        "Parâmetro path ausente",
        { status: 400 }
      );
    }

    const imageUrl =
      `https://image.tmdb.org/t/p/original${path}`;

    const response =
      await fetch(imageUrl);

    if (!response.ok) {
      return new Response(
        `TMDB retornou ${response.status}`,
        {
          status: response.status,
        }
      );
    }

    const image =
      await response.arrayBuffer();

    return new Response(image, {
      headers: {
        "Content-Type":
          response.headers.get(
            "content-type"
          ) || "image/jpeg",
      },
    });
  } catch (error: any) {
    return new Response(
      error?.message ||
        "Erro interno",
      {
        status: 500,
      }
    );
  }
}