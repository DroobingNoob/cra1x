import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Package, Loader2, CheckCircle, Clock, XCircle } from "lucide-react";
import { BASE_URL } from "../config/config";

const MyOrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/api/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setOrders(data || []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 text-lg">
        Please log in to view your orders.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-white" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Package className="w-12 h-12 mb-4 opacity-60" />
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-8 md:px-16">
      <h1 className="text-3xl font-bold mb-10 text-center font-mono tracking-wide">
        My Orders
      </h1>

      <div className="space-y-8">
        {orders.map((order) => {
          const statusColor =
            order.orderStatus === "Delivered"
              ? "bg-green-500/20 text-green-300"
              : order.orderStatus === "Processing"
              ? "bg-yellow-500/20 text-yellow-300"
              : "bg-gray-500/20 text-gray-300";

          const StatusIcon =
            order.orderStatus === "Delivered"
              ? CheckCircle
              : order.orderStatus === "Processing"
              ? Clock
              : XCircle;

          return (
            <div
              key={order._id}
              className="relative border border-white/10 bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-6 shadow-xl transition-transform duration-300 hover:scale-[1.01]"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <p className="font-semibold text-lg">
                    Order #
                    {order._id
                      // .slice(-6)
                      .toUpperCase()}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
                >
                  <StatusIcon size={14} /> {order.orderStatus}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2 mb-5">
                {order.orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
                  >
                    <span className="text-gray-200">{item.name}</span>
                    <span className="text-gray-300">
                      ₹{item.price} × {item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-white/5 rounded-lg p-4 mb-5 text-sm text-gray-300">
                <p className="mb-1">
                  <span className="font-semibold">Total:</span> ₹
                  {order.totalAmount}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {order.paymentMethod
                    ? order.paymentMethod === "COD"
                      ? "Cash on Delivery (COD)"
                      : "Prepaid"
                    : "Prepaid"}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Payment:</span>{" "}
                  {order.paymentInfo?.status === "Paid" ? (
                    <span className="text-green-400">
                      Paid (ID: {order.paymentInfo.razorpay_payment_id})
                    </span>
                  ) : (
                    <span className="text-yellow-400">Pending</span>
                  )}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">
                    Payment to be made at COD:
                  </span>{" "}
                  {order.paymentMethod === "COD" ? (
                    <span>₹{order?.amountRemaining}</span>
                  ) : (
                    <span className="text-yellow-400">Pending</span>
                  )}
                </p>

                {order.promoCode && (
                  <p className="mb-1">
                    <span className="font-semibold">Promo Applied:</span>{" "}
                    {order.promoCode.code} (-{order.promoCode.discount}%)
                  </p>
                )}
              </div>

              {/* Shipping Info */}
              <div className="text-sm text-gray-400">
                <p className="font-semibold text-gray-300 mb-1">
                  Shipping Address
                </p>
                <p>{order.shippingAddress.fullName}</p>
                <p>
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.apartment}
                </p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pinCode}
                </p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>

              {/* Footer */}
              <div className="mt-5 text-xs text-gray-500 text-right">
                Last updated: {new Date(order.updatedAt).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrdersPage;
