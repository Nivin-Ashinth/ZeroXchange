import React from 'react';
import { Bell, Search, User } from 'lucide-react';

function Header({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center p-6">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-gray-800 rounded-full pl-10 pr-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="text-gray-400 hover:text-gray-300">
          <Bell size={20} />
        </button>
        <button className="w-10 h-10 rounded-full bg-gray-700">
          <User size={20} className="mx-auto mt-2 text-gray-300" />
        </button>
      </div>
    </div>
  );
}

export default Header;