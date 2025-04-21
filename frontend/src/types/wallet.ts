export interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: string;
  currency: string;
  address: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface WalletBalance {
  currency: string;
  amount: string;
  usdValue: number;
}

export interface SendMoneyPayload {
  toAddress: string;
  amount: string;
  currency: string;
}