import React, { useEffect, useState } from "react";
import { X, Copy } from "lucide-react";
import { toast } from "react-toastify";
import cra1x from "../../assets/images/cra1x-logo-background-removed.png";
import { BASE_URL } from "../../config/config";

const NewsletterPopup = ({ onOpen }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const COUPON_CODE = "cra1x-club";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Show popup after 5 seconds
  useEffect(() => {
    const shown = sessionStorage.getItem("newsletterPopupShown");
    if (shown) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("newsletterPopupShown", "true");
      onOpen?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Disable scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (val.length === 0) {
      setError(false);
      return;
    }
    setError(!emailRegex.test(val));
  };

  // Handle backend subscribe request
  const handleSubscribe = async () => {
    if (error || !email || loading) return;

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Subscription failed. Try again.");
        setLoading(false);
        return;
      }

      toast.success("Subscribed successfully!");

      // Switch to success mode instead of closing
      setSuccess(true);
      setEmail("");
    } catch (err) {
      toast.error("Subscription failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Dim background */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={() => setOpen(false)}
      />

      {/* Soft glow background */}
      <div className="absolute w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full" />

      {/* Modal */}
      <div
        className="
          relative p-8 w-[90%] max-w-sm rounded-2xl
          bg-gradient-to-b from-zinc-900 to-black
          border border-white/10 shadow-2xl animate-popIn
        "
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <X size={22} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={cra1x}
            alt="CRA1X"
            className="w-20 drop-shadow-[0_0_18px_rgba(255,255,255,0.3)]"
          />
        </div>

        {/* ─────────────────────────── */}
        {/* SUCCESS STATE */}
        {/* ─────────────────────────── */}

        {success ? (
          <div className="text-center animate-popIn">
            <h2 className="text-2xl font-black goth-font text-white mb-3">
              You're in the Club 🔥
            </h2>

            <p className="text-gray-300 text-sm mb-4">
              Here’s your exclusive 10% OFF code.
            </p>

            {/* Coupon Code Box */}
            <div
              className="
              bg-black/40 border border-white/20 rounded-xl p-4 mb-4
              flex justify-between items-center
              shadow-[0_0_20px_rgba(255,255,255,0.15)]
            "
            >
              <span className="font-mono text-lg text-white tracking-wider">
                {COUPON_CODE}
              </span>

              <button
                onClick={copyCoupon}
                className="text-white/60 hover:text-white transition"
              >
                <Copy size={20} />
              </button>
            </div>

            {copied && <p className="text-green-400 text-xs mb-2">Copied!</p>}

            <p className="text-gray-400 text-xs">
              Use this code during checkout.
            </p>
          </div>
        ) : (
          <>
            {/* BEFORE SUCCESS: Subscription Form */}

            <p className="text-xs text-center tracking-[0.25em] text-gray-400 uppercase mb-2">
              Exclusive Access
            </p>

            <h2 className="text-3xl font-black goth-font text-center text-white leading-tight mb-2">
              Join CRA1XB1TCH CLUB
            </h2>

            <h3 className="text-xl font-black goth-font text-center text-white mb-4">
              Get 10% OFF
            </h3>

            <p className="text-gray-300 text-center text-sm mb-6">
              Subscribe now to unlock your instant discount code.
            </p>

            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Your email"
              className={`
                w-full bg-black/40 border rounded-lg px-4 py-3 text-white
                focus:outline-none transition
                ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/20 focus:border-white/60"
                }
              `}
            />

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-xs mt-2 text-center">
                Enter a valid email.
              </p>
            )}

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              disabled={error || !email || loading}
              className={`
                w-full mt-4 py-3 rounded-lg font-bold transition
                shadow-[0_0_25px_rgba(255,255,255,0.25)]
                ${
                  error || !email || loading
                    ? "bg-white/10 text-white/40 cursor-not-allowed"
                    : "bg-white text-black hover:bg-zinc-200"
                }
              `}
            >
              {loading ? "Please wait..." : "Claim Your 10% OFF"}
            </button>
          </>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.85) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-popIn { animation: popIn 0.3s ease-out; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default NewsletterPopup;
