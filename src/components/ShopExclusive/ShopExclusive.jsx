import React from "react";
import belt from "../../assets/images/belt.png";
import grillz from "../../assets/images/grillz.png";
import keychain from "../../assets/images/keychain.png";
import keychain1 from "../../assets/images/keychain1.png";
import leatherbag from "../../assets/images/leather-bag.png";
import neckpiece from "../../assets/images/neck-piece.png";
import "./ShopExclusive.scss";

const ShopExclusive = () => {
  return (
    <section className="relative min-h-[100vh] bg-zinc-950 text-white flex items-center justify-center font overflow-hidden mt-16">
      {/* --- Floating Images --- */}

      {/* Top Left */}
      <div className="absolute top-[10%] left-[8%] rotate-[-8deg]">
        <img
          src={belt}
          alt="belt"
          className="w-[160px] md:w-[200px] grayscale hover:grayscale-0 brightness-[0.8] hover:brightness-100 transition-all duration-500"
        />
      </div>

      {/* Top Right */}
      <div className="absolute top-[12%] right-[10%] rotate-[5deg]">
        <img
          src={grillz}
          alt="grillz"
          className="w-[150px] md:w-[190px] grayscale hover:grayscale-0 brightness-[0.85] hover:brightness-105 transition-all duration-500"
        />
      </div>

      {/* Left Mid */}
      <div className="absolute top-[40%] left-[6%] rotate-[-4deg]">
        <img
          src={keychain}
          alt="keychain"
          className="w-[130px] md:w-[160px] opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-105"
        />
      </div>

      {/* Right Mid */}
      <div className="absolute top-[35%] right-[6%] rotate-[7deg]">
        <img
          src={leatherbag}
          alt="leatherbag"
          className="w-[190px] md:w-[220px] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110"
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-[8%] left-[18%] rotate-[3deg]">
        <img
          src={neckpiece}
          alt="neckpiece"
          className="w-[170px] md:w-[210px] opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-[10%] right-[18%] rotate-[-5deg]">
        <img
          src={keychain1}
          alt="keychain1"
          className="w-[150px] md:w-[190px] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
        />
      </div>

      {/* --- Center Text --- */}
      <div className="z-10 text-center">
        <p className="text-xl font-light tracking-widest mb-2 goth-font">
          SOUL
        </p>
        <h2 className="text-6xl md:text-7xl font-black tracking-tight goth-font">
          CENTRED
        </h2>
      </div>

      {/* Optional subtle overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('/textures/grunge-overlay.png')] bg-cover mix-blend-overlay"></div>
    </section>
  );
};

export default ShopExclusive;
