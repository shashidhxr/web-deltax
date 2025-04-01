import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowUpDown, Shield, Globe, Activity, Edit, Trash2, AlertCircle } from "lucide-react";

const Home = () => {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApis = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/in/api`);
        setApis(response.data.apis);
      } catch (error) {
        console.error("Error fetching APIs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApis();
  }, []);

  // Loading skeleton for stats
  const StatCardSkeleton = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 w-12 bg-gray-200 rounded mt-2"></div>
        </div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {loading ? (
          Array(4).fill(0).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          [
            { label: "Total APIs", value: apis.length, icon: <Globe className="text-blue-500" /> },
            { label: "Active APIs", value: apis.filter(api => api.status === "active").length, icon: <Activity className="text-green-500" /> },
            { label: "Protected APIs", value: apis.filter(api => api.authentication_type).length, icon: <Shield className="text-purple-500" /> },
            { label: "Rate Limited", value: apis.filter(api => api.rate_limit).length, icon: <ArrowUpDown className="text-orange-500" /> },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* API Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Your API Tunnels</h3>
        </div>

        {loading ? (
          <div className="p-6">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse flex items-center justify-between py-4 border-b border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              </div>
            ))}
          </div>
        ) : apis.length === 0 ? (
          <div className="p-6 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No APIs</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new API tunnel.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Name", "Endpoint", "Method", "Auth Type", "Rate Limit", "Status", "Actions"].map((header) => (
                    <th 
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {apis.map((api) => (
                  <tr key={api.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {api.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                      {api.endpoint}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        api.method === "GET" ? "bg-green-100 text-green-800" :
                        api.method === "POST" ? "bg-blue-100 text-blue-800" :
                        api.method === "PUT" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {api.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {api.authentication_type || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {api.rate_limit ? `${api.rate_limit}/min` : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        api.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {api.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home