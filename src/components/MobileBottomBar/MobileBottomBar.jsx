import React from "react";
import { ShoppingCart, Heart, User, Grid } from "lucide-react";

const MobileBottomBar = () => {
  return (
    <div className="sm:hidden fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[50]">
      {/* Frosted glass background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg pointer-events-none"></div>

      {/* Icons container */}
      <div className="relative flex justify-around items-center py-3 px-5 rounded-full text-white">
        <button className="flex flex-col items-center text-white hover:text-zinc-300 transition-all">
          <Grid className="w-6 h-6 mb-1" />
        </button>
        <button className="flex flex-col items-center text-white hover:text-zinc-300 transition-all relative">
          <ShoppingCart className="w-6 h-6 mb-1" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-[10px] px-1 rounded-full">
            0
          </span>
        </button>
        <button className="flex flex-col items-center text-white hover:text-zinc-300 transition-all">
          <Heart className="w-6 h-6 mb-1" />
        </button>
        <button className="flex flex-col items-center text-white hover:text-zinc-300 transition-all">
          <User className="w-6 h-6 mb-1" />
        </button>
      </div>
    </div>
  );
};

export default MobileBottomBar;
