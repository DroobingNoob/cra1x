import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  Boxes,
  Settings,
  Menu,
  X,
  ArrowLeft,
  StepBack,
  MessageSquareHeart,
  Newspaper,
} from "lucide-react";
import UsersPage from "../UsersPage/ManageUsersPage";
import ManageProductsPage from "../ManageProductsPage/ManageProductsPage";
import SettingsPage from "../SettingsPage/SettingsPage";
import InventoryPage from "../InventoryPage/InventoryPage";
import { useNavigate } from "react-router-dom";
import ManageOrdersPage from "../OrdersPage/ManageOrdersPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import MessagesPage from "../MessagesPage/MessagesPage";
import NewsletterPage from "../NewsletterPage/NewsletterPage";

const tabs = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "products", name: "Manage Products", icon: Package },
  { id: "orders", name: "Orders", icon: ClipboardList },
  { id: "users", name: "Users", icon: Users },
  { id: "inventory", name: "Inventory", icon: Boxes },
  { id: "messages", name: "Messages", icon: MessageSquareHeart },
  { id: "settings", name: "Settings", icon: Settings },
  { id: "newsletter", name: "Club Members", icon: Newspaper },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const renderPage = () => {
    switch (activeTab) {
      case "products":
        return <ManageProductsPage />;
      case "users":
        return <UsersPage />;
      case "orders":
        return <ManageOrdersPage />;
      case "settings":
        return <SettingsPage />;
      case "inventory":
        return <InventoryPage />;
      case "dashboard":
        return <DashboardPage setActiveTab={setActiveTab} />;
      case "messages":
        return <MessagesPage />;
      case "newsletter":
        return <NewsletterPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-lg animate-fadeIn">
            <p className="text-4xl mb-3">🚧</p>
            <p className="text-gray-300">Feature under development</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-zinc-950 text-gray-200 overflow-hidden pt-[2rem] lg:pt-0">
      {/* Back to Site */}
      <button
        onClick={() => navigate("/home")}
        className="hidden lg:flex items-center gap-2 text-gray-400 hover:text-white absolute top-4 left-4 z-40 transition-colors duration-300"
      >
        <ArrowLeft size={20} /> Back to Site
      </button>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-5 py-4 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <LayoutDashboard size={22} className="text-blue-500" />
          <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-300 hover:text-white transition"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50 bg-zinc-900/95 border-r border-zinc-800 w-64 backdrop-blur-lg lg:w-64 transition-transform duration-300 ease-in-out flex flex-col shadow-xl`}
      >
        {/* Sidebar Header */}
        <div className="hidden lg:flex items-center gap-3 p-5 border-b border-zinc-800">
          <LayoutDashboard size={22} className="text-blue-500" />
          <span className="text-lg font-semibold text-white">Admin Panel</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-3 overflow-y-auto">
          {tabs.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === id
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-inner"
                  : "text-gray-400 hover:bg-zinc-800/70 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-5 mt-auto">
          <button
            onClick={() => {
              setActiveTab("settings");
              setSidebarOpen(false);
              navigate("/home");
            }}
            className={`flex items-center gap-3 w-full text-sm font-medium transition-colors ${
              activeTab === "settings"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <StepBack size={18} />
            <span>Back to Home</span>
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 relative transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold tracking-wide text-white">
            {tabs.find((t) => t.id === activeTab)?.name}
          </h2>
          <p className="text-sm text-gray-400">
            Welcome, <span className="text-blue-400 font-medium">Admin</span>
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-lg min-h-[70vh] transition-all duration-300 animate-fadeIn">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
