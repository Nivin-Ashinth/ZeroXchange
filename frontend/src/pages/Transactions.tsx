import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Send, ReceiptIcon as ReceiveIcon, Wallet, Clock, ArrowRight, Copy, CheckCircle2 } from 'lucide-react';

function Transactions() {
  const [walletId] = useState('0x1234...5678');
  const [copied, setCopied] = useState(false);

  const copyWalletId = () => {
    navigator.clipboard.writeText(walletId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recentTransactions = [
    { id: 1, type: 'sent', amount: '0.5 ETH', to: '0x8765...4321', date: '2024-03-15', status: 'completed' },
    { id: 2, type: 'received', amount: '0.2 BTC', from: '0x9876...5432', date: '2024-03-14', status: 'completed' },
    { id: 3, type: 'sent', amount: '100 USDT', to: '0x7654...3210', date: '2024-03-13', status: 'pending' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Sidebar />
      <div className="flex-1">
        <Header title="Transactions" />
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wallet Card */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">My Wallet</h2>
              <Wallet className="text-blue-500" size={24} />
            </div>
            <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-3">
              <span className="text-gray-300">{walletId}</span>
              <button
                onClick={copyWalletId}
                className="ml-auto text-gray-400 hover:text-white transition-colors"
              >
                {copied ? <CheckCircle2 size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center gap-3 bg-blue-500 text-white rounded-lg p-4 hover:bg-blue-600 transition-colors">
                <Send size={20} />
                <span>Send Money</span>
              </button>
              <button className="flex items-center gap-3 bg-green-500 text-white rounded-lg p-4 hover:bg-green-600 transition-colors">
                <ReceiveIcon size={20} />
                <span>Receive Money</span>
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="md:col-span-2 bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
              <Clock className="text-gray-400" size={24} />
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'sent' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                    }`}>
                      {transaction.type === 'sent' ? <Send size={20} /> : <ReceiveIcon size={20} />}
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {transaction.type === 'sent' ? 'Sent to' : 'Received from'}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {transaction.type === 'sent' ? transaction.to : transaction.from}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      transaction.type === 'sent' ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {transaction.type === 'sent' ? '-' : '+'}{transaction.amount}
                    </div>
                    <div className="text-gray-400 text-sm">{transaction.date}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 text-blue-500 hover:text-blue-400 mt-4 transition-colors">
              <span>View All Transactions</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;