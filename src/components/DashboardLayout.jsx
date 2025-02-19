import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Key, 
  Shield, 
  Share2, 
  Sliders, 
  Network, 
  Plus,
  Settings,
  LogOut
} from 'lucide-react';

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { id: 'apis', icon: <Network size={20} />, label: 'API Tunnels' },
    { id: 'auth', icon: <Key size={20} />, label: 'Authentication' },
    { id: 'ratelimit', icon: <Sliders size={20} />, label: 'Rate Limiting' },
    { id: 'loadbalancing', icon: <Share2 size={20} />, label: 'Load Balancing' },
    { id: 'security', icon: <Shield size={20} />, label: 'Security' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">DeltaX Gateway</h1>
          </div>

          {/* Main Menu */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-lg ${
                    activeItem === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => navigate('/create')}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              <span className="ml-2">Create New API</span>
            </button>
            
            <div className="mt-4 space-y-1">
              <button className="w-full flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50">
                <Settings size={20} />
                <span className="ml-3">Settings</span>
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50">
                <LogOut size={20} />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                Documentation
              </button>
              <button className="px-4 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                Profile
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;