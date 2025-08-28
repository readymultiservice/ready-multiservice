import React, { useState } from 'react';

interface UserDashboardProps {
  onLogout: () => void;
  onExit: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onLogout, onExit }) => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = {
    profile: { label: 'My Profile' },
    services: { label: 'My Services' },
    payments: { label: 'Payment History' },
    notifications: { label: 'Notifications' },
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
              <div className="flex items-center space-x-4">
                <img src="https://picsum.photos/100/100?random=10" alt="User Avatar" className="w-24 h-24 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-gray-500">john@client.com</p>
                </div>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Edit Profile</button>
            </div>
          </div>
        );
      case 'services':
         return (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Services</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-3 bg-gray-50 rounded"><span>SEO Optimization Package</span><span className="font-semibold text-green-600">Active</span></li>
                <li className="flex justify-between items-center p-3 bg-gray-50 rounded"><span>Social Media Campaign (Q3)</span><span className="font-semibold text-gray-500">Completed</span></li>
              </ul>
            </div>
          </div>
        );
      case 'payments':
         return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>
            <div className="bg-white p-6 rounded-lg shadow">
                <table className="w-full text-left">
                    <thead><tr className="border-b"><th className="p-2">Date</th><th className="p-2">Service</th><th className="p-2">Amount</th><th className="p-2">Status</th></tr></thead>
                    <tbody>
                        <tr className="border-b"><td className="p-2">July 1, 2024</td><td className="p-2">SEO Package</td><td className="p-2">$1,200.00</td><td className="p-2 text-green-600">Paid</td></tr>
                         <tr className="border-b"><td className="p-2">June 1, 2024</td><td className="p-2">SEO Package</td><td className="p-2">$1,200.00</td><td className="p-2 text-green-600">Paid</td></tr>
                    </tbody>
                </table>
            </div>
          </div>
        );
       case 'notifications':
         return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <div className="bg-white p-6 rounded-lg shadow">
                <ul className="space-y-3">
                    <li className="p-3 bg-red-50 text-red-800 rounded"><strong>Reminder:</strong> Your invoice #1234 is due next week.</li>
                    <li className="p-3 bg-gray-100 rounded">Welcome to your new dashboard!</li>
                </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex">
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Client Dashboard</h2>
        <nav className="space-y-2 flex-grow">
          {Object.entries(sections).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`w-full text-left px-4 py-2 rounded-md ${activeSection === key ? 'bg-gray-900' : 'hover:bg-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div>
            <button onClick={onExit} className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 mb-2">Back to Site</button>
            <button onClick={onLogout} className="w-full text-left px-4 py-2 rounded-md bg-red-600 hover:bg-red-700">Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default UserDashboard;