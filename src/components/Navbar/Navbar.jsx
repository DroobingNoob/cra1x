import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import cra1x from "../../assets/images/cra1x.jpg";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideBanner, setHideBanner] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const bannerRef = useRef(null);

  const categories = ["keychains", "grillz", "chromeos", "bags", "headphones"];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) setHideBanner(true);
    else setHideBanner(false);
  };

  // Hide banner on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setHideBanner(true);
      } else {
        setHideBanner(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Banner */}
      <div
        ref={bannerRef}
        className={`fixed top-0 left-0 w-full text-center text-sm font-mono text-white py-3 bg-black z-[100] transition-transform duration-500 ease-in-out ${
          hideBanner
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        Get <span className="font-bold">5% off</span> when you buy 3 products
        using <span className="font-bold">CRA1X</span>
      </div>

      {/* Navbar */}
      <nav
        className={`fixed w-full left-0 bg-black text-white border-b border-gray-800 z-50 transition-all duration-500 ease-in-out`}
        style={{
          top: hideBanner ? 0 : bannerRef.current?.offsetHeight || 0,
        }}
      >
        {/* Main Row */}
        <div className="flex justify-between items-center px-5 py-4 md:px-10 relative">
          {/* Search Icon */}
          <button aria-label="Search">
            <Search size={20} />
          </button>

          {/* Center Logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
          >
            <img
              src={cra1x}
              alt="Logo"
              className="w-12 opacity-100 hover:opacity-100 transition"
            />
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center space-x-10 py-4 text-sm font-mono tracking-wide relative">
          <Link to="/" className="hover:text-gray-400 transition">
            Home
          </Link>
          <Link to="/bestsellers" className="hover:text-gray-400 transition">
            Bestsellers
          </Link>
          <Link to="/new" className="hover:text-gray-400 transition">
            Just Arrived
          </Link>

          {/* Categories Dropdown */}
          <div className="relative group">
            <button className="flex items-center hover:text-gray-400 transition">
              Categories <ChevronDown size={16} className="ml-1" />
            </button>
            <div className="absolute left-0 mt-2 w-40 bg-black border border-gray-700 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-800 transition"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/about" className="hover:text-gray-400 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-400 transition">
            Contact
          </Link>
        </div>

        {/* Mobile Full-Screen Menu */}
        {/* Mobile Full-Screen Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-full bg-black/95 backdrop-blur-sm text-white flex flex-col items-center justify-center space-y-4 text-lg font-mono transform transition-transform duration-500 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={toggleMenu}
            aria-label="Close menu"
            className="absolute top-6 right-6"
          >
            <X size={26} />
          </button>

          <Link to="/" onClick={toggleMenu} className="hover:text-gray-400">
            Home
          </Link>
          <Link
            to="/bestsellers"
            onClick={toggleMenu}
            className="hover:text-gray-400"
          >
            Bestsellers
          </Link>
          <Link to="/new" onClick={toggleMenu} className="hover:text-gray-400">
            Just Arrived
          </Link>

          {/* Mobile Categories Collapsible */}
          <div className="w-full flex flex-col items-center">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className={`flex items-center space-x-2 text-lg font-bold transition-colors ${
                categoriesOpen
                  ? "text-white underline"
                  : "hover:text-gray-400 text-gray-300"
              }`}
            >
              <span>Categories</span>
              <ChevronDown
                size={18}
                className={`transform transition-transform duration-200 ${
                  categoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`flex flex-col items-center overflow-hidden transition-all duration-300 ${
                categoriesOpen ? "max-h-96 mt-2" : "max-h-0"
              }`}
            >
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat}`}
                  onClick={toggleMenu}
                  className="py-1 text-gray-300 hover:text-gray-400"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/about"
            onClick={toggleMenu}
            className="hover:text-gray-400"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className="hover:text-gray-400"
          >
            Contact
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
