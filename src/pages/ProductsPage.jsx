import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Eye, Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const categories = [
  "All",
  "Keychain",
  "Grillz",
  "Chromeos",
  "Bags",
  "Headphones",
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { cartItems, wishlistItems, fetchUserCart, fetchUserWishlist } =
    useAuth();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        setProducts(data.filter((p) => p.visible !== false));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToWishlist = async (productId) => {
    if (!token) return toast.error("Please login to add items to wishlist");
    if (wishlistItems.some((item) => item.productId === productId))
      return toast.info("Already in wishlist");

    try {
      const res = await fetch(`${BASE_URL}/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        await fetchUserWishlist();
        toast.success("Added to wishlist");
      } else toast.error("Failed to add to wishlist");
    } catch {
      toast.error("Failed to add to wishlist");
    }
  };

  const handleAddToCart = async (productId) => {
    if (!token) return toast.error("Please login to add items to cart");

    try {
      const res = await fetch(`${BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (res.ok) {
        await fetchUserCart();
        toast.success("Added to cart");
      } else toast.error("Failed to add to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const filteredProducts = products
    .filter((p) => p.visible !== false)
    .filter((p) => (category === "All" ? true : p.category === category))
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "price-low")
        return a.discounted_price - b.discounted_price;
      if (sortOption === "price-high")
        return b.discounted_price - a.discounted_price;
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <section className="bg-zinc-950 text-white min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors duration-300"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black goth-font text-center mb-12 tracking-wide">
          SHOP PRODUCTS
        </h2>

        {/* Search + Filters */}
        <div className="sticky top-20 z-30 bg-zinc-950/80 backdrop-blur-lg border border-zinc-800 rounded-xl p-4 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/3">
              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-500 transition-all"
              />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all w-full md:w-auto"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === cat
                    ? "bg-white text-black"
                    : "bg-zinc-900 border border-zinc-700 hover:border-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl h-64 animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="group relative w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[340px] mx-auto cursor-pointer pb-6"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <motion.img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(product._id);
                      }}
                      className="group/icon p-2 rounded-full bg-black/50 backdrop-blur border border-zinc-700 hover:bg-white shadow"
                    >
                      <Heart
                        size={16}
                        className={
                          wishlistItems.some(
                            (item) => item.productId === product._id
                          )
                            ? "text-red-500"
                            : "text-white group-hover/icon:text-black"
                        }
                      />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product._id}`);
                      }}
                      className="group/icon p-2 rounded-full bg-black/50 backdrop-blur border border-zinc-700 hover:bg-white shadow"
                    >
                      <Eye
                        size={16}
                        className="text-white group-hover/icon:text-black"
                      />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product._id);
                      }}
                      className="group/icon p-2 rounded-full bg-black/50 backdrop-blur border border-zinc-700 hover:bg-white shadow"
                    >
                      <ShoppingCart
                        size={16}
                        className={
                          cartItems.some(
                            (item) => item.productId === product._id
                          )
                            ? "text-green-400"
                            : "text-white group-hover/icon:text-black"
                        }
                      />
                    </button>
                  </div>
                </div>

                <div className="pt-3 text-center">
                  <h3 className="font-medium text-lg tracking-wide truncate group-hover:underline transition-colors">
                    ★ {product.name} ★
                  </h3>
                  <div className="flex justify-center items-center gap-2 mt-1 text-sm">
                    <span className="text-gray-300 font-medium">
                      ₹{product.discounted_price.toLocaleString()}
                    </span>
                    {product.actual_price &&
                      product.actual_price > product.discounted_price && (
                        <span className="text-gray-500 line-through text-xs">
                          ₹{product.actual_price.toLocaleString()}
                        </span>
                      )}
                  </div>
                  {product.bestseller && (
                    <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-gray-400 bg-zinc-800/60 px-2 py-1 rounded-full backdrop-blur">
                      Bestseller
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">No products found.</p>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
