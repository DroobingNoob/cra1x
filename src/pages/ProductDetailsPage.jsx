import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/config";
import "./ProductDetailsPage.scss";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchUserCart, wishlistItems, fetchUserWishlist, user } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isEligible, setIsEligible] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const API_URL = `${BASE_URL}/products/${id}`;

  const isInWishlist = (product) => {
    if (!product) return false;
    const pid = product._id || product.id;
    return wishlistItems.some((i) => String(i.productId) === String(pid));
  };

  // useEffect(() => {
  //   fetchProduct();
  //   fetchReviews();
  //   checkEligibility();
  // }, [id, user]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) setQuantity(1);
  }, [product]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoadingRelated(true);
        const res = await fetch(`${BASE_URL}/products/related/${id}`);
        const data = await res.json();
        setRelatedProducts(data || []);
      } catch (err) {
        console.error("Failed to load related products");
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelatedProducts();
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [id, user]);

  useEffect(() => {
    if (user) checkEligibility();
  }, [id, user]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/reviews/${id}`);
      const data = await res.json();
      setReviews(data);

      // Find logged-in user's review if exists
      const token = localStorage.getItem("token");
      if (token) {
        const myReview = data.find(
          (r) => String(r.user?._id || r.user || r.userId) === String(user?.id)
        );

        if (myReview) {
          setUserReview(myReview);
          setRating(myReview.rating);
          setComment(myReview.comment);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const checkEligibility = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return setIsEligible(false);

      const res = await fetch(`${BASE_URL}/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orders = await res.json();

      const bought = orders.some((o) =>
        o.orderItems.some((i) => i.productId === id)
      );

      setIsEligible(bought);
    } catch {
      setIsEligible(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty!");
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please log in to write a review.");

    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: id,
        rating,
        comment,
      }),
    });

    const data = await res.json();

    if (!res.ok) return toast.error(data.message);

    toast.success("Review added!");
    fetchReviews();
  };

  const handleEditReview = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/reviews/edit/${userReview._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, comment }),
    });

    const data = await res.json();
    if (!res.ok) return toast.error(data.message);

    toast.success("Review updated!");
    fetchReviews();
  };

  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/reviews/delete/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) return toast.error(data.message);

    toast.success("Review deleted!");

    // Reset form
    setUserReview(null);
    setRating(5);
    setComment("");

    await fetchReviews(); // IMPORTANT
  };

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
            {/* <div>
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
            </div> */}

            {/* Quantity Selector */}
            <div>
              <p className="text-sm text-gray-300 mb-2 uppercase tracking-wider">
                Quantity
              </p>

              <div className="inline-flex items-center bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
                {/* Minus */}
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity === 1}
                  className="px-4 py-2 text-gray-400 hover:text-white hover:bg-zinc-900
                 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  −
                </button>

                {/* Value */}
                <div className="w-12 text-center text-sm font-medium">
                  {quantity}
                </div>

                {/* Plus */}
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  disabled={quantity === product.stock || product.stock === 0}
                  className="px-4 py-2 text-gray-400 hover:text-white hover:bg-zinc-900
                 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                {product.stock} available
              </p>
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
      {/* REVIEWS SECTION */}
      <div className="max-w-4xl mx-auto mt-24 border-t border-zinc-800 pt-16">
        <h2 className="text-3xl font-bold mb-10 tracking-wide goth-font">
          Customer Reviews
        </h2>

        {/* Write Review Box */}
        {loadingReviews ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : user ? (
          isEligible ? (
            // ❌ Do NOT show review box if user already reviewed
            !userReview ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg mb-12">
                <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

                {/* Rating Stars */}
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      className={`cursor-pointer text-2xl ${
                        rating >= star ? "text-yellow-400" : "text-gray-600"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-600 mb-4"
                  rows="4"
                />

                <button
                  onClick={handleSubmitReview}
                  className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition"
                >
                  Submit Review
                </button>
              </div>
            ) : null // <-- hide review box
          ) : (
            <div className="text-gray-500 mb-10">
              You must purchase this product to write a review.
            </div>
          )
        ) : (
          <div className="text-gray-500 mb-10">
            Please log in to write a review.
          </div>
        )}

        {/* EDIT REVIEW BOX */}
        {isEditing && userReview && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg mb-12">
            <h3 className="text-xl font-semibold mb-4">Edit Your Review</h3>

            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-2xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-600"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Update your review..."
              rows={4}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-gray-300 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  handleEditReview();
                  setIsEditing(false);
                }}
                className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition"
              >
                Save Changes
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="bg-zinc-800 text-gray-300 px-6 py-3 rounded-xl hover:bg-zinc-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* All Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet. Be the first!</p>
          )}

          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold">
                  {r.user?.name}
                  {r.user?._id === user?.id && (
                    <span className="ml-2 text-xs text-gray-500">(You)</span>
                  )}
                </h4>
                <span className="text-yellow-400 text-xl">
                  {"★".repeat(r.rating)}
                </span>
              </div>

              <p className="text-gray-400 break-words whitespace-pre-wrap">
                {r.comment}
              </p>

              <p className="text-gray-600 text-xs mt-2">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>

              {/* ⭐ Add Edit/Delete only for logged user's review */}
              {r.user?._id === user?.id && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setUserReview(r);
                      setRating(r.rating);
                      setComment(r.comment);
                      setIsEditing(true);

                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                      });
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 border border-zinc-700 rounded-lg hover:bg-zinc-800 hover:text-white transition"
                  >
                    <Pencil size={16} /> Edit
                  </button>

                  <button
                    onClick={() => handleDeleteReview(r._id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 border border-red-600/40 rounded-lg hover:bg-red-600/20 transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* YOU MIGHT BE INTERESTED IN */}
      {relatedProducts.length !== 0 ? (
        <div className="max-w-6xl mx-auto mt-32 border-t border-zinc-800 pt-16">
          <h2 className="text-3xl font-bold mb-10 goth-font tracking-wide">
            You Might Be Interested In
          </h2>

          {loadingRelated ? (
            <p className="text-gray-500">Loading recommendations...</p>
          ) : relatedProducts.length === 0 ? (
            <p className="text-gray-500">No related products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="cursor-pointer bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden
                     hover:border-zinc-600 transition"
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.images?.[0] || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 text-center">
                    <h3 className="text-sm md:text-base font-medium truncate">
                      {item.name}
                    </h3>

                    <div className="mt-1 text-sm text-gray-300">
                      ₹{item.discounted_price.toLocaleString()}
                      {item.actual_price > item.discounted_price && (
                        <span className="ml-2 line-through text-gray-500 text-xs">
                          ₹{item.actual_price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {item.bestseller && (
                      <span
                        className="inline-block mt-2 text-[10px] uppercase tracking-wider
                               text-gray-400 bg-zinc-800/70 px-2 py-1 rounded-full"
                      >
                        Bestseller
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default ProductDetailsPage;
