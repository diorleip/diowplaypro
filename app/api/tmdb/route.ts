import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({
        results: [],
      });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&language=pt-BR&include_adult=false`,
      {
        headers: {
          accept: "application/json",

          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    // FILTRA SOMENTE FILME E TV
    const filtrados =
      data.results
        ?.filter(
          (item: any) =>
            (item.media_type === "movie" ||
              item.media_type === "tv") &&
            item.poster_path &&
            (item.title || item.name)
        )

        // ORDENA PELO MAIS POPULAR
        ?.sort(
          (a: any, b: any) =>
            b.popularity - a.popularity
        ) || [];

    return NextResponse.json({
      results: filtrados,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        results: [],
      },
      { status: 500 }
    );
  }
}