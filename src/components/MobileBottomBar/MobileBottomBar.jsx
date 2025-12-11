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
    wishlistCount,
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

      <div
        className="
    sm:hidden 
    fixed bottom-0 left-0 w-full z-30 
    bg-black/95 backdrop-blur-xl 
    border-t border-white/10
    shadow-[0_-4px_20px_rgba(0,0,0,0.6)]
  "
      >
        <div className="flex justify-around items-center z-99999 py-2 px-4 text-white">
          {/* Home */}
          <button
            onClick={handleHomeClick}
            className="group flex flex-col items-center p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 w-8 h-8 rounded-xl bg-white/10 blur-md opacity-40 group-hover:opacity-70 transition-all"></div>
              <Grid className="relative w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
            </div>
          </button>

          {/* Cart */}
          <button
            onClick={handleCartClick}
            className="group relative flex flex-col items-center p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 w-8 h-8 rounded-xl bg-white/10 blur-md opacity-40 group-hover:opacity-70 transition-all"></div>
              <ShoppingCart className="relative w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
            </div>

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-[10px] px-1.5 rounded-full font-semibold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={handleWishlistClick}
            className="group relative flex flex-col items-center p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 w-8 h-8 rounded-xl bg-white/10 blur-md opacity-40 group-hover:opacity-70 transition-all"></div>
              <Heart className="relative w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
            </div>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-[10px] px-1.5 rounded-full font-semibold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account / Logout */}
          {user ? (
            // <button
            //   onClick={() => setShowLogoutConfirm(true)}
            //   className="group flex flex-col items-center p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all"
            // >
            //   <div className="relative flex items-center justify-center">
            //     <div className="absolute inset-0 w-8 h-8 rounded-xl bg-red-300/20 blur-md opacity-40 group-hover:opacity-70 transition-all"></div>
            //     <LogOut className="relative w-6 h-6 text-red-300 group-hover:text-red-200 transition-colors" />
            //   </div>
            //   <span className="text-[12px] text-white/60 mt-1">
            //     {user?.name?.split(" ")[0]}
            //   </span>
            // </button>
            <></>
          ) : (
            <button
              onClick={handleAccountClick}
              className="group flex flex-col items-center p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 w-8 h-8 rounded-xl bg-white/10 blur-md opacity-40 group-hover:opacity-70 transition-all"></div>
                <User className="relative w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
              </div>
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
