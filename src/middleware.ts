import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { fetchQuote } from "@/utils/api";
import { QUOTE_STATUS } from "@/constants/payin";
import { getPayinRoutes } from "@/utils/routes";

export async function middleware(request: NextRequest) {
  // Extract UUID from URL
  const uuid = request.nextUrl.pathname.split("/")[2];
  if (!uuid) return NextResponse.next();

  // Only handle /payin routes
  if (!request.nextUrl.pathname.startsWith("/payin")) {
    return NextResponse.next();
  }

  try {
    const quote = await fetchQuote(uuid);
    const currentUrl = request.nextUrl.pathname;

    // Handle expired quotes
    if (quote.expiryDate <= Date.now()) {
      const expiredUrl = getPayinRoutes.expired(uuid);
      if (currentUrl !== expiredUrl) {
        return NextResponse.redirect(new URL(expiredUrl, request.url));
      }
      return NextResponse.next();
    }

    // Handle active quotes
    const STATUS_URLS = {
      [QUOTE_STATUS.TEMPLATE]: getPayinRoutes.confirm(uuid),
      [QUOTE_STATUS.PENDING]: getPayinRoutes.confirm(uuid),
      [QUOTE_STATUS.ACCEPTED]: getPayinRoutes.pay(uuid),
    };

    const expectedUrl = STATUS_URLS[quote.quoteStatus];
    if (currentUrl !== expectedUrl) {
      return NextResponse.redirect(new URL(expectedUrl, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Handle errors by redirecting to error page
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: "/payin/:uuid*",
};
