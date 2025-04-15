import { PayinSummaryResponse } from "@/types/payin";

export async function fetchQuote(uuid: string): Promise<PayinSummaryResponse> {
  let url = process.env.NEXT_PUBLIC_BVNK_API_URL || "";
  url += `/${uuid}/summary`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch quote");
  }

  return await response.json();
}

export async function refreshQuote(
  uuid: string
): Promise<PayinSummaryResponse> {
  let url = process.env.NEXT_PUBLIC_BVNK_API_URL || "";
  url += `/${uuid}/summary`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to refresh quote");
  }

  return await response.json();
}

export async function updateQuote(
  uuid: string,
  currency: string
): Promise<PayinSummaryResponse> {
  let url = process.env.NEXT_PUBLIC_BVNK_API_URL || "";
  url += `/${uuid}/update/summary`;

  const body = JSON.stringify({ currency, payInMethod: "crypto" });

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Failed to update quote");
  }

  return await response.json();
}

export async function acceptQuote(uuid: string): Promise<PayinSummaryResponse> {
  let url = process.env.NEXT_PUBLIC_BVNK_API_URL || "";
  url += `/${uuid}/accept/summary`;

  const body = JSON.stringify({ successUrl: "no_url" });

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Failed to accept quote");
  }

  return await response.json();
}
