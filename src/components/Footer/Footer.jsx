import React from "react";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import cra1x from "../../assets/images/cra1x-logo-background-removed.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white px-6 py-12 border-t border-zinc-800 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)] blur-[160px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_80%)] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={cra1x}
            alt="CRA1X Logo"
            className="w-32 md:w-40 mb-2 drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]"
          />
          <p className="text-sm tracking-[0.2em] uppercase text-zinc-400 goth-font">
            Soul Centred
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-sm uppercase tracking-wider text-zinc-400">
          <a
            href="/products"
            className="hover:text-white transition-all duration-200"
          >
            Shop
          </a>
          <a
            href="/about"
            className="hover:text-white transition-all duration-200"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-white transition-all duration-200"
          >
            Contact
          </a>
        </div>

        {/* Socials */}
        <div className="flex gap-5">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/cra1x_/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-zinc-700 hover:border-white hover:bg-white/5 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
          </a>

          {/* Mail */}
          <a
            href="mailto:cra1x.queries@gmail.com"
            className="p-2 rounded-full border border-zinc-700 hover:border-white hover:bg-white/5 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919870140982"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-zinc-700 hover:border-white hover:bg-white/5 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 mt-10 border-t border-zinc-800/60 pt-6 text-center">
        <p className="text-xs text-zinc-500 tracking-widest uppercase">
          © {new Date().getFullYear()} CRA1X — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
