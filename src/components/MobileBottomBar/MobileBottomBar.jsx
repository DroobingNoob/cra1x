import React, { useState } from "react";
import { ShoppingCart, Heart, User, Grid, LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const MobileBottomBar = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const {
    user,
    setUser,
    cartCount,
    setCartItems,
    setCartCount,
    setWishlistItems,
    setWishlistCount,
  } = useAuth();

  const handleHomeClick = () => navigate("/products");
  const handleCartClick = () => navigate("/cart");
  const handleWishlistClick = () => navigate("/wishlist");

  const handleAccountClick = () => {
    if (user) {
      setShowLogoutConfirm(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCartItems([]);
    setCartCount(0);
    setWishlistItems([]);
    setWishlistCount(0);
    setShowLogoutConfirm(false);
    toast.success("Logged out successfully");
    navigate("/home");
  };

  return (
    <>
      {/* Bottom Bar */}
      <div className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-30 flex flex-col items-center">
        {/* Subtle frosted glass background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-md pointer-events-none"></div>

        {/* Icons */}
        {/* <div className="relative flex justify-around items-center py-2.5 px-5 rounded-full text-white w-full"> */}
        <div className="relative flex justify-around items-center py-1 px-2 rounded-full text-white w-full">
          {/* Home */}
          <button
            onClick={handleHomeClick}
            className="group flex flex-col items-center hover:bg-white/5 active:bg-white/10 p-2 rounded-full transition-all"
          >
            <Grid className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </button>

          {/* Cart */}
          <button
            onClick={handleCartClick}
            className="group relative flex flex-col items-center hover:bg-white/5 active:bg-white/10 p-2 rounded-full transition-all"
          >
            <ShoppingCart className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />

            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-[10px] px-1.5 rounded-full font-semibold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={handleWishlistClick}
            className="group relative flex flex-col items-center hover:bg-white/5 active:bg-white/10 p-2 rounded-full transition-all"
          >
            <Heart className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </button>

          {/* Account / Logout */}
          {user ? (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="group flex flex-col items-center hover:bg-white/5 active:bg-white/10 p-2 rounded-full transition-all"
            >
              <LogOut className="w-5 h-5 text-red-300 group-hover:text-red-200 transition-colors" />
              <span className="text-[11px] text-white/60 mt-0.5">
                {user?.name?.split(" ")[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={handleAccountClick}
              className="group flex flex-col items-center hover:bg-white/5 active:bg-white/10 p-2 rounded-full transition-all"
            >
              <User className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-6 w-[90%] max-w-sm text-white text-center animate-fadeIn">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute top-3 right-3 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Log out?</h2>
            <p className="text-sm text-white/70 mb-6">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBottomBar;
