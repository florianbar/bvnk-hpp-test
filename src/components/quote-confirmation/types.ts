export interface QuoteConfirmationProps {
  uuid: string;
}

export interface QuoteDetailsProps {
  merchantDisplayName: string;
  amount: number;
  currency: string;
  reference: string;
}

export interface PayInSelectProps {
  onChange: (currency: string) => void;
}

export interface AmountDetailsProps {
  amount: number;
  currency: string;
  acceptanceExpiryDate: number;
}
