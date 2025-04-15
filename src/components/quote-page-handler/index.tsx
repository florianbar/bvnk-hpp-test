"use server";

import { redirect } from "next/navigation";

import Error from "@/app/error";
import { fetchQuote } from "@/utils/api";
import { PayinSummaryResponse } from "@/types/payin";
import { QUOTE_STATUS } from "@/constants/payin";
import { getPayinRoutes } from "@/utils/routes";

interface QuotePageHandlerProps {
  currentUrl: string;
  uuid: string;
  children: (quote: PayinSummaryResponse) => React.ReactElement;
}

export default async function QuotePageHandler(
  props: QuotePageHandlerProps
): Promise<React.ReactElement> {
  const { currentUrl, uuid, children } = props;

  let quote;
  let hasError = false;

  // Fetch quote
  try {
    quote = await fetchQuote(uuid);
  } catch (error: unknown) {
    console.log("error: ", error);
    hasError = true;
  }

  // Handle error
  if (hasError || !quote) {
    return <Error />;
  }

  // Quote is not expired
  if (quote.expiryDate > Date.now()) {
    const STATUS_URLS = {
      [QUOTE_STATUS.TEMPLATE]: getPayinRoutes.confirm(uuid),
      [QUOTE_STATUS.PENDING]: getPayinRoutes.confirm(uuid),
      [QUOTE_STATUS.ACCEPTED]: getPayinRoutes.pay(uuid),
    };

    // Redirect to correct page based on quote status
    const expectedUrl = STATUS_URLS[quote.quoteStatus];
    if (currentUrl !== expectedUrl) {
      return redirect(expectedUrl);
    }
  } else {
    const expiredUrl = getPayinRoutes.expired(uuid);

    if (currentUrl !== expiredUrl) {
      return redirect(expiredUrl);
    }
  }

  // Return page
  return children(quote);
}
