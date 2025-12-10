import { Instagram, MailIcon, MessageCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import cra1x from "../../src/assets/images/cra1x-logo-background-removed.png";
import cardboard from "../assets/images/cardboard-texture.jpg"; // texture overlay
import modelVid_New from "../assets/images/modelvid_new.mp4";

const BasePage = () => {
  const links = [
    { label: "SHOP NOW!", to: "/home" },
    { label: "★ CRA1XB1TCH CLUB ★", to: "/cra1x-club" },
    { label: "ABOUT US", to: "/about" },
  ];

  return (
    <div
      className="
        relative 
        min-h-screen
        bg-black text-white 
        flex flex-col items-center justify-center 
        px-4 select-none overflow-hidden
      "
    >
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          src={modelVid_New}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-30"
        />
      </div>
      {/* === Background Video === */}
      <video
        src={modelVid_New}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:object-contain brightness-[0.4]"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90 z-10 pointer-events-none" />

      {/* Cardboard Noise Overlay */}
      <div
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        style={{
          backgroundImage: `url(${cardboard})`,
          backgroundSize: "cover",
          opacity: 0.7,
          mixBlendMode: "overlay",
        }}
      />

      {/* Subtle Noise */}
      <div className="absolute inset-0 opacity-[0.09] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Logo + Tagline */}
      <div className="flex flex-col items-center mb-12 animate-fadeInSlow z-10">
        <img
          src={cra1x}
          alt="CRA1X Logo"
          className="w-80 z-10 lg:w-80 drop-shadow-[0_0_25px_rgba(0,0,0,0.7)]"
        />

        <p className="uppercase text-[0.75rem] md:text-[0.85rem] tracking-[0.28em] mt-3 text-zinc-400 drop-shadow-[0_0_15px_rgba(0,0,0,0.7)]">
          SOUL CENTRED
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-center gap-6 md:gap-8 z-10 animate-fadeIn mb-24">
        {links.map((item, index) => (
          <Link
            key={item.label}
            to={item.to}
            className="
              text-xl md:text-2xl font-black goth-font tracking-wide
              transition-all duration-300
              hover:scale-105 hover:text-white
              relative group
            "
            style={{ animationDelay: `${index * 120}ms` }}
          >
            {item.label}

            <span
              className="
                absolute left-1/2 -translate-x-1/2 bottom-[-6px]
                w-0 h-[2px] bg-white
                transition-all duration-300
                group-hover:w-full
              "
            ></span>

            <span
              className="
                absolute inset-0 blur-xl opacity-0 group-hover:opacity-40
                transition-all duration-500 bg-white/10
              "
            ></span>
          </Link>
        ))}
      </div>

      {/* Social Icons */}
      <div
        className="
          absolute bottom-10
          flex items-center gap-6
          animate-fadeInSlow z-10
        "
      >
        <a
          href="https://www.instagram.com/cra1x_/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            p-3 rounded-full border border-zinc-700 
            hover:border-white hover:bg-white/10 
            transition-all duration-300
          "
        >
          <Instagram className="w-5 h-5" />
        </a>

        <a
          href="mailto:cra1x.queries@gmail.com"
          className="
            p-3 rounded-full border border-zinc-700 
            hover:border-white hover:bg-white/10 
            transition-all duration-300
          "
        >
          <MailIcon className="w-5 h-5" />
        </a>

        <a
          href="https://wa.me/919870140982"
          target="_blank"
          rel="noopener noreferrer"
          className="
            p-3 rounded-full border border-zinc-700 
            hover:border-white hover:bg-white/10 
            transition-all duration-300
          "
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default BasePage;
