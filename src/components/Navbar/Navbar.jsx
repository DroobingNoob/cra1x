import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  ShoppingCart,
  Heart,
  LogOut,
  User,
} from "lucide-react";
import cra1x from "../../assets/images/cra1x-logo-background-removed.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../LoginModal/LoginModal";
import "./Navbar.scss";
import { toast } from "react-toastify";
import useAdminCheck from "../../utility/CheckAdmin";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideBanner, setHideBanner] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const bannerRef = useRef(null);
  const navigate = useNavigate();

  const {
    user,
    setUser,
    cartCount,
    wishlistCount,
    setCartCount,
    setWishlistCount,
    setCartItems,
    setWishlistItems,
  } = useAuth();

  const categories = ["keychains", "grillz", "chromeos", "bags", "headphones"];

  const isAdmin = useAdminCheck();

  const handleCartClick = () => navigate("/cart");
  const handleWishlistClick = () => navigate("/wishlist");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) setHideBanner(true);
    else setHideBanner(false);
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
  };

  const handleAccountClick = () => {
    if (user) {
      setShowLogoutConfirm(true);
    } else {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    if (bannerRef.current) setBannerHeight(bannerRef.current.offsetHeight);
  }, []);

  // Hide banner on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) setHideBanner(false);
      else setHideBanner(true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Banner */}
      <div
        ref={bannerRef}
        className={`fixed top-0 left-0 w-full text-center text-sm font-mono text-white py-3 bg-black z-40 
  transition-all duration-500 
  ease-[cubic-bezier(0.22,1,0.36,1)] 
  ${
    hideBanner
      ? "-translate-y-full opacity-0 scale-[0.97]"
      : "translate-y-0 opacity-100 scale-100"
  }`}
      >
        Get <span className="font-bold">5% off</span> when you buy 3 products
        using <span className="font-bold">CRA1X</span>
      </div>

      {/* Navbar */}
      <nav
        className="bg-black/40          
backdrop-blur-xl         
border-b border-white/10  fixed w-full left-0 bg-black text-white border-b border-gray-800 z-50 
transition-transform duration-500 
ease-[cubic-bezier(0.22,1,0.36,1)] 
delay-75 pt-4"
        style={{
          top: hideBanner ? 0 : bannerHeight,
          transitionDelay: hideBanner ? "0ms" : "120ms",
        }}
      >
        {/* Main Row */}
        <div className="flex justify-between items-center px-5 py-4 md:px-10 relative">
          {/* Left: Search Icon */}
          <button
            aria-label="Search"
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <Search size={20} />
          </button>

          {/* Center: Logo */}
          {/* <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
          >
            <img
              src={cra1x}
              alt="Logo"
              className="w-12 opacity-100 hover:opacity-90 transition"
            />
          </Link> */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
          >
            <div className="logo-3d-container">
              <div className="logo-3d-object">
                <img src={cra1x} className="face front" alt="logo" />
                <img src={cra1x} className="face back" alt="logo" />
                <div className="side"></div>
              </div>
            </div>
          </Link>

          {/* Right: Wishlist + Cart + Account (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Wishlist */}
            <button
              onClick={handleWishlistClick}
              className="relative p-2 rounded-full hover:bg-white/10 transition"
            >
              <Heart className="w-5 h-5" />
              {/* {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1.5 rounded-full font-semibold">
                  {wishlistCount}
                </span>
              )} */}
            </button>

            {/* Cart */}
            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-full hover:bg-white/10 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1.5 rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account */}
            {user ? (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-xs text-white/80">
                  Hi, {user?.name?.split(" ")[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={handleAccountClick}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition"
              >
                <User className="w-4 h-4" />
                <span className="text-xs text-white/80">Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition"
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
          <Link to="/products" className="hover:text-gray-400 transition">
            Products
          </Link>
          {user && (
            <Link to="/my-orders" className="hover:text-gray-400 transition">
              My Orders
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="hover:text-gray-400 transition">
              Admin
            </Link>
          )}

          {/* Categories Dropdown */}
          {/* <div className="relative group">
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
          </div> */}

          <Link to="/about" className="hover:text-gray-400 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-400 transition">
            Contact
          </Link>
        </div>

        {/* ✅ Mobile Full-Screen Menu (unchanged, restored) */}
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
          {user && (
            <Link
              to="/my-orders"
              onClick={toggleMenu}
              className="hover:text-gray-400"
            >
              My Orders
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={toggleMenu}
              className="hover:text-gray-400"
            >
              Admin
            </Link>
          )}

          <Link
            to="/products"
            onClick={toggleMenu}
            className="hover:text-gray-400"
          >
            Products
          </Link>

          {/* Mobile Categories */}
          {/* <div className="w-full flex flex-col items-center">
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
          </div> */}

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

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {/* ✅ Logout Confirmation Modal */}
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

export default Navbar;
