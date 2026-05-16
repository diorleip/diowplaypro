export async function GET(
  req: Request
) {
  try {
    const { searchParams } =
      new URL(req.url);

    const url =
      searchParams.get("url");

    if (!url) {
      return new Response(
        "URL não encontrada",
        {
          status: 400,
        }
      );
    }

    const imageResponse =
      await fetch(url);

    if (!imageResponse.ok) {
      return new Response(
        "Erro ao baixar imagem",
        {
          status: 500,
        }
      );
    }

    const arrayBuffer =
      await imageResponse.arrayBuffer();

    return new Response(
      arrayBuffer,
      {
        headers: {
          "Content-Type":
            imageResponse.headers.get(
              "content-type"
            ) || "image/jpeg",

          "Content-Disposition":
            'attachment; filename="banner.jpg"',
        },
      }
    );
  } catch (error) {
    console.log(error);

    return new Response(
      "Erro interno",
      {
        status: 500,
      }
    );
  }
}