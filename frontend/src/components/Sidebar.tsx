import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, BarChart2, Star, Settings, LogOut, Send, User } from 'lucide-react';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-16 bg-gray-900 min-h-screen flex flex-col items-center py-8 gap-8">
      <div className="text-blue-500">D</div>
      <nav className="flex flex-col gap-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className={`p-2 rounded-lg transition-colors ${
            isActive('/dashboard') ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Layout size={20} />
        </button>
        <button 
          onClick={() => navigate('/crypto-rates')}
          className={`p-2 rounded-lg transition-colors ${
            isActive('/crypto-rates') ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <BarChart2 size={20} />
        </button>
        <button 
          onClick={() => navigate('/transfer')}
          className={`p-2 rounded-lg transition-colors ${
            isActive('/transfer') ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Send size={20} />
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className={`p-2 rounded-lg transition-colors ${
            isActive('/profile') ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <User size={20} />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-300">
          <Star size={20} />
        </button>
        <button 
          onClick={() => navigate('/settings')}
          className={`p-2 rounded-lg transition-colors ${
            isActive('/settings') ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Settings size={20} />
        </button>
        <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-gray-300 mt-auto">
          <LogOut size={20} />
        </button>
      </nav>
    </div>
  );
}

export default Sidebar