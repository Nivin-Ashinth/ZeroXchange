import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  Camera, Mail, Lock, Bell, Shield, Wallet, ChevronRight, Moon, Sun, 
  Palette, CreditCard, Check, AlertCircle, Trash2, Eye, EyeOff 
} from 'lucide-react';

function Settings() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [theme, setTheme] = useState('dark');
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');

  // Email Settings
  const [promotionalEmails, setPromotionalEmails] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);

  // Security Settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    transactionUpdates: true,
    accountActivity: true,
    monthlySummary: false
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'friends',
    dataSharing: false
  });

  // Payment Methods
  const [cards, setCards] = useState([
    { id: 1, last4: '4321' },
    { id: 2, last4: '8765' }
  ]);
  const [newCard, setNewCard] = useState('');

  const themes = [
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'light', name: 'Light', icon: Sun },
  ];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsThemeMenuOpen(false);
    showSuccess('Theme updated successfully');
  };

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

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleRemoveCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
    showSuccess('Card removed successfully');
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCard.length === 16) {
      setCards([...cards, { id: Date.now(), last4: newCard.slice(-4) }]);
      setNewCard('');
      showSuccess('Card added successfully');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header title="Settings" />
        
        {successMessage && (
          <div className="fixed top-4 right-4 flex items-center gap-2 bg-green-500/10 text-green-500 p-4 rounded-lg z-50">
            <Check size={20} />
            {successMessage}
          </div>
        )}

        <div className="max-w-4xl mx-auto p-6 space-y-8">
          {/* Profile Section */}
          <section className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Profile Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
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
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="text-gray-400 text-sm">Member since</div>
                  <div className="text-white">March 2024</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Last login</div>
                  <div className="text-white">2 hours ago</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">2FA Status</div>
                  <div className="text-green-500">Enabled</div>
                </div>
              </div>
            </div>
          </section>

          {/* Email Settings */}
          <section className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Email Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Promotional Emails</div>
                  <div className="text-gray-400 text-sm">Receive updates about new features</div>
                </div>
                <button
                  onClick={() => setPromotionalEmails(!promotionalEmails)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    promotionalEmails ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    promotionalEmails ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Transaction Alerts</div>
                  <div className="text-gray-400 text-sm">Get notified about your transactions</div>
                </div>
                <button
                  onClick={() => setTransactionAlerts(!transactionAlerts)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    transactionAlerts ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    transactionAlerts ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </section>

          {/* Security Settings */}
          <section className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
            <div className="space-y-4">
              <div className="text-gray-400 text-sm">Password last changed: 1 month ago</div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">Two-Factor Authentication</div>
                  <div className="text-gray-400 text-sm">Add an extra layer of security</div>
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    twoFactorEnabled ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={key}
                    checked={value}
                    onChange={() => setNotifications({
                      ...notifications,
                      [key]: !value
                    })}
                    className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <label htmlFor={key} className="text-white capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy Settings */}
          <section className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Privacy Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Profile Visibility</label>
                <select
                  value={privacySettings.profileVisibility}
                  onChange={(e) => setPrivacySettings({
                    ...privacySettings,
                    profileVisibility: e.target.value
                  })}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="dataSharing"
                  checked={privacySettings.dataSharing}
                  onChange={() => setPrivacySettings({
                    ...privacySettings,
                    dataSharing: !privacySettings.dataSharing
                  })}
                  className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <label htmlFor="dataSharing" className="text-white">
                  Allow data sharing with partners
                </label>
              </div>
            </div>
          </section>

          {/* Payment Methods */}
          <section className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Payment Methods</h2>
            <form onSubmit={handleAddCard} className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Add New Card</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="text"
                    value={newCard}
                    onChange={(e) => setNewCard(e.target.value.replace(/\D/g, '').slice(0, 16))}
                    className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter card number"
                    pattern="\d{16}"
                    maxLength={16}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={newCard.length !== 16}
                className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Payment Method
              </button>

              <div className="space-y-3">
                {cards.map(card => (
                  <div key={card.id} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-gray-400" size={20} />
                      <span className="text-white">•••• •••• •••• {card.last4}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveCard(card.id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;