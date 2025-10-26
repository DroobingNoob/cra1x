import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  ShoppingCart,
  Eye,
  Heart,
} from "lucide-react";

import belt from "../assets/images/belt.jpg";
import grillz from "../assets/images/grillz.jpg";
import keychain from "../assets/images/keychain.jpg";
import keychain1 from "../assets/images/keychain1.jpg";
import leatherbag from "../assets/images/leather-bag.jpg";
import neckpiece from "../assets/images/neck-piece.jpg";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const allProducts = [
    { id: 1, name: "Belt", category: "Accessories", price: 800, image: belt },
    { id: 2, name: "Grillz", category: "Jewelry", price: 600, image: grillz },
    {
      id: 3,
      name: "Keychain",
      category: "Accessories",
      price: 320,
      image: keychain,
    },
    {
      id: 4,
      name: "Leather Bag",
      category: "Bags",
      price: 1000,
      image: leatherbag,
    },
    {
      id: 5,
      name: "Neckpiece",
      category: "Jewelry",
      price: 1000,
      image: neckpiece,
    },
    {
      id: 6,
      name: "Keychain 2",
      category: "Accessories",
      price: 320,
      image: keychain1,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const navigate = useNavigate();

  const filteredProducts = allProducts
    .filter((p) => (category === "All" ? true : p.category === category))
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "price-low") return a.price - b.price;
      if (sortOption === "price-high") return b.price - a.price;
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <section className="bg-zinc-950 text-white min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black goth-font text-center mb-14 tracking-wide">
          SHOP PRODUCTS
        </h2>

        {/* Toolbar */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 backdrop-blur-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            {/* Search */}
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
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-300 placeholder-gray-500"
              />
            </div>

            {/* Filters and Sorting (side by side on all screens) */}
            <div className="flex flex-row items-center justify-between sm:justify-start gap-4 w-full md:w-auto">
              {/* Filter */}
              <div className="flex items-center gap-2 flex-1 md:flex-none">
                <Filter size={18} className="text-gray-400 shrink-0" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-300"
                >
                  <option>All</option>
                  <option>Accessories</option>
                  <option>Bags</option>
                  <option>Jewelry</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 flex-1 md:flex-none">
                <ChevronDown size={18} className="text-gray-400 shrink-0" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-300"
                >
                  <option value="default">Sort By</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A–Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                whileHover={{
                  y: -6,
                  scale: 1.04,
                  boxShadow: "0 8px 25px rgba(255,255,255,0.1)",
                }}
                transition={{ duration: 0.25 }}
                className="relative group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out"
                    whileHover={{ scale: 1.08 }}
                  />
                </div>

                {/* Action Icons */}
                <div className="hidden md:flex flex-col absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-3">
                  {[
                    { label: "Add to Cart", icon: <ShoppingCart size={18} /> },
                    { label: "View Product", icon: <Eye size={18} /> },
                    { label: "Add to Wishlist", icon: <Heart size={18} /> },
                  ].map((action, index) => (
                    <div key={index} className="relative group/icon">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="bg-zinc-800/80 backdrop-blur-sm p-3 rounded-full border border-zinc-700 text-gray-200 hover:bg-white hover:text-black transition-all duration-200"
                      >
                        {action.icon}
                      </motion.button>
                      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-black text-xs px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {action.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Info */}
                <div className="p-3 sm:p-4 text-center">
                  <h3 className="text-base sm:text-lg font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No products found.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsPage;
