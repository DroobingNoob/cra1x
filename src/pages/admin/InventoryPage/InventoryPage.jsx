import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../../../config/config";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProducts(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-gray-500 p-6 text-center tracking-wide">
        Gathering inventory data...
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
      <h1 className="text-2xl font-semibold mb-6 text-gray-100 tracking-wider flex items-center gap-2">
        <span className="text-violet-400">⚜️</span> Inventory Overview
      </h1>

      {/* 🌌 Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-zinc-950/90 border border-zinc-800 rounded-xl shadow-[0_0_25px_-5px_rgba(139,92,246,0.4)] backdrop-blur-sm">
        <motion.table
          className="min-w-full text-sm text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <thead className="bg-zinc-900/80 text-gray-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-center">Stock</th>
              <th className="py-3 px-4 text-center">Price</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {products.length > 0 ? (
                products.map((p, index) => (
                  <motion.tr
                    key={p._id || index}
                    className="border-t border-zinc-800 hover:bg-zinc-900/70 transition duration-200"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      {p.images?.[0] && (
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-md border border-zinc-800"
                        />
                      )}
                      <span className="font-medium text-gray-100">
                        {p.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{p.category}</td>
                    <td
                      className={`py-3 px-4 text-center font-semibold ${
                        p.stock === 0
                          ? "text-red-500"
                          : p.stock < 5
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {p.stock}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-300">
                      ₹{p.discounted_price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {p.visible ? (
                        <span className="px-2 py-1 text-xs bg-green-700/30 text-green-400 rounded-md">
                          Visible
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-zinc-700 text-gray-400 rounded-md">
                          Hidden
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No products found in inventory.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </motion.table>
      </div>

      {/* 📱 Mobile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-4">
        <AnimatePresence>
          {products.length > 0 ? (
            products.map((p, index) => (
              <motion.div
                key={p._id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-zinc-950/90 border border-zinc-800 rounded-xl shadow-[0_0_20px_-6px_rgba(139,92,246,0.4)] p-4 flex flex-col gap-3 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  {p.images?.[0] && (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded-lg border border-zinc-800"
                    />
                  )}
                  <div>
                    <h3 className="text-gray-100 font-medium">{p.name}</h3>
                    <p className="text-xs text-gray-400">{p.category}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm mt-1">
                  <p
                    className={`font-semibold ${
                      p.stock === 0
                        ? "text-red-500"
                        : p.stock < 5
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    Stock: {p.stock}
                  </p>
                  <p className="text-gray-300">
                    ₹{p.discounted_price.toLocaleString()}
                  </p>
                </div>

                <div className="mt-2 text-center">
                  {p.visible ? (
                    <span className="px-3 py-1 text-xs bg-green-700/30 text-green-400 rounded-md">
                      Visible
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs bg-zinc-700 text-gray-400 rounded-md">
                      Hidden
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">
              No products in inventory.
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InventoryPage;
