import React, { useEffect, useState } from "react";
import {
  Package,
  Users,
  ShoppingBag,
  Percent,
  IndianRupee,
  AlertTriangle,
  EyeOff,
  Star,
  Loader2,
  ArrowRight,
  User,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BASE_URL } from "../../../config/config";

const DashboardPage = ({ setActiveTab }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin/stats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) setStats(data);
        else console.error("Failed to fetch admin stats");
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Format Date + Time
  const formatDate = (iso) => {
    const d = new Date(iso);
    return (
      d.toLocaleDateString() +
      " " +
      d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  if (loading) return <DashboardSkeleton />;

  if (!stats) {
    return <p className="text-center text-gray-400">No data available</p>;
  }

  const {
    products,
    orders,
    users,
    coupons,
    topProducts,
    recentOrders,
    recentUsers,
  } = stats;

  const summaryCards = [
    {
      title: "Total Products",
      value: products.total,
      icon: <Package className="text-blue-500" size={22} />,
    },
    {
      title: "Total Users",
      value: users.total,
      icon: <Users className="text-green-500" size={22} />,
    },
    {
      title: "Total Orders",
      value: orders.total,
      icon: <ShoppingBag className="text-yellow-500" size={22} />,
    },
    {
      title: "Total Revenue",
      value: `₹${orders.revenue.toLocaleString()}`,
      icon: <IndianRupee className="text-purple-500" size={22} />,
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Quick Links */}
      <QuickLinks setActiveTab={setActiveTab} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="flex items-center gap-4 p-5 bg-zinc-800/80 rounded-2xl border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 transition-all"
          >
            <div className="p-3 rounded-xl bg-zinc-900">{card.icon}</div>
            <div>
              <p className="text-gray-400 text-sm">{card.title}</p>
              <h3 className="text-2xl font-semibold text-white">
                {card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Stats */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Order & Product Insights
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatBox
              icon={<AlertTriangle className="text-yellow-500" />}
              label="Processing"
              value={orders.processing}
            />
            <StatBox
              icon={<Star className="text-green-500" />}
              label="Delivered"
              value={orders.delivered}
            />
            <StatBox
              icon={<EyeOff className="text-red-500" />}
              label="Cancelled"
              value={orders.cancelled}
            />
            <StatBox
              icon={<AlertTriangle className="text-orange-400" />}
              label="Low Stock"
              value={products.lowStock}
            />
            <StatBox
              icon={<EyeOff className="text-gray-400" />}
              label="Hidden"
              value={products.hidden}
            />
            <StatBox
              icon={<Star className="text-yellow-400" />}
              label="Bestsellers"
              value={products.bestsellerCount}
            />
          </div>
        </div>

        {/* Right Stats */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Users & Coupons
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatBox
              icon={<Users className="text-blue-500" />}
              label="New Users (Month)"
              value={users.newThisMonth}
            />
            <StatBox
              icon={<Percent className="text-pink-500" />}
              label="Total Coupons"
              value={coupons.total}
            />
            <StatBox
              icon={<Percent className="text-green-500" />}
              label="Active Coupons"
              value={coupons.active}
            />
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Monthly Sales (Last 6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={orders.monthlySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #333",
                borderRadius: "10px",
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Top Selling Products
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-zinc-700 text-gray-400">
                <th className="text-left py-2 px-3">#</th>
                <th className="text-left py-2 px-3">Product</th>
                <th className="text-left py-2 px-3">Units Sold</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr
                  key={p._id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/60"
                >
                  <td className="py-2 px-3 text-gray-400">{i + 1}</td>
                  <td className="py-2 px-3 text-white">{p.name}</td>
                  <td className="py-2 px-3 text-blue-400 font-semibold">
                    {p.totalSold}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders & Users */}
      <div className="grid grid-cols-1 gap-6">
        {/* Recent Orders */}
        {/* Recent Orders */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Orders
          </h3>

          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-zinc-700">
                  <th className="py-2 text-left">Order ID</th>
                  <th className="py-2 text-left">User</th>
                  <th className="py-2 text-left">Amount</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 5).map((o) => (
                  <tr
                    key={o._id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/60"
                  >
                    <td className="py-2 text-gray-400 font-mono text-xs">
                      {o._id}
                    </td>
                    <td className="py-2 text-white">{o.user.name}</td>
                    <td className="py-2 text-blue-400 font-semibold">
                      ₹{o.totalAmount}
                    </td>
                    <td className="py-2">
                      <span className="text-yellow-400">{o.orderStatus}</span>
                    </td>
                    <td className="py-2 text-gray-400">
                      {formatDate(o.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Version */}
          <div className="md:hidden space-y-4">
            {recentOrders.slice(0, 5).map((o) => (
              <div
                key={o._id}
                className="p-4 bg-zinc-800 rounded-xl border border-zinc-700"
              >
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Order ID:</span>
                  <span className="text-gray-300 font-mono">{o._id}</span>
                </div>

                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">User:</span>
                  <span className="text-white">{o.user.name}</span>
                </div>

                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-blue-400 font-semibold">
                    ₹{o.totalAmount}
                  </span>
                </div>

                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-yellow-400">{o.orderStatus}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Created:</span>
                  <span className="text-gray-300">
                    {formatDate(o.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Users
          </h3>

          <div className="space-y-4">
            {recentUsers.slice(0, 5).map((u) => (
              <div
                key={u._id}
                className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-zinc-600 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900">
                    <User className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{u.name}</p>
                    <p className="text-gray-400 text-sm">{u.email}</p>
                  </div>
                </div>

                <span className="text-gray-500 text-xs font-mono hidden sm:block">
                  {u._id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------
      QUICK LINKS CARD
-------------------------------- */
const QuickLinks = ({ setActiveTab }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {[
      { label: "Manage Products", link: "products" },
      { label: "Manage Orders", link: "orders" },
      { label: "Manage Users", link: "users" },
      { label: "Coupons", link: "settings" },
    ].map((q) => (
      <button
        key={q.label}
        onClick={() => setActiveTab(q.link)}
        className="p-4 bg-zinc-800 rounded-xl border border-zinc-700 hover:bg-zinc-700 transition flex items-center justify-between w-full text-left"
      >
        <span className="text-white">{q.label}</span>
        <ArrowRight className="text-gray-400" size={18} />
      </button>
    ))}
  </div>
);

/* --------------------------------
        STAT BOX COMPONENT
-------------------------------- */
const StatBox = ({ icon, label, value }) => (
  <div className="flex flex-col items-start bg-zinc-800/60 rounded-xl p-4 border border-zinc-700 hover:border-zinc-600 transition-all">
    <div className="flex items-center gap-2 mb-2">{icon}</div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-white">{value}</p>
  </div>
);

/* --------------------------------
       DASHBOARD SKELETON UI
-------------------------------- */
const DashboardSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {/* Skeleton boxes */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-24 bg-zinc-800 rounded-2xl"></div>
      ))}
    </div>
    <div className="h-64 bg-zinc-800 rounded-2xl"></div>
    <div className="h-40 bg-zinc-800 rounded-2xl"></div>
    <div className="h-40 bg-zinc-800 rounded-2xl"></div>
  </div>
);

export default DashboardPage;
