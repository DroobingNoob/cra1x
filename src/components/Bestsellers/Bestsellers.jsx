import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import belt from "../../assets/images/belt.png";
import grillz from "../../assets/images/grillz.png";
import keychain from "../../assets/images/keychain.png";
import keychain1 from "../../assets/images/keychain1.png";
import leatherbag from "../../assets/images/leather-bag.png";
import neckpiece from "../../assets/images/neck-piece.png";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../config/config";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Bestsellers = () => {
  // const products = [
  //   { id: 1, name: "Belt", price: "₹800.00", image: belt },
  //   { id: 2, name: "Grillz", price: "₹600.00", image: grillz },
  //   { id: 3, name: "Keychain", price: "₹320.00", image: keychain },
  //   { id: 4, name: "Leather Bag", price: "₹1,000.00", image: leatherbag },
  //   { id: 5, name: "Neckpiece", price: "₹1,000.00", image: neckpiece },
  //   { id: 6, name: "Keychain", price: "₹320.00", image: keychain1 },
  // ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { wishlistItems, cartItems, fetchUserWishlist, fetchUserCart } =
    useAuth();

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();

        // filter only products with bestseller: true
        const bestsellers = data.filter(
          (p) => p.bestseller && p.visible !== false
        );
        setProducts(bestsellers);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
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

  if (loading)
    return (
      <section className="bg-zinc-950 text-white py-20 px-4 text-center">
        <p className="text-gray-400">Loading bestsellers...</p>
      </section>
    );

  if (products.length === 0)
    return (
      <></>
      // <section className="bg-zinc-950 text-white py-20 px-4 text-center">
      //   <p className="text-gray-400">No bestseller products found.</p>
      // </section>
    );

  return (
    <section className="relative bg-zinc-950 text-white py-20 px-4 sm:px-6">
      {/* <div className="max-w-6xl mx-auto text-center goth-font relative"> */}
      <div className="w-full max-w-none mx-auto text-center goth-font relative">
        <h2 className="text-3xl md:text-6xl font-black goth-font text-glow mb-6 select-none">
          OUR BESTSELLERS
        </h2>

        <p className="text-gray-400 tracking-widest text-xs mb-14">
          MOST LOVED · MOST BOUGHT
        </p>

        {/* <div className="relative w-full px-4 py-4 bg-zinc-950"> */}
        {/* <div className="relative w-full px-0 sm:px-4 py-8 bg-zinc-950 max-w-none mx-auto"> */}
        <div className="relative w-full px-0 sm:px-4 py-12 bg-zinc-950 max-w-none mx-auto min-h-[480px] md:min-h-[520px]">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2500 }}
            loop={true}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            pagination={{
              el: ".bestseller-pagination", // attach to external div
              clickable: true,
            }}
            className="bestseller-swiper pb-10"
          >
            {products.map((product) => (
              <SwiperSlide
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="flex flex-col items-center"
              >
                {/* <div className="mt-2 my-2 bg-zinc-950">
                  <div className="aspect-square w-full sm:max-w-[200px] overflow-hidden rounded-xl shadow-[0_0_25px_rgba(255,255,255,0.06)]">
                    <img
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="mt-3 text-center w-full sm:max-w-[200px]">
                    <p className="text-lg sm:text-base font-light tracking-wide">
                      {product.name}
                    </p>
                    <p className="text-sm opacity-80">
                      {" "}
                      ₹{product.discounted_price?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div> */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  // className="group relative w-full cursor-pointer"
                  className="group relative w-full cursor-pointer pb-6
           hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <motion.img
                      src={product.images?.[0] || "/placeholder.jpg"}
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
                        className="group/icon p-2 rounded-full bg-black/50 backdrop-blur border border-zinc-700
             hover:bg-white shadow"
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
                        className="group/icon p-2 rounded-full bg-black/50 backdrop-blur border border-zinc-700
             hover:bg-white shadow"
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
                        className="group/icon p-2 rounded-full bg-black/50 backdrop-blur border border-zinc-700
             hover:bg-white shadow"
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
                    {/* <h3 className="font-medium text-lg tracking-wide truncate group-hover:underline transition-colors">
                      {product.name}
                    </h3> */}
                    <h3 className="font-medium text-base md:text-lg lg:text-xl tracking-wide truncate group-hover:underline transition-colors">
                      {product.name}
                    </h3>

                    {/* <p className="text-sm text-gray-300 mt-1">
                      ₹{product.discounted_price?.toLocaleString("en-IN")}
                    </p> */}
                    {/* <div className="flex justify-center items-center gap-2 mt-1 text-sm"> */}
                    <div className="flex justify-center items-center gap-2 mt-1 text-sm md:text-base lg:text-lg">
                      {/* <span className="text-gray-300 font-medium"> */}
                      <span className="text-gray-300 font-medium text-sm md:text-base lg:text-xl">
                        ₹{product.discounted_price.toLocaleString()}
                      </span>
                      {product.actual_price &&
                        product.actual_price > product.discounted_price && (
                          <span className="text-gray-500 line-through font-medium text-sm md:text-base lg:text-xl">
                            ₹{product.actual_price.toLocaleString()}
                          </span>
                        )}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="bestseller-pagination mt-8 flex justify-center"></div>

          <style>{`
            .bestseller-pagination .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background-color: rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              transition: all 0.3s ease;
              margin: 0 6px;
            }
            .bestseller-pagination .swiper-pagination-bullet-active {
              background-color: white;
              transform: scale(1.3);
            }
          `}</style>
        </div>

        <div className="mt-3">
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-2 border border-white text-sm tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
