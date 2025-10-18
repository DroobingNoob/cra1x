import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-6 border-t border-gray-800 text-sm font-mono">
      © {new Date().getFullYear()} cra1x. All rights reserved.
    </footer>
  );
};

export default Footer;
