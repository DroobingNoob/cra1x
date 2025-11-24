// src/pages/ThankYouPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    paymentId,
    total,
    name,
    paymentMethod,
    codFee = 100, // default
  } = state || {};

  const isCOD = paymentMethod === "COD";
  const remainingCODAmount = isCOD ? total - codFee : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-6 text-center">
      <CheckCircle2 size={80} className="text-green-500 mb-6" />

      <h1 className="text-3xl font-bold mb-3">
        Thank You for Shopping with Us!
      </h1>

      <p className="text-gray-400 mb-6">
        {name
          ? `Dear ${name}, your order has been placed successfully.`
          : "Your order has been placed successfully."}
      </p>

      {/* Payment ID Box */}
      {paymentId && (
        <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-xl mb-6">
          <p className="text-sm text-gray-400 mb-1">Payment ID</p>
          <p className="text-lg font-semibold">{paymentId}</p>
        </div>
      )}

      {/* Amount Details */}
      {!isCOD && (
        <p className="text-xl font-semibold text-white mb-8">
          Amount Paid: ₹{total?.toLocaleString()}
        </p>
      )}

      {/* COD Layout */}
      {isCOD && (
        <div className="bg-zinc-900 border border-zinc-800 px-6 py-5 rounded-xl mb-8 w-full max-w-md">
          <p className="text-lg font-semibold mb-4 text-green-400">
            Cash on Delivery Confirmed
          </p>

          <div className="flex justify-between mb-2">
            <span className="text-gray-400">COD Confirmation Fee Paid:</span>
            <span className="font-semibold">₹{codFee}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Total Order Amount:</span>
            <span className="font-semibold">₹{total?.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mt-3 pt-3 border-t border-zinc-800">
            <span className="text-gray-300">Amount Payable on Delivery:</span>
            <span className="font-bold text-white text-lg">
              ₹{total.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="px-8 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 font-semibold transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default ThankYouPage;
