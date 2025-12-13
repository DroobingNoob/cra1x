import React, { useEffect } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const {
    wishlistItems = [],
    setWishlistItems,
    fetchUserWishlist,
    removeWishlistItem,
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchUserWishlist(token);
  }, []);

  const handleRemove = (productId) => {
    removeWishlistItem(productId);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors duration-300"
      >
        <ArrowLeft size={20} /> Back
      </button>
      <h1 className="text-2xl font-semibold mb-6 text-white/90">
        Your Wishlist ❤️
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
          <p className="text-lg mb-2">💔 Your wishlist is empty</p>
          <p className="text-sm text-gray-500">
            Add some favorites to view them here
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {wishlistItems.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row items-center border border-zinc-800 rounded-2xl p-4 shadow-sm"
            >
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl mb-3 sm:mb-0 sm:mr-5"
                onClick={() => navigate(`/product/${item.productId}`)}
              />

              <div className="flex-1 w-full">
                <h3 className="text-lg font-medium text-white/90">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {item.description}
                </p>
                <p className="mt-2 text-blue-400 font-semibold">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-end mt-3 sm:mt-0">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
