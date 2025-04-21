import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Camera, Mail, Lock, Bell, Shield, Wallet, ChevronRight, User } from 'lucide-react';

interface SettingsOption {
  icon: React.ElementType;
  title: string;
  description: string;
}

function Settings() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');

  const settingsOptions: SettingsOption[] = [
    {
      icon: Mail,
      title: 'Email Settings',
      description: 'Manage your email preferences and notifications',
    },
    {
      icon: Lock,
      title: 'Security',
      description: 'Configure your security settings and 2FA',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Choose what updates you want to receive',
    },
    {
      icon: Shield,
      title: 'Privacy',
      description: 'Manage your privacy settings and data',
    },
    {
      icon: Wallet,
      title: 'Payment Methods',
      description: 'Add or remove payment methods',
    },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Sidebar />
      <div className="flex-1 flex">
        <div className="flex-1 p-6">
          <Header title="Settings" />
          
          <div className="mt-6 space-y-6">
            {settingsOptions.map((option, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <option.icon size={20} className="text-blue-500" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">{option.title}</div>
                    <div className="text-gray-400 text-sm">{option.description}</div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-500" />
              </button>
            ))}
          </div>
        </div>

        <div className="w-80 border-l border-gray-700 p-6 space-y-6">
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mx-auto"
              />
              <label className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                <Camera size={16} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors">
            Save Changes
          </button>

          <div className="pt-6 border-t border-gray-700">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Member since</span>
                <span className="text-white">March 2024</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Last login</span>
                <span className="text-white">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">2FA Status</span>
                <span className="text-green-500">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;