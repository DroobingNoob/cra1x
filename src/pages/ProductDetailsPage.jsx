import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import belt from "../assets/images/belt.jpg";
import grillz from "../assets/images/grillz.jpg";
import keychain from "../assets/images/keychain.jpg";
import keychain1 from "../assets/images/keychain1.jpg";
import leatherbag from "../assets/images/leather-bag.jpg";
import neckpiece from "../assets/images/neck-piece.jpg";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Same dataset (can later come from API)
  const allProducts = [
    { id: 1, name: "Belt", price: 800, image: belt },
    { id: 2, name: "Grillz", price: 600, image: grillz },
    { id: 3, name: "Keychain", price: 320, image: keychain },
    { id: 4, name: "Leather Bag", price: 1000, image: leatherbag },
    { id: 5, name: "Neckpiece", price: 1000, image: neckpiece },
    { id: 6, name: "Keychain 2", price: 320, image: keychain1 },
  ];

  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Product not found.
      </div>
    );
  }

  return (
    <section className="bg-zinc-950 text-white min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors duration-300"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold goth-font tracking-wide">
              {product.name}
            </h1>

            <p className="text-gray-400 text-lg">
              Regular price{" "}
              <span className="line-through text-gray-600">₹1,999</span>
              <span className="ml-2 text-white font-bold">
                ₹{product.price}
              </span>
            </p>

            <p className="text-sm text-gray-400">
              Shipping calculated at checkout.
            </p>

            {/* Size Options */}
            <div>
              <p className="text-sm text-gray-300 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className="border border-zinc-700 hover:border-white px-4 py-2 rounded-lg text-sm hover:bg-white hover:text-black transition-all duration-200"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm text-gray-300 mb-2">Quantity</p>
              <input
                type="number"
                defaultValue={1}
                min={1}
                className="w-20 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Add to Cart Button */}
            <button className="w-full md:w-auto bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition-all duration-300">
              Add to Cart
            </button>

            {/* Description */}
            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-lg font-semibold mb-3">Product Details</h3>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                <li>Boxy/Oversized fit T-Shirts</li>
                <li>Unisex</li>
                <li>Acid Washed</li>
                <li>100% Combed Cotton</li>
                <li>240 GSM bio-washed fabric</li>
                <li>Made in India</li>
              </ul>
            </div>

            {/* Washing Instructions */}
            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-lg font-semibold mb-3">
                Washing Instructions
              </h3>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                <li>Wash inside-out on 30°C or less</li>
                <li>Tumble dry low</li>
                <li>Do not bleach</li>
                <li>Do not iron over print</li>
              </ul>
            </div>

            {/* Returns & Shipping */}
            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-lg font-semibold mb-3">Shipping & Returns</h3>
              <p className="text-gray-400 text-sm">
                Tees and accessories take ~7 business days to deliver. No
                returns or exchanges available. Please check size chart
                carefully before purchase.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
