import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Server,
  Globe,
  Shield,
  Key,
  Sliders,
  Share2,
  BarChart2,
  Users,
  Settings,
  Bell,
  Lock,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [animationStage, setAnimationStage] = useState(0);
  const titleRef = useRef(null);

  // Animation sequence with faster timing - immediately start and focus on P animation
  useEffect(() => {
    // Start almost immediately
    setAnimationStage(1); // Show everything except the P animation

    // Then focus on the P animation which is the main attraction
    const sequence = [
      () => setAnimationStage(2), // Start P animation
      () => setAnimationStage(3), // Complete animation
    ];

    const timers = sequence.map((fn, i) => setTimeout(fn, 300 + i * 900));
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  // Pricing tiers data
  const plans = [
    {
      name: "Starter",
      price: "$29",
      features: [
        "Up to 500,000 API calls/month",
        "5 API keys",
        "Basic analytics",
        "Community support",
      ],
    },
    {
      name: "Professional",
      price: "$99",
      features: [
        "Up to 5 million API calls/month",
        "Unlimited API keys",
        "Advanced analytics & monitoring",
        "Priority support",
        "Custom domain",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited API calls",
        "Dedicated infrastructure",
        "24/7 premium support",
        "SLA guarantees",
        "Custom integrations",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Custom animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
          
          h1, h2, h3, .logo-text {
            font-family: 'Space Grotesk', sans-serif;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideFromTop {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1.1); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
          
          @keyframes slideRight {
            from { transform: translateX(0); }
            to { transform: translateX(24px); }
          }
          
          @keyframes moveLight {
            0%, 100% { 
              background-position: 0% 50%;
            }
            50% { 
              background-position: 100% 50%; 
            }
          }
          
          .pattern-bg {
            background-color: #f8faff;
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), 
            linear-gradient(120deg, #f0f4ff 0%, #eef2ff 100%);
            background-size: 60px 60px, 200% 200%;
            animation: moveLight 30s ease infinite;
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
          }
          
          .grid-pattern {
            background-image: linear-gradient(#e0e7ff20 1px, transparent 1px), 
                              linear-gradient(to right, #e0e7ff20 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}
      </style>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded bg-blue-600 text-white flex items-center justify-center mr-3">
              <Server size={20} />
            </div>
            <span className="text-xl font-bold logo-text">DeltaX Gateway</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Documentation
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/auth?signin=true")}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pattern-bg py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16" ref={titleRef}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 flex justify-center items-center flex-wrap">
              <span
                className="mr-3"
                style={{
                  opacity: animationStage >= 1 ? 1 : 0,
                  transition: "opacity 0.3s ease-in",
                }}
              >
                The Future is
              </span>

              <div className="inline-flex relative">
                <span
                  style={{
                    opacity: animationStage >= 1 ? 1 : 0,
                    transition: "opacity 0.3s ease-in",
                  }}
                >
                  A
                </span>
                <span
                  style={{
                    opacity: animationStage >= 1 ? 1 : 0,
                    transform:
                      animationStage >= 2
                        ? "translateX(36px)"
                        : "translateX(0)",
                    transition: "transform 0.6s ease-in-out",
                  }}
                >
                  I
                </span>

                {/* P that flies in between A and I */}
                {animationStage >= 2 && (
                  <span
                    className="text-blue-600"
                    style={{
                      position: "absolute",
                      left: "2.6rem",
                      animation: "bounceIn 1.8s forwards",
                      fontFamily: "cursive",
                      fontSize: "1em",
                      transform: "rotate(10deg)",
                    }}
                  >
                    P
                  </span>
                )}
              </div>
            </h1>

            {animationStage >= 1 && (
              <p
                className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                style={{ animation: "fadeIn 0.8s forwards" }}
              >
                Manage, secure, and scale your APIs with
                 DeltaX Gateway. The
                modern solution for seamless API management.
              </p>
            )}
          </div>

          <div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
            style={{
              opacity: animationStage >= 1 ? 1 : 0,
              transition: "opacity 0.3s ease-in",
            }}
          >
            <button
              onClick={() => navigate("/auth?signup=true")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
            >
              Get Started <ArrowRight className="ml-2" size={18} />
            </button>
            <button className="px-8 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center">
              <Code className="mr-2" size={18} /> View Docs
            </button>
          </div>

          {/* Enhanced Hero Image/Illustration */}
          <div
            className="max-w-4xl mx-auto mt-12"
            style={{
              opacity: animationStage >= 1 ? 1 : 0,
              transition: "opacity 0.3s ease-in",
            }}
          >
            <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-100">
              <div className="flex items-center space-x-2 px-4 py-2 border-b border-gray-100 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="overflow-hidden rounded-lg">
                <div className="bg-gray-50 p-6 text-left grid-pattern">
                  <div className="grid grid-cols-12 gap-4">
                    {/* Sidebar with DeltaX features */}
                    <div className="col-span-3 bg-white p-4 rounded shadow-sm border border-gray-200 flex flex-col h-64">
                      <div className="flex items-center mb-6">
                        <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center mr-2">
                          <Server size={12} />
                        </div>
                        <span className="font-semibold text-blue-700">
                          DeltaX
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-blue-700 bg-blue-50 p-2 rounded">
                          <BarChart2 size={14} className="mr-2" />
                          <span>Dashboard</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 p-2 rounded">
                          <Key size={14} className="mr-2" />
                          <span>API Keys</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 p-2 rounded">
                          <Shield size={14} className="mr-2" />
                          <span>Security</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 p-2 rounded">
                          <Globe size={14} className="mr-2" />
                          <span>Endpoints</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 p-2 rounded">
                          <Users size={14} className="mr-2" />
                          <span>Teams</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 p-2 rounded">
                          <Settings size={14} className="mr-2" />
                          <span>Settings</span>
                        </div>
                      </div>
                    </div>

                    {/* Main content area */}
                    <div className="col-span-9 bg-white p-4 rounded shadow-sm border border-blue-200">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                        <div className="text-lg font-semibold text-gray-800">
                          API Dashboard
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                            <Bell size={14} />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Lock size={14} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="text-xs text-gray-500 mb-1">
                            Total Requests
                          </div>
                          <div className="text-lg font-bold">1.42M</div>
                          <div className="h-2 w-full bg-blue-100 rounded-full mt-2">
                            <div className="h-2 w-2/3 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <div className="text-xs text-gray-500 mb-1">
                            Success Rate
                          </div>
                          <div className="text-lg font-bold">99.7%</div>
                          <div className="h-2 w-full bg-green-100 rounded-full mt-2">
                            <div className="h-2 w-11/12 bg-green-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded">
                          <div className="text-xs text-gray-500 mb-1">
                            Avg. Latency
                          </div>
                          <div className="text-lg font-bold">87ms</div>
                          <div className="h-2 w-full bg-purple-100 rounded-full mt-2">
                            <div className="h-2 w-1/4 bg-purple-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm font-semibold">
                            API Traffic
                          </div>
                          <div className="text-xs text-gray-500">
                            Last 24 hours
                          </div>
                        </div>
                        <div className="h-24 flex items-end space-x-1">
                          {[40, 35, 60, 75, 65, 55, 70, 80, 65, 75, 95, 85].map(
                            (h, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-blue-500"
                                style={{
                                  height: `${h}%`,
                                  opacity: 0.7 + i * 0.025,
                                }}
                              ></div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for API Management
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              DeltaX provides all the tools you need to manage, secure, and
              monitor your APIs in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Key size={24} className="text-blue-600" />,
                title: "API Key Management",
                desc: "Create, manage, and revoke API keys with ease. Set permissions and track usage for each key.",
              },
              {
                icon: <Shield size={24} className="text-blue-600" />,
                title: "Security & Authentication",
                desc: "Protect your APIs with JWT authentication, OAuth, and other industry-standard security protocols.",
              },
              {
                icon: <Sliders size={24} className="text-blue-600" />,
                title: "Rate Limiting",
                desc: "Set rate limits to protect your services from abuse and ensure fair usage across all clients.",
              },
              {
                icon: <Server size={24} className="text-blue-600" />,
                title: "API Gateway",
                desc: "Route, transform, and manage traffic to your backend services through a single entry point.",
              },
              {
                icon: <Share2 size={24} className="text-blue-600" />,
                title: "Load Balancing",
                desc: "Distribute traffic evenly across your API endpoints to ensure high availability and performance.",
              },
              {
                icon: <Globe size={24} className="text-blue-600" />,
                title: "Analytics & Monitoring",
                desc: "Track API usage, performance metrics, and errors in real-time with detailed dashboards.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="feature-card bg-white p-6 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include core API
              Gateway features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`
                  bg-white rounded-xl shadow-sm overflow-hidden 
                  ${
                    plan.highlighted
                      ? "border-2 border-blue-500 shadow-lg shadow-blue-100"
                      : "border border-gray-100"
                  }
                `}
              >
                <div className={`p-6 ${plan.highlighted ? "bg-blue-50" : ""}`}>
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-gray-500 ml-1">/month</span>
                    )}
                  </div>

                  <button
                    className={`
                      w-full py-2 rounded-lg transition-colors mb-4
                      ${
                        plan.highlighted
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }
                    `}
                  >
                    {plan.highlighted ? "Get Started" : "Choose Plan"}
                  </button>
                </div>

                <div className="border-t border-gray-100 p-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Call to Action */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your API Experience?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Join the developers who trust DeltaX Gateway for their API
            management needs.
          </p>

          <button
            onClick={() => navigate("/auth?signup=true")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            Get Started <ArrowRight className="ml-2" size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center mr-2">
                <Server size={16} />
              </div>
              <span className="font-bold logo-text">DeltaX Gateway</span>
            </div>

            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} DeltaX Gateway. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
