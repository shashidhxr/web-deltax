import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Edit,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart,
  Globe,
  Share2
} from 'lucide-react';
import {
//   LineChart,
//   Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const APIDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [api, setApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  const [analyticsData, setAnalyticsData] = useState({
    traffic: [],
    sources: [],
    errors: []
  });

  useEffect(() => {
    const fetchApiDetails = async () => {
      try {
        // Fetch API details
        const response = await fetch(`/api/in/api/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setApi(data);
        
        // Fetch analytics data
        const analyticsResponse = await fetch(`/api/in/api/${id}/analytics?timeRange=${timeRange}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const analyticsData = await analyticsResponse.json();
        setAnalyticsData(analyticsData);
      } catch (error) {
        console.error('Error fetching API details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApiDetails();
  }, [id, timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!api) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">API not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-semibold">{api.name}</h2>
            <p className="text-sm text-gray-500 font-mono">{api.endpoint}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/api/${id}/edit`)}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Edit size={16} className="mr-2" />
          Edit API
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Total Requests', 
            value: api.stats.totalRequests.toLocaleString(),
            icon: <Activity className="text-blue-500" />,
            change: '+12.5%'
          },
          { 
            label: 'Success Rate', 
            value: `${api.stats.successRate}%`,
            icon: <CheckCircle className="text-green-500" />,
            change: '+2.3%'
          },
          { 
            label: 'Avg Response Time', 
            value: `${api.stats.avgResponseTime}ms`,
            icon: <Clock className="text-purple-500" />,
            change: '-5.1%'
          },
          { 
            label: 'Error Rate', 
            value: `${api.stats.errorRate}%`,
            icon: <AlertTriangle className="text-orange-500" />,
            change: '-1.2%'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last period
                </p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Traffic Graph */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <BarChart className="mr-2" size={20} />
            Traffic Overview
          </h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={analyticsData.traffic}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="requests" 
              stroke="#3B82F6" 
              fill="#93C5FD" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Sources */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold flex items-center mb-4">
            <Globe className="mr-2" size={20} />
            Top Sources
          </h3>
          <div className="space-y-4">
            {analyticsData.sources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <span className="ml-3 text-sm">{source.name}</span>
                </div>
                <div className="text-sm font-medium">
                  {source.requests.toLocaleString()} requests
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Errors */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold flex items-center mb-4">
            <AlertTriangle className="mr-2" size={20} />
            Recent Errors
          </h3>
          <div className="space-y-4">
            {analyticsData.errors.map((error, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{error.message}</p>
                  <p className="text-xs text-gray-500">{error.timestamp}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  error.code >= 500 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {error.code}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold flex items-center mb-4">
            <Share2 className="mr-2" size={20} />
            Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Authentication</p>
              <p className="text-sm font-medium">{api.authentication_type || 'None'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rate Limit</p>
              <p className="text-sm font-medium">{api.rate_limit ? `${api.rate_limit}/min` : 'Unlimited'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Target URL</p>
              <p className="text-sm font-medium font-mono">{api.targetUrl}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDetails;