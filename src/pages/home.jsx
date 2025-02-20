import { useState, useEffect } from 'react';
import { 
  ArrowUpDown,
  Shield,
  Globe,
  Activity,
  Edit,
  Trash2,
  AlertCircle
} from 'lucide-react';

const Home = () => {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch APIs from your backend
    const fetchApis = async () => {
      try {
        // todo the jwt token flow need to be fixed
        const response = await fetch('http://localhot:5000/api/in/api', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setApis(data.apis);
      } catch (error) {
        console.error('Error fetching APIs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApis();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total APIs', value: apis.length, icon: <Globe className="text-blue-500" /> },
          { label: 'Active APIs', value: apis.filter(api => api.status === 'active').length, icon: <Activity className="text-green-500" /> },
          { label: 'Protected APIs', value: apis.filter(api => api.authentication_type).length, icon: <Shield className="text-purple-500" /> },
          { label: 'Rate Limited', value: apis.filter(api => api.rate_limit).length, icon: <ArrowUpDown className="text-orange-500" /> }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* APIs List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Your API Tunnels</h3>
        </div>
        
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : apis.length === 0 ? (
          <div className="p-6 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No APIs</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new API tunnel.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Endpoint</th>
                  <th className="px-6 py-3">Method</th>
                  <th className="px-6 py-3">Auth Type</th>
                  <th className="px-6 py-3">Rate Limit</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {apis.map((api) => (
                  <tr key={api.id} className="text-sm">
                    <td className="px-6 py-4">{api.name}</td>
                    <td className="px-6 py-4 font-mono text-sm">{api.endpoint}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        api.method === 'GET' ? 'bg-green-100 text-green-800' :
                        api.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        api.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {api.method}
                      </span>
                    </td>
                    <td className="px-6 py-4">{api.authentication_type || '-'}</td>
                    <td className="px-6 py-4">{api.rate_limit ? `${api.rate_limit}/min` : '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        api.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {api.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-500 hover:text-blue-600">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-red-600">
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

export default Home;