export interface PayinPageProps {
  params: {
    uuid: string;
  };
}

export interface PayinSummaryResponse {
  uuid: string;
  merchantDisplayName: string;
  merchantId: string;
  dateCreated: number;
  expiryDate: number;
  quoteExpiryDate: null;
  acceptanceExpiryDate: number;
  quoteStatus: string;
  reference: string;
  type: string;
  subType: string;
  status: string;
  displayCurrency: {
    currency: string;
    amount: number;
    actual: number;
  };
  walletCurrency: {
    currency: string;
    amount: number;
    actual: number;
  };
  paidCurrency: {
    currency: string | null;
    amount: number;
    actual: number;
  };
  feeCurrency: {
    currency: string;
    amount: number;
    actual: number;
  };
  networkFeeCurrency: {
    currency: null;
    amount: number;
    actual: number;
  };
  displayRate: null;
  exchangeRate: null;
  address: { address: string };
  returnUrl: string;
  redirectUrl: string;
  transactions: unknown[];
  refund: null;
  refunds: unknown[];
  currencyOptions: unknown[];
  flow: string;
  twoStep: boolean;
  customerId: string;
  networkFeeBilledTo: string;
  networkFeeRates: unknown[];
  walletId: string;
}
