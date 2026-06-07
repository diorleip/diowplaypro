import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const telegramForm =
      new FormData();

    telegramForm.append(
      "chat_id",
      body.chatId
    );

    telegramForm.append(
      "photo",
      body.photo
    );

    telegramForm.append(
      "caption",
      body.caption || ""
    );

    const response =
      await fetch(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendPhoto`,
        {
          method: "POST",
          body: telegramForm,
        }
      );

    const data =
      await response.json();

    return NextResponse.json(
      data
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      ok: false,
    });
  }
}