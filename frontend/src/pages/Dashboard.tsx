import React from 'react';
import { Calendar, Layout, Plus, Bitcoin, Feather as Ethereum, ArrowRightLeft, ChevronDown, Star } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function BalanceCard() {
  return (
    <div className="p-6">
      <div className="flex gap-16 mb-8">
        <div>
          <div className="text-gray-400 text-sm mb-2">Total Balance</div>
          <div className="text-4xl font-bold text-white">$246,030</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm mb-2">Credit Limit</div>
          <div className="text-2xl text-gray-300">$900,000</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm mb-2">Used</div>
          <div className="text-2xl text-gray-300">$120,500</div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300">
          <Calendar size={16} />
          <span>01 Jan 21 - 13 Jan 21</span>
        </button>
        <button className="p-2 rounded-lg bg-gray-800 text-gray-300">
          <Layout size={16} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white">
          <Plus size={16} />
          <span>Add more widgets</span>
        </button>
      </div>
    </div>
  );
}

function CryptoSelector() {
  return (
    <div className="flex gap-4 px-6">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white">
        <Bitcoin className="text-blue-500" size={20} />
        <span>BTC</span>
        <ChevronDown size={16} />
      </button>
      <button className="p-2 rounded-lg bg-gray-800 text-gray-300">
        <ArrowRightLeft size={20} />
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white">
        <Ethereum className="text-blue-500" size={20} />
        <span>ETH</span>
        <ChevronDown size={16} />
      </button>
    </div>
  );
}

function Chart() {
  return (
    <div className="p-6 bg-gray-800/50 rounded-lg mx-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Charts</h2>
        <div className="text-green-500">+0.02045125 ETH</div>
      </div>
      <div className="h-64 flex items-center justify-center text-gray-500">
        Chart visualization would go here
      </div>
    </div>
  );
}

function Cards() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Your Cards</h2>
      <div className="bg-blue-500 rounded-xl p-6 w-80 h-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400 rounded-full -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="text-white/80 mb-8">D</div>
          <div className="text-white tracking-wider mb-4">4315 0245 222 0034</div>
          <div className="text-white/80 text-sm">11/20</div>
        </div>
      </div>
    </div>
  );
}

function CryptoList() {
  return (
    <div className="p-6">
      <div className="bg-gray-800/50 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
          <div className="text-gray-400">Coins.</div>
          <div className="text-gray-400">Last hr.</div>
          <div className="text-gray-400">Pulse.</div>
        </div>
        {[
          { name: 'Bitcoin', price: '$18,618', change: '+2.4%', icon: Bitcoin },
          { name: 'Eth.', price: '$592', change: '-1.6%', icon: Ethereum },
        ].map((coin) => (
          <div key={coin.name} className="grid grid-cols-3 gap-4 py-2">
            <div className="flex items-center gap-2 text-white">
              <Star size={16} className="text-gray-500" />
              <span>{coin.name}</span>
            </div>
            <div className="text-white">{coin.price}</div>
            <div className={coin.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {coin.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Sidebar />
      <div className="flex-1">
        <Header title="Wallet Dashboard" />
        <BalanceCard />
        <CryptoSelector />
        <div className="grid grid-cols-[2fr,1fr]">
          <div>
            <Chart />
          </div>
          <div>
            <Cards />
            <CryptoList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;