import { NextResponse } from "next/server";

import { Innertube } from "youtubei.js";

export async function GET(
  req: Request
) {
  try {
    const { searchParams } =
      new URL(req.url);

    const id =
      searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        ok: false,
      });
    }

    const youtube =
      await Innertube.create();

    const info =
      await youtube.getInfo(id);

    const format =
      info.streaming_data?.formats?.find(
        (f: any) =>
          f.mime_type?.includes(
            "video/mp4"
          )
      );

    if (!format?.url) {
      return NextResponse.json({
        ok: false,
      });
    }

    return NextResponse.json({
      ok: true,

      url: format.url,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      ok: false,
    });
  }
}