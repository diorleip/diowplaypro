import { NextResponse } from "next/server";

import type {
  NextRequest
} from "next/server";

export function middleware(
  request: NextRequest
) {

  const logado =
    request.cookies.get(
      "diow_user"
    );

  const isLogin =
    request.nextUrl.pathname
      .startsWith(
        "/login"
      );

  /* SEM LOGIN */
  if (
    !logado &&
    !isLogin
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );

  }

  /* JA LOGADO */
  if (
    logado &&
    isLogin
  ) {

    return NextResponse.redirect(
      new URL(
        "/dashboard",
        request.url
      )
    );

  }

  return NextResponse.next();

}

export const config = {

  matcher: [
    "/dashboard/:path*",
    "/login"
  ]

};