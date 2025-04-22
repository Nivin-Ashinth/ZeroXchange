import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Send, ReceiptIcon as ReceiveIcon, AlertCircle } from 'lucide-react';

function Transfer() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    if (!userId.trim() || !amount.trim()) {
      setError('Please fill in all fields');
      return false;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    setError('');
    return true;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage(`You sent ₹${amount} to User ID ${userId}`);
      setUserId('');
      setAmount('');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleReceive = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage(`You requested ₹${amount} from User ID ${userId}`);
      setUserId('');
      setAmount('');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Sidebar />
      <div className="flex-1">
        <Header title="Transfer Coins" />
        
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-gray-800/50 rounded-xl p-8">
            <form className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-lg">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}
              
              {successMessage && (
                <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-4 rounded-lg">
                  <AlertCircle size={20} />
                  <span>{successMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-gray-400 text-sm mb-2" htmlFor="userId">
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter recipient's User ID"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2" htmlFor="amount">
                  Amount (₹)
                </label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleSend}
                  className="flex-1 bg-blue-500 text-white rounded-lg py-3 px-4 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Coin
                </button>
                <button
                  type="button"
                  onClick={handleReceive}
                  className="flex-1 bg-gray-700 text-white rounded-lg py-3 px-4 hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ReceiveIcon size={20} />
                  Request Coin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;