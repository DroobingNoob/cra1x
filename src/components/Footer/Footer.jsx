import React from "react";
import { Instagram, Linkedin } from "lucide-react";
import cra1x from "../../assets/images/cra1x.jpg";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="relative bg-black/80 backdrop-blur-md text-white px-6 py-12 border-t border-white/10 overflow-hidden">
      {/* Mist / halo layers behind footer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-16 left-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-[120px] -translate-x-1/2 animate-footerMist" />
        <div className="absolute -bottom-16 right-1/3 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] blur-[100px] animate-footerMist2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-black goth-font tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            CRA1X
          </h2>
          {/* <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
          > */}
          {/* <img
            src={cra1x}
            alt="Logo"
            className="w-18 opacity-100 hover:opacity-100 transition"
          /> */}
          {/* </Link> */}
          <p className="text-sm text-zinc-400 mt-1">Soul Centred</p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm text-zinc-300 uppercase tracking-wide">
          <a href="#shop" className="hover:text-white transition-colors">
            Shop
          </a>
          <a href="#bestsellers" className="hover:text-white transition-colors">
            Bestsellers
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-white">
          <a href="#" className="hover:text-zinc-300 transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-zinc-300 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} CRA1X. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
