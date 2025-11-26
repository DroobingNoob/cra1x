import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { BASE_URL } from "../../config/config";

const UserDetailsModal = ({ user, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/auth/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setDetails(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [user]);

  if (!user) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-gradient-to-b from-zinc-950 to-zinc-900 border border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.6)] rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="pb-5 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-gray-100 tracking-wide flex items-center gap-3">
              <span className="bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                {user.name}
              </span>
              <span className="text-gray-500 text-sm">({user.email})</span>
            </h2>
          </div>

          {/* Content */}
          <div className="mt-6 space-y-10">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-gray-700 border-t-gray-300 rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* Cart Section */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-200 mb-4 border-l-4 border-purple-600 pl-3">
                    🛒 Cart ({details.cartItems?.length || 0})
                  </h3>
                  {details.cartItems?.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {details.cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex gap-4 hover:border-purple-600/50 transition-all"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded object-cover border border-zinc-700"
                          />
                          <div>
                            <p className="font-medium text-gray-100">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              ₹{item.price} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No items in cart</p>
                  )}
                </section>

                {/* Wishlist Section */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-200 mb-4 border-l-4 border-red-600 pl-3">
                    💖 Wishlist ({details.wishlistItems?.length || 0})
                  </h3>
                  {details.wishlistItems?.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {details.wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex gap-4 hover:border-red-600/50 transition-all"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded object-cover border border-zinc-700"
                          />
                          <div>
                            <p className="font-medium text-gray-100">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              ₹{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No items in wishlist</p>
                  )}
                </section>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserDetailsModal;
