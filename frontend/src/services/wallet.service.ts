import api from './api';
import type { Transaction, WalletBalance, SendMoneyPayload } from '../types/wallet';

export const walletService = {
  async getTransactions(): Promise<Transaction[]> {
    const { data } = await api.get<Transaction[]>('/wallet/transactions');
    return data;
  },

  async getBalances(): Promise<WalletBalance[]> {
    const { data } = await api.get<WalletBalance[]>('/wallet/balances');
    return data;
  },

  async sendMoney(payload: SendMoneyPayload): Promise<Transaction> {
    const { data } = await api.post<Transaction>('/wallet/send', payload);
    return data;
  },

  async getWalletAddress(): Promise<string> {
    const { data } = await api.get<{ address: string }>('/wallet/address');
    return data.address;
  },
};