import { useState } from "react";
import { ArrowLeft, Save, Shield, Globe, Activity, Server } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateAPI = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    exposedUrl: "",
    targetUrl: "",
    method: "GET",
    authType: "",
    rateLimit: "",
    loadBalancing: {
      enabled: false,
      algorithm: "round-robin",
      targets: [""],
    },
    security: {
      cors: false,
      ssl: false,
      ipWhitelist: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/in/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating API:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-semibold">Create New API Tunnel</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Globe className="mr-2" size={20} />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                API Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="My API Tunnel"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Exposed URL Path
              </label>
              <input
                type="text"
                value={formData.exposedUrl}
                onChange={(e) =>
                  setFormData({ ...formData, exposedUrl: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="/api/v1/resource"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Target URL
              </label>
              <input
                type="url"
                value={formData.targetUrl}
                onChange={(e) =>
                  setFormData({ ...formData, targetUrl: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="https://api.example.com/resource"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                HTTP Method
              </label>
              <select
                value={formData.method}
                onChange={(e) =>
                  setFormData({ ...formData, method: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Shield className="mr-2" size={20} />
            Authentication
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Authentication Type
            </label>
            <select
              value={formData.authType}
              onChange={(e) =>
                setFormData({ ...formData, authType: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">None</option>
              <option value="api_key">API Key</option>
              <option value="jwt">JWT</option>
              <option value="oauth2">OAuth 2.0</option>
            </select>
          </div>
        </div>

        {/* Rate Limiting */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Activity className="mr-2" size={20} />
            Rate Limiting
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Requests per minute
            </label>
            <input
              type="number"
              value={formData.rateLimit}
              onChange={(e) =>
                setFormData({ ...formData, rateLimit: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="100"
            />
          </div>
        </div>

        {/* Load Balancing */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Server className="mr-2" size={20} />
            Load Balancing
          </h3>

          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.loadBalancing.enabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      loadBalancing: {
                        ...formData.loadBalancing,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="rounded border-gray-300"
                />
                <span className="ml-2 text-sm">Enable Load Balancing</span>
              </label>
            </div>

            {formData.loadBalancing.enabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Algorithm
                  </label>
                  <select
                    value={formData.loadBalancing.algorithm}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        loadBalancing: {
                          ...formData.loadBalancing,
                          algorithm: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="round-robin">Round Robin</option>
                    <option value="least-connections">Least Connections</option>
                    <option value="ip-hash">IP Hash</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Target Servers
                  </label>
                  {formData.loadBalancing.targets.map((target, index) => (
                    <div key={index} className="mt-2 flex space-x-2">
                      <input
                        type="url"
                        value={target}
                        onChange={(e) => {
                          const newTargets = [
                            ...formData.loadBalancing.targets,
                          ];
                          newTargets[index] = e.target.value;
                          setFormData({
                            ...formData,
                            loadBalancing: {
                              ...formData.loadBalancing,
                              targets: newTargets,
                            },
                          });
                        }}
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                        placeholder="https://server1.example.com"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newTargets = [
                            ...formData.loadBalancing.targets,
                          ];
                          if (newTargets.length > 1) {
                            newTargets.splice(index, 1);
                          }
                          setFormData({
                            ...formData,
                            loadBalancing: {
                              ...formData.loadBalancing,
                              targets: newTargets,
                            },
                          });
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        loadBalancing: {
                          ...formData.loadBalancing,
                          targets: [...formData.loadBalancing.targets, ""],
                        },
                      })
                    }
                    className="mt-2 text-sm text-blue-600 hover:text-blue-500"
                  >
                    + Add another server
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Save size={16} className="mr-2" />
            Create API
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAPI;
