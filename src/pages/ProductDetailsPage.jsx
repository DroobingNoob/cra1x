import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/config";
import "./ProductDetailsPage.scss";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchUserCart, wishlistItems, fetchUserWishlist } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = `${BASE_URL}/products/${id}`;

  const isInWishlist = (product) => {
    if (!product) return false;
    const pid = product._id || product.id;
    return wishlistItems.some((i) => String(i.productId) === String(pid));
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = await res.json();
      setProduct(data);
      setSelectedImage(data.images?.[0] || "/placeholder.jpg");
    } catch (err) {
      setError("Could not load product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please log in to add items to cart.");
      const quantity = Number(
        document.querySelector("input[type=number]").value
      );
      const res = await fetch(`${BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, quantity }),
      });
      if (!res.ok) throw new Error();
      await fetchUserCart(token);
      toast.success("Added to cart!");
    } catch {
      toast.error("Error adding to cart");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please log in to add to Wishlist.");
      const res = await fetch(`${BASE_URL}/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });
      if (!res.ok) throw new Error();
      await fetchUserWishlist(token);
      toast.success("Added to Wishlist!");
    } catch {
      toast.error("Error adding to Wishlist!");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading product details...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Product not found.
      </div>
    );

  return (
    <section className="bg-zinc-950 text-white min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors duration-300"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {/* Main Image */}
            <div className="relative group w-full aspect-square overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-[0_0_40px_rgba(255,255,255,0.03)]">
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-4 mt-6 overflow-x-auto no-scrollbar">
                {product.images.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt={`${product.name}-${idx}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl object-cover cursor-pointer border transition-all duration-300 ${
                      selectedImage === img
                        ? "border-gray-300 ring-2 ring-gray-300"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-7"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight goth-font tracking-wide">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="space-y-1">
              <p className="text-gray-500 uppercase tracking-wider text-sm">
                Regular Price
              </p>
              <div className="text-xl font-medium">
                {product.actual_price && (
                  <span className="line-through text-gray-600 mr-3">
                    ₹{Number(product.actual_price).toLocaleString()}
                  </span>
                )}
                <span className="text-3xl font-bold text-white">
                  ₹{Number(product.discounted_price).toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 tracking-wide">
              {product.stock > 0
                ? `Available — ${product.stock} in stock`
                : "Currently out of stock"}
            </p>

            {/* Quantity Selector */}
            <div>
              <p className="text-sm text-gray-300 mb-2 uppercase tracking-wider">
                Quantity
              </p>
              <input
                type="number"
                defaultValue={1}
                min={1}
                max={product.stock}
                className="w-24 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md
    ${
      product.stock === 0
        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
        : "bg-white text-black hover:bg-gray-200"
    }
  `}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              <button
                onClick={handleAddToWishlist}
                disabled={isInWishlist(product)}
                className={`flex-1 flex items-center justify-center gap-2 border py-3 px-8 rounded-xl transition-all duration-300 ${
                  isInWishlist(product)
                    ? "bg-red-600 text-white hover:bg-red-500 border-transparent"
                    : "border-zinc-700 text-gray-300 hover:bg-zinc-800"
                }`}
              >
                <Heart size={18} />
                {isInWishlist(product)
                  ? "Added to Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>

            {/* Product Description */}
            <div className="pt-8 border-t border-zinc-800">
              <h3 className="text-lg font-semibold mb-3 uppercase tracking-wider text-gray-300">
                Product Details
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Shipping Info */}
            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-lg font-semibold mb-3 uppercase tracking-wider text-gray-300">
                Shipping & Returns
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Orders are typically delivered within 5–7 business days. Please
                note: all sales are final. Verify your size and preferences
                before purchase.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
