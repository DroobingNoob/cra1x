import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/config";
import "./../context/AuthContext.jsx";

const RAZORPAY_KEY = "rzp_test_Re68e770KWRjbU"; // ✅ your Razorpay test key

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems = [], user, setCartCount, setCartItems } = useAuth();

  const [step, setStep] = useState(1);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Prepaid");
  const COD_FEE = 100;

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalAmount); // include delivery charge
  }, [cartItems]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkoutData"));
    if (data) {
      setAppliedCoupon(data.appliedCoupon);
      setTotal(data.totalAfterDiscount);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    const { fullName, email, address, city, state, pinCode, phone } = formData;
    if (
      !fullName ||
      !email ||
      !address ||
      !city ||
      !state ||
      !pinCode ||
      !phone
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setStep(2);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your internet connection."
      );
      return;
    }

    const amountToPay = paymentMethod === "Prepaid" ? total : COD_FEE;

    const options = {
      key: RAZORPAY_KEY,
      amount: amountToPay * 100, // amount in paise
      currency: "INR",
      name: "CRA1X Store",
      description:
        paymentMethod === "Prepaid" ? "Order Payment" : "COD Confirmation Fee",
      image: "/logo.png",
      handler: async function (response) {
        try {
          const paymentId = response.razorpay_payment_id;

          // ✅ Step 1: Prepare order data
          const orderData = {
            orderItems: cartItems.map((item) => ({
              productId: item.productId,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
            shippingAddress: {
              fullName: formData.fullName,
              email: formData.email,
              address: formData.address,
              apartment: formData.apartment,
              city: formData.city,
              state: formData.state,
              pinCode: formData.pinCode,
              phone: formData.phone,
            },
            paymentMethod,
            paymentInfo: {
              razorpay_payment_id: paymentId,
              amountPaid: amountToPay,
              status: "Paid",
            },
            promoCode: appliedCoupon
              ? {
                  code: appliedCoupon.code,
                  discount: appliedCoupon.discount,
                }
              : null,
            totalAmount: total,
            ...(paymentMethod === "COD" && {
              codFee: COD_FEE,
            }),
          };

          const token = localStorage.getItem("token");

          // ✅ Step 2: Save order to backend
          const orderRes = await fetch(`${BASE_URL}/orders/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
          });

          if (!orderRes.ok) {
            throw new Error("Failed to save order in database");
          }

          // ✅ Step 3: Update product stock in backend
          await Promise.all(
            cartItems.map((item) =>
              fetch(`${BASE_URL}/products/${item.productId}/decrement-stock`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ quantity: item.quantity }),
              })
            )
          );

          // ✅ Step 4: Clear cart (both localStorage + context)
          localStorage.removeItem("cartItems");
          setCartCount(0);
          setCartItems([]);

          if (typeof window !== "undefined") {
            const event = new Event("cartUpdated"); // optional if your context listens for updates
            window.dispatchEvent(event);
          }

          toast.success(
            paymentMethod === "Prepaid"
              ? "Payment successful! Order placed."
              : "COD confirmed! Order placed."
          );

          // ✅ Step 5: Redirect
          navigate("/thank-you", {
            state: {
              paymentId,
              total,
              name: formData.fullName,
              paymentMethod,
            },
          });
        } catch (err) {
          toast.error("Payment succeeded but order or stock update failed!");
        }
      },

      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: formData.address,
      },
      theme: {
        color: paymentMethod === "COD" ? "#16a34a" : "#2563eb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Step indicator UI
  const StepIndicator = () => {
    const steps = ["Shipping", "Review", "Payment"];
    return (
      <div className="flex justify-between items-center mb-10">
        {steps.map((label, index) => (
          <div key={index} className="flex items-center flex-1">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold text-sm ${
                step > index + 1
                  ? "bg-blue-600 border-blue-600 text-white"
                  : step === index + 1
                  ? "border-blue-600 text-blue-600"
                  : "border-gray-600 text-gray-500"
              }`}
            >
              {step > index + 1 ? <CheckCircle2 size={18} /> : index + 1}
            </div>
            <p
              className={`ml-3 text-sm ${
                step === index + 1
                  ? "text-white"
                  : step > index + 1
                  ? "text-blue-400"
                  : "text-gray-400"
              }`}
            >
              {label}
            </p>
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-gray-700 mx-3"></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Cart
      </button>

      <h1 className="text-2xl font-semibold mb-8 text-white/90">Checkout</h1>

      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-lg">
        <StepIndicator />

        {/* Step 1 - Shipping */}
        {step === 1 && (
          <div className="grid gap-4">
            {[
              { label: "Full Name", name: "fullName", required: true },
              { label: "Email Address", name: "email", required: true },
              { label: "Address", name: "address", required: true },
              { label: "Apartment / Suite (optional)", name: "apartment" },
              { label: "City", name: "city", required: true },
              { label: "State", name: "state", required: true },
              { label: "PIN Code", name: "pinCode", required: true },
              { label: "Phone", name: "phone", required: true },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-400 mb-1 text-sm">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            ))}

            <button
              onClick={handleContinue}
              className="w-full mt-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Continue to Review
            </button>
          </div>
        )}

        {/* Step 2 - Review Order */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center border-b border-zinc-800 pb-2"
                >
                  <div>
                    <p className="text-white/90">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <span className="font-semibold text-white">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-4">
              {appliedCoupon && (
                <div className="flex justify-between text-green-400 mb-2">
                  <span>Coupon Applied: {appliedCoupon.code}</span>
                  <span>- {appliedCoupon.discount}%</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold text-white">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-xl border border-zinc-700 text-gray-400 hover:bg-zinc-800 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 font-semibold transition-all"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Payment */}
        {step === 3 && (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-6">
              Select Payment Method
            </h2>

            <div className="grid gap-4 max-w-md mx-auto mb-10">
              {/* Prepaid */}
              <div
                onClick={() => setPaymentMethod("Prepaid")}
                className={`p-4 rounded-xl border cursor-pointer transition 
        ${
          paymentMethod === "Prepaid"
            ? "border-blue-600 bg-blue-600/20"
            : "border-zinc-700"
        }`}
              >
                <p className="text-lg font-semibold">
                  Prepaid (Online Payment)
                </p>
                <p className="text-gray-400 text-sm">Pay full amount now</p>
              </div>

              {/* COD */}
              <div
                onClick={() => setPaymentMethod("COD")}
                className={`p-4 rounded-xl border cursor-pointer transition 
        ${
          paymentMethod === "COD"
            ? "border-green-600 bg-green-600/20"
            : "border-zinc-700"
        }`}
              >
                <p className="text-lg font-semibold">Cash on Delivery</p>
                <p className="text-gray-400 text-sm">
                  Pay ₹100 non-refundable confirmation fee now, ₹{total} on
                  delivery
                </p>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="px-10 py-4 bg-green-600 rounded-xl hover:bg-green-700 font-semibold text-lg transition-all"
            >
              {paymentMethod === "Prepaid"
                ? `Pay ₹${total.toLocaleString()} Securely`
                : `Pay ₹${COD_FEE} to Confirm COD`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
