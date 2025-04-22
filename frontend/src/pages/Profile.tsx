import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Wallet, Copy, Edit, X, Check, Mail, User, Lock } from 'lucide-react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    walletId: 'WALLET-ABC123XYZ',
    balance: 5000,
    email: 'john.doe@example.com',
    joinedDate: 'March 2024'
  });

  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    password: '',
    confirmPassword: ''
  });

  const copyWalletId = () => {
    navigator.clipboard.writeText(userProfile.walletId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setUserProfile({
      ...userProfile,
      name: formData.name,
      email: formData.email
    });

    setSuccessMessage('Profile updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Sidebar />
      <div className="flex-1">
        <Header title="Profile" />
        
        <div className="max-w-3xl mx-auto p-6">
          {successMessage && (
            <div className="mb-4 flex items-center gap-2 bg-green-500/10 text-green-500 p-4 rounded-lg">
              <Check size={20} />
              {successMessage}
            </div>
          )}

          <div className="bg-gray-800/50 rounded-xl p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-3xl text-blue-500">{userProfile.name[0]}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{userProfile.name}</h2>
                <p className="text-gray-400">Member since {userProfile.joinedDate}</p>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <X size={16} />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit size={16} />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-500" size={16} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-500" size={16} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-500" size={16} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-500" size={16} />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={16} />
                  Update Profile
                </button>
              </form>
            ) : (
              <div className="grid gap-6">
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Wallet ID</span>
                    <button 
                      onClick={copyWalletId}
                      className="text-blue-500 hover:text-blue-400 flex items-center gap-1"
                    >
                      <Copy size={14} />
                      Copy
                    </button>
                  </div>
                  <div className="text-white font-mono">{userProfile.walletId}</div>
                </div>

                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet size={16} className="text-blue-500" />
                    <span className="text-gray-400">Current Balance</span>
                  </div>
                  <div className="text-2xl font-bold text-white">₹{userProfile.balance.toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-gray-400 mb-1">Total Sent</div>
                    <div className="text-xl text-white">₹12,500</div>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-gray-400 mb-1">Total Received</div>
                    <div className="text-xl text-white">₹17,500</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;