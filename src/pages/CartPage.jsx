import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/config";

const CartPage = () => {
  const { cartItems = [], setCartItems } = useAuth();
  const [total, setTotal] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [couponInput, setCouponInput] = useState("");
  const [message, setMessage] = useState("");
  const { fetchUserCart, updateCartItem, removeCartItem } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchUserCart(token);
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${BASE_URL}/coupons`);
      const data = await res.json();
      setCoupons(data);
    } catch (error) {}
  };

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cartItems]);

  const handleQuantityChange = (itemId, change) => {
    setAppliedCoupon(null);
    setDiscount(0);
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity + change);
    if (newQuantity > item.stock) {
      toast.error(`Only ${item.stock} left in stock`);
      return;
    }
    updateCartItem(item.id, newQuantity);
  };

  const handleRemove = (productId) => {
    removeCartItem(productId);
    setDiscount(0);
    setAppliedCoupon(null);
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) {
      setMessage("⚠️ Please enter a coupon code.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/coupons/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponCode: couponInput.trim(),
          cartTotal: total,
        }),
      });

      const data = await res.json();

      if (!data.valid) {
        setAppliedCoupon(null);
        setDiscount(0);
        setMessage(`❌ ${data.message}`);
        return;
      }

      // Coupon is valid ✅
      setAppliedCoupon(data.coupon);
      setDiscount(data.discountValue);
      setMessage(`🎉 ${data.message}`);
    } catch (error) {
      setMessage("⚠️ Something went wrong applying the coupon.");
    }
  };

  const eligibleCoupons = coupons.filter(
    (c) =>
      new Date() >= new Date(c.validFrom) &&
      new Date() <= new Date(c.expiry) &&
      total >= (c.minimumAmountValue || 0)
  );

  const discountAmount = discount;
  const totalAfterDiscount = Math.max(0, total - discountAmount);
  // discount is numeric already capped by backend

  const handleProceedToCheckout = async () => {
    for (const item of cartItems) {
      if (item.quantity > item.stock) {
        toast.error(
          `Only ${item.stock} left for ${item.name}. Update your cart.`
        );
        return;
      }
    }
    // Build the payload
    const payload = {
      cartTotal: total,
      couponCode: appliedCoupon?.code || null,
    };

    try {
      // Revalidate the coupon on server (optional but secure)
      let verifiedCoupon = null;
      if (payload.couponCode) {
        const res = await fetch(`${BASE_URL}/coupons/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (!data.valid) {
          toast.error("Coupon code invalid or expired. Please reapply.");
          return;
        }
        verifiedCoupon = data.coupon;
      }

      // Save checkout data securely
      const checkoutData = {
        total,
        totalAfterDiscount,
        appliedCoupon: verifiedCoupon,
      };

      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

      navigate("/checkout");
    } catch (error) {
      toast.error("Something went wrong while verifying your coupon.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-9">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
          <p className="text-xl mb-2">🛒 Your cart is empty</p>
          <p className="text-sm text-gray-500">Browse products to continue</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SECTION — ITEMS + COUPONS */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition-all"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-400 line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-3 text-blue-400 font-semibold text-lg">
                      ₹{item.price.toLocaleString()}
                    </div>
                    {item.stock <= 5 && (
                      <p className="text-red-400 text-xs mt-1">
                        {item.stock === 0
                          ? "Out of Stock"
                          : `Only ${item.stock} left`}
                      </p>
                    )}
                  </div>

                  {/* Qty + Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="flex items-center gap-3 bg-zinc-800/60 px-3 py-2 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2 text-lg hover:text-gray-300"
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        disabled={item.quantity >= item.stock}
                        className={`px-2 text-lg ${
                          item.quantity >= item.stock
                            ? "text-gray-500 cursor-not-allowed"
                            : "hover:text-gray-300"
                        }`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>

              {!appliedCoupon ? (
                <>
                  {/* Input */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-zinc-950 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg"
                    >
                      Apply
                    </button>
                  </div>

                  {message && (
                    <p className="text-sm text-gray-400 mt-2">{message}</p>
                  )}

                  {/* Eligible Coupons */}
                  <div className="mt-6">
                    {eligibleCoupons.length > 0 && (
                      <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-2">
                        Eligible Coupons
                      </h3>
                    )}
                    {/* <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-2">
                      Available Coupons
                    </h3> */}

                    <div className="flex flex-wrap gap-3">
                      {eligibleCoupons.map((c) => (
                        <div
                          key={c._id}
                          onClick={() => setCouponInput(c.code)}
                          className="px-4 py-3 rounded-lg border border-zinc-700 hover:bg-blue-600 hover:border-blue-500 hover:text-white cursor-pointer transition-all"
                        >
                          <div className="font-semibold flex justify-between">
                            {c.code}
                          </div>
                          <div className="text-xs text-gray-400">
                            {c.discount}% off • Min ₹{c.minimumAmountValue}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between bg-zinc-950 border border-blue-600 rounded-xl p-4 shadow-lg">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">
                      🎉 {appliedCoupon.code}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {appliedCoupon.discount}% off (Max ₹
                      {appliedCoupon.maxAmount})
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setAppliedCoupon(null);
                      setCouponInput("");
                      setDiscount(0);
                      setMessage("");
                    }}
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SECTION — SUMMARY */}
          <div className="lg:sticky lg:top-20 h-fit bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-green-400">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>- ₹{discount.toLocaleString()}</span>
                </div>
              )}

              <hr className="border-zinc-800 my-3" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{totalAfterDiscount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full mt-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 font-semibold transition shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
