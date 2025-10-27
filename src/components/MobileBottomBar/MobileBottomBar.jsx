import React from "react";
import { ShoppingCart, Heart, User, Grid } from "lucide-react";
import { useNavigate } from "react-router-dom"; // if you use react-router

const MobileBottomBar = () => {
  const navigate = useNavigate();

  // Placeholder click handlers
  const handleHomeClick = () => {
    navigate("/products"); // Navigate to homepage or grid
  };

  const handleCartClick = () => {
    navigate("/cart"); // Navigate to cart page
  };

  const handleWishlistClick = () => {
    navigate("/wishlist"); // Navigate to wishlist
  };

  const handleAccountClick = () => {
    navigate("/account"); // Navigate to user account/profile
  };

  return (
    <div className="sm:hidden fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-30">
      {/* Frosted glass background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg pointer-events-none"></div>

      {/* Icons container */}
      <div className="relative flex justify-around items-center py-3 px-5 rounded-full text-white">
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center text-white hover:text-zinc-300 transition-all"
        >
          <Grid className="w-6 h-6 mb-1" />
        </button>

        <button
          onClick={handleCartClick}
          className="flex flex-col items-center text-white hover:text-zinc-300 transition-all relative"
        >
          <ShoppingCart className="w-6 h-6 mb-1" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-[10px] px-1 rounded-full">
            0
          </span>
        </button>

        <button
          onClick={handleWishlistClick}
          className="flex flex-col items-center text-white hover:text-zinc-300 transition-all"
        >
          <Heart className="w-6 h-6 mb-1" />
        </button>

        <button
          onClick={handleAccountClick}
          className="flex flex-col items-center text-white hover:text-zinc-300 transition-all"
        >
          <User className="w-6 h-6 mb-1" />
        </button>
      </div>
    </div>
  );
};

export default MobileBottomBar;
