export const CURRENCIES_MOCK = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Ethereum", value: "ETH" },
  { label: "Litecoin", value: "LTC" },
];

export const SUMMARY_RESPONSE_MOCK = {
  uuid: "c3b73c0f-4352-47f1-a15d-3eb51615732d",
  merchantDisplayName: "Business Account",
  merchantId: "fb140b88-7296-4397-bd9e-47b29a4805ee",
  dateCreated: 1744617633000,
  expiryDate: 1744617693000,
  quoteExpiryDate: null,
  acceptanceExpiryDate: null,
  quoteStatus: "TEMPLATE",
  reference: "test_reference_in_IGXgBR",
  type: "IN",
  subType: "merchantPayIn",
  status: "PENDING",
  displayCurrency: {
    currency: "ZAR",
    amount: 200,
    actual: 0,
  },
  walletCurrency: {
    currency: "ZAR",
    amount: 200,
    actual: 0,
  },
  paidCurrency: {
    currency: null,
    amount: 0,
    actual: 0,
  },
  feeCurrency: {
    currency: "ZAR",
    amount: 0,
    actual: 0,
  },
  networkFeeCurrency: {
    currency: null,
    amount: 0,
    actual: 0,
  },
  displayRate: null,
  exchangeRate: null,
  address: null,
  returnUrl: "",
  redirectUrl:
    "https://pay.sandbox.bvnk.com/payin/c3b73c0f-4352-47f1-a15d-3eb51615732d",
  transactions: [],
  refund: null,
  refunds: [],
  currencyOptions: [],
  flow: "DEFAULT",
  twoStep: false,
  customerId: "123",
  networkFeeBilledTo: "MERCHANT",
  networkFeeRates: [],
  walletId: "acc:23072827499842:8OyLj:0",
};
