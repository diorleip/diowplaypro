import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest
) {
  const { searchParams } =
    new URL(request.url);

  const path =
    searchParams.get("path");

  if (!path) {
    return new Response(
      "Imagem não encontrada",
      {
        status: 404,
      }
    );
  }

  const imageUrl = `https://image.tmdb.org/t/p/original${path}`;

  const response =
    await fetch(imageUrl);

  const arrayBuffer =
    await response.arrayBuffer();

  return new Response(
    arrayBuffer,
    {
      headers: {
        "Content-Type":
          response.headers.get(
            "Content-Type"
          ) || "image/jpeg",

        "Access-Control-Allow-Origin":
          "*",
      },
    }
  );
}