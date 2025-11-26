// src/components/LoginModal/LoginModal.jsx
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config/config";

const LoginModal = ({ onClose }) => {
  const {
    setUser,
    setCartItems,
    setCartCount,
    setWishlistItems,
    setWishlistCount,
  } = useAuth();

  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // ✅ Fetch user + cart
      const fetchData = async () => {
        try {
          const [userRes, cartRes, wishlistRes] = await Promise.all([
            fetch(`${BASE_URL}/auth/me`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${BASE_URL}/cart`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${BASE_URL}/wishlist`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          const userData = await userRes.json();
          const cartData = await cartRes.json();
          const wishlistData = await wishlistRes.json();

          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
          setCartItems(cartData.items || []);
          setCartCount(cartData.items?.length || 0);
          setWishlistItems(wishlistData.items || []);
          setWishlistCount(wishlistData.items?.length || 0);

          // remove ?token= from URL
          window.history.replaceState({}, document.title, "/");
          window.location.href = "/";
        } catch (err) {}
      };

      fetchData();
      onClose();
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-6 w-[90%] max-w-sm text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-all text-white py-3 px-4 rounded-xl w-full font-medium"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-xs text-center mt-4 text-white/60">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
