//

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { BASE_URL } from "../../config/config";

const HomeProductsSection = () => {
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

  const productsByCategory = products.reduce((acc, product) => {
    const cat = product.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-20">Loading products...</p>
    );

  return (
    <section className="text-white pt-24 pb-10 px-4 md:px-6 bg-zinc-950">
      {/* Match the container width with Bestsellers section */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-20">
        {/* -------------------- MAIN HEADING -------------------- */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black goth-font tracking-wide">
            Explore Our Collection
          </h1>
          <p className="text-gray-400 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Discover products curated by category — everything crafted to match
            your aesthetic.
          </p>
        </div>

        {/* -------------------- CATEGORY SECTIONS -------------------- */}
        {Object.entries(productsByCategory).map(([category, items]) => (
          <div key={category} className="flex flex-col gap-8">
            {/* Category Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide goth-font relative">
                {category}
              </h2>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
              {items.map((product) => (
                <motion.div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="group relative w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[360px] mx-auto cursor-pointer pb-6"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <motion.img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Floating Icons */}
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

                  {/* Product Info */}
                  <div className="pt-3 text-center">
                    <h3 className="font-medium text-lg tracking-wide truncate group-hover:underline transition-colors">
                      {product.name}
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProductsSection;
