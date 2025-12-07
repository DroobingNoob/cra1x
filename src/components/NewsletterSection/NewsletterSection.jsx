import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config/config";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const val = e.target.value;
    setEmail(val);

    if (val.length === 0) {
      setError(false);
      return;
    }

    setError(!emailRegex.test(val));
  };

  const handleSubscribe = async () => {
    if (error || !email) return;

    try {
      const res = await fetch(`${BASE_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Subscription failed. Try again.");
        return;
      }

      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      toast.error("Subscription failed. Try again.");
    }
  };

  return (
    <section className="relative max-w-3xl mx-auto px-5 py-24 text-white">
      {/* Floating glow background element */}
      <div className="absolute inset-0 mx-auto max-w-xl blur-[120px] opacity-20 bg-purple-600 -z-10"></div>

      <h2 className="text-4xl md:text-6xl font-black goth-font text-center mb-4 select-none">
        Join the Newsletter
      </h2>

      <p className="text-gray-400 font-mono text-center text-sm md:text-base mb-12 max-w-xl mx-auto">
        Get exclusive drops, early-bird offers and secret deals straight to your
        inbox.
      </p>

      {/* Neon animated border wrapper */}
      <div className="relative max-w-2xl mx-auto rounded-2xl p-[2px] bg-gradient-to-br from-white/10 via-purple-500/20 to-white/10 animate-borderGlow">
        <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-white/10">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full bg-black/60 border rounded-xl py-3 px-4 
                text-white placeholder-gray-500 font-mono text-sm md:text-base
                focus:outline-none transition
                ${
                  error
                    ? "border-red-500 focus:border-red-500 shadow-[0_0_8px_#ff0000]"
                    : "border-white/20 focus:border-white/40"
                }`}
            />

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              disabled={error || !email}
              className={`px-8 py-3 rounded-xl font-mono text-sm md:text-base
                border transition
                ${
                  error || !email
                    ? "bg-white/10 border-white/20 cursor-not-allowed opacity-50"
                    : "bg-gradient-to-r from-purple-500/40 to-purple-300/40 hover:from-purple-500/60 hover:to-purple-300/60 border-purple-400/20"
                }`}
            >
              Subscribe
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-xs md:text-sm font-mono mt-3 text-center">
              Enter a valid email.
            </p>
          )}
        </div>
      </div>

      <div className="w-full mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Border animation keyframes */}
      <style>{`
        @keyframes borderGlow {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .animate-borderGlow {
          animation: borderGlow 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default NewsletterSection;
