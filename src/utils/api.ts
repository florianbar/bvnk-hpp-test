import { PayinSummaryResponse } from "@/types/payin";

export async function fetchQuote(uuid: string): Promise<PayinSummaryResponse> {
  let url = process.env.NEXT_PUBLIC_BVNK_API_URL || "";
  url += `/pay/${uuid}/summary`;

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
