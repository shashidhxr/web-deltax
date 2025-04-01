import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Home,
  Key,
  Shield,
  Share2,
  Sliders,
  Network,
  Plus,
  Settings,
  LogOut,
  LogIn
} from "lucide-react";
import { useAuth } from "../context/authProvider";

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("dashboard");
  const { authenticated, setAuthenticated } = useAuth();

  // Sync active item with current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActiveItem("dashboard");
    else if (path === "/create") setActiveItem("");
    else if (path.startsWith("/api/")) setActiveItem("apis");
    else if (path === "/auth") setActiveItem("");
    else {
      // Remove leading slash and set active item
      const item = path.substring(1);
      if (menuItems.some((menuItem) => menuItem.id === item)) {
        setActiveItem(item);
      }
    }
  }, [location]);

  const menuItems = [
    {
      id: "dashboard",
      icon: <Home size={18} />,
      label: "Dashboard",
      path: "/",
    },
    {
      id: "apis",
      icon: <Network size={18} />,
      label: "API Tunnels",
      path: "/",
    },
    {
      id: "auth",
      icon: <Key size={18} />,
      label: "Authentication",
      path: "/auth",
    },
    {
      id: "ratelimit",
      icon: <Sliders size={18} />,
      label: "Rate Limiting",
      path: "/ratelimit",
    },
    {
      id: "loadbalancing",
      icon: <Share2 size={18} />,
      label: "Load Balancing",
      path: "/loadbalancing",
    },
    {
      id: "security",
      icon: <Shield size={18} />,
      label: "Security",
      path: "/security",
    },
  ];

  const handleAuthButton = async () => {
    if (authenticated) {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/in/user/logout`,
          {}
        );
        setAuthenticated(false);
        navigate("/auth");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">DeltaX Gateway</h1>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  navigate(item.path);
                }}
                className={`w-full flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors ${
                  activeItem === item.id
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`mr-3 ${
                    activeItem === item.id ? "text-blue-500" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate("/create")}
            className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
          >
            <Plus size={18} className="mr-2" />
            Create New API
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-full flex items-center px-4 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Settings size={18} className="mr-3 text-gray-400" />
            Settings
          </button>

          <button
            onClick={handleAuthButton}
            className={`w-full flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors mt-1 ${
              authenticated
                ? "text-red-600 hover:bg-red-50"
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >
            {authenticated ? (
              <LogOut size={18} className="mr-3 text-red-400" />
            ) : (
              <LogIn size={18} className="mr-3 text-blue-400" />
            )}
            {authenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find((item) => item.id === activeItem)?.label ||
                "Dashboard"}
            </h2>
            <button
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() =>
                window.open("https://github.com/shashidhxr/deltax", "_blank")
              }
            >
              Documentation
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
