import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/config";
import {
  Loader2,
  Search,
  Eye,
  X,
  ChevronDown,
  MapPin,
  User,
  CreditCard,
  ShoppingBag,
  Percent,
  Package,
  Filter,
} from "lucide-react";
import "./ManageOrdersPage.scss";
import { toast } from "react-toastify";

const ManageOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/api/orders/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      o._id?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" || o.orderStatus?.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const statusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-600/20 text-green-400";
      case "Processing":
        return "bg-yellow-600/20 text-yellow-400";
      case "Cancelled":
        return "bg-red-600/20 text-red-400";
      case "Shipped":
        return "bg-blue-600/20 text-blue-400";
      default:
        return "bg-gray-700/20 text-gray-400";
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-400">
        <Loader2 size={28} className="animate-spin mr-2" />
        Loading orders...
      </div>
    );

  return (
    <div className="text-white animate-fadeIn space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Package size={22} className="text-blue-400" /> Manage Orders
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by email or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg w-full pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg text-sm px-3 py-2 text-gray-200 focus:outline-none focus:border-blue-500 transition"
            >
              <option>All</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table (Desktop) */}
      <div className="hidden md:block overflow-x-auto border border-zinc-800 rounded-xl shadow-xl backdrop-blur-sm bg-zinc-900/50">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-900/80 text-gray-400 uppercase text-xs tracking-wide">
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Total (₹)</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-zinc-800 hover:bg-zinc-800/40 transition-all"
              >
                <td className="px-4 py-3 font-mono text-gray-300">
                  {order._id}
                </td>
                <td className="px-4 py-3 text-gray-300">{order.user?.email}</td>
                <td className="px-4 py-3 font-semibold text-blue-400">
                  ₹{order.totalAmount}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${statusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-400 hover:text-blue-300 transition"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {/* Mobile Search + Filter Sticky */}
        <div className="sticky top-0 z-20 bg-zinc-900/90 backdrop-blur-md p-3 border-b border-zinc-800">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-2.5 text-gray-500"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search email or ID"
                className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={() =>
                setFilter((prev) => (prev === "All" ? "Filter" : "All"))
              }
              className="p-2 bg-zinc-800 border border-zinc-700 rounded-lg"
            >
              <Filter size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        {filteredOrders.map((order, idx) => (
          <div
            key={order._id}
            className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-4 shadow-lg transition-all"
          >
            {/* Header */}
            <div
              className="flex justify-between items-center"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              <div className="space-y-1">
                <p className="text-gray-300 font-medium text-base">
                  {order.user?.email}
                </p>
                <p className="text-blue-400 font-semibold text-lg">
                  ₹{order.totalAmount}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>

                <ChevronDown
                  size={20}
                  className={`mx-auto mt-2 transition-transform duration-300 ${
                    expanded === idx ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Expanded Content */}
            {expanded === idx && (
              <div className="animate-fadeIn mt-4 border-t border-zinc-800 pt-4 space-y-4">
                {/* Order Meta */}
                <div className="flex flex-col gap-2 text-sm text-gray-300">
                  <p className="flex justify-between">
                    <span className="text-gray-400">Order ID:</span>
                    <span className="font-mono">{order._id}</span>
                  </p>

                  <p className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="w-full bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Eye size={16} /> View Full Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-xl animate-slideUp">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4 text-white">
              Order Details
            </h3>

            <div className="space-y-4 text-sm text-gray-300">
              {/* Order Info */}
              {/* <div className="border border-zinc-800 rounded-lg p-3">
                <p>
                  <span className="text-gray-400">Order ID:</span>{" "}
                  {selectedOrder._id}
                </p>
                <p>
                  <span className="text-gray-400">Date:</span>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                </p>
                <p>
                  <span className="text-gray-400">Status:</span>{" "}
                  {selectedOrder.orderStatus}
                </p>
              </div> */}

              {/* Order Info (Editable Status) */}
              <div className="border border-zinc-800 rounded-lg p-3 space-y-3">
                <p>
                  <span className="text-gray-400">Order ID:</span>{" "}
                  {selectedOrder._id}
                </p>
                <p>
                  <span className="text-gray-400">Date:</span>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                </p>
                <p>
                  <span className="text-gray-400">Payment Method:</span>{" "}
                  {selectedOrder.paymentMethod
                    ? selectedOrder.paymentMethod === "COD"
                      ? "Cash on Delivery (COD)"
                      : "Prepaid"
                    : "Prepaid"}
                </p>

                {/* Editable Order Status */}
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">Status:</span>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) =>
                      setSelectedOrder((prev) => ({
                        ...prev,
                        orderStatus: e.target.value,
                      }))
                    }
                    className="bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <button
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token");
                      const res = await fetch(
                        `${BASE_URL}/api/orders/${selectedOrder._id}/status`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            orderStatus: selectedOrder.orderStatus,
                          }),
                        }
                      );

                      if (!res.ok) throw new Error("Failed to update status");

                      // Update UI immediately
                      setOrders((prev) =>
                        prev.map((o) =>
                          o._id === selectedOrder._id
                            ? { ...o, orderStatus: selectedOrder.orderStatus }
                            : o
                        )
                      );
                      toast.success("Order status updated successfully!");
                    } catch (err) {
                      toast.error("Failed to update order status");
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-500 transition text-sm px-3 py-1.5 rounded-md text-white mt-2"
                >
                  Save Changes
                </button>
              </div>

              {/* Customer */}
              <div className="border border-zinc-800 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <User size={16} className="text-blue-400" />
                  <h4 className="font-medium text-white">Customer</h4>
                </div>
                <p>{selectedOrder.user?.name}</p>
                <p>{selectedOrder.user?.email}</p>
              </div>

              {/* Shipping */}
              <div className="border border-zinc-800 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-blue-400" />
                  <h4 className="font-medium text-white">Shipping Address</h4>
                </div>
                <p>{selectedOrder.shippingAddress?.fullName}</p>
                <p>
                  {selectedOrder.shippingAddress?.address},{" "}
                  {selectedOrder.shippingAddress?.apartment}
                </p>
                <p>
                  {selectedOrder.shippingAddress?.city},{" "}
                  {selectedOrder.shippingAddress?.state} -{" "}
                  {selectedOrder.shippingAddress?.pinCode}
                </p>
                <p>📞 {selectedOrder.shippingAddress?.phone}</p>
              </div>

              {/* Payment */}
              <div className="border border-zinc-800 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={16} className="text-blue-400" />
                  <h4 className="font-medium text-white">Payment</h4>
                </div>
                <p>
                  <span className="text-gray-400">Payment ID:</span>{" "}
                  {selectedOrder.paymentInfo?.razorpay_payment_id}
                </p>
                <p>
                  <span className="text-gray-400">
                    Total Amount to be Paid:
                  </span>{" "}
                  ₹{selectedOrder.totalAmount}
                </p>
                <p>
                  <span className="text-gray-400">Amount Paid:</span> ₹
                  {selectedOrder.paymentInfo?.amountPaid}
                </p>
                <p>
                  <span className="text-gray-400">Status:</span>{" "}
                  {selectedOrder.paymentInfo?.status}
                </p>
              </div>

              {/* Promo */}
              {selectedOrder.promoCode && (
                <div className="border border-zinc-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent size={16} className="text-blue-400" />
                    <h4 className="font-medium text-white">Promo Applied</h4>
                  </div>
                  <p>
                    <span className="text-gray-400">Code:</span>{" "}
                    {selectedOrder.promoCode?.code}
                  </p>
                  <p>
                    <span className="text-gray-400">Discount:</span>
                    {selectedOrder.promoCode?.discount}%
                  </p>
                </div>
              )}

              {/* Items */}
              <div className="border border-zinc-800 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag size={16} className="text-blue-400" />
                  <h4 className="font-medium text-white">Items</h4>
                </div>
                <div className="divide-y divide-zinc-800">
                  {selectedOrder.orderItems.map((item) => (
                    <div key={item._id} className="flex justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-100">{item.name}</p>
                        <p className="text-xs text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm text-gray-300">₹{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrdersPage;
