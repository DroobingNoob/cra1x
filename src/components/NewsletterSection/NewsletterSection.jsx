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
        setSuccess("");
        return;
      }

      // Success UI
      setSuccess("You're in! Welcome to the Coven. 🖤");
      toast.success("Subscribed to newsletter successfully!");
      setEmail("");
    } catch (err) {
      toast.error(data.message || "Subscription failed. Try again.");
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-5 py-16 md:py-24 text-white relative z-10">
      <h2 className="text-3xl md:text-6xl font-black goth-font text-glow text-center mb-6 select-none">
        Join the Coven
      </h2>

      <p className="text-gray-400 font-mono text-center text-sm md:text-base mb-10 md:mb-12 max-w-xl mx-auto">
        Get access to exclusive drops, secret deals and new releases.
      </p>

      <div className="bg-black/70 border border-gray-700 rounded-xl shadow-2xl p-6 md:p-8 backdrop-blur-md max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col sm:flex-row items-center gap-4 relative">
          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Don't be shy 💀"
            className={`w-full bg-black/60 border rounded-lg py-3 pl-3 pr-4
              text-white placeholder-gray-500 font-mono text-sm md:text-base
              focus:outline-none transition
              ${
                error
                  ? "border-red-500 focus:border-red-500 shadow-[0_0_8px_#ff0000]"
                  : "border-gray-700 focus:border-white/40"
              }`}
          />

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            disabled={error || !email}
            className={`whitespace-nowrap px-6 py-3 rounded-lg font-mono text-sm md:text-base
              border transition
              ${
                error || !email
                  ? "bg-white/10 border-white/20 cursor-not-allowed opacity-70 hover:opacity-70"
                  : "bg-white/10 hover:bg-white/20 border-white/10"
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

      <div className="w-full mt-12 md:mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </section>
  );
};

export default NewsletterSection;
