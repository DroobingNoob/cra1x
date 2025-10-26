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

const Bestsellers = () => {
  const products = [
    { id: 1, name: "Belt", price: "₹800.00", image: belt },
    { id: 2, name: "Grillz", price: "₹600.00", image: grillz },
    { id: 3, name: "Keychain", price: "₹320.00", image: keychain },
    { id: 4, name: "Leather Bag", price: "₹1,000.00", image: leatherbag },
    { id: 5, name: "Neckpiece", price: "₹1,000.00", image: neckpiece },
    { id: 6, name: "Keychain", price: "₹320.00", image: keychain1 },
  ];

  const navigate = useNavigate();

  return (
    <section className="relative bg-zinc-950 text-white py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center goth-font relative">
        <h2 className="text-3xl md:text-5xl font-black goth-font text-glow mb-12 select-none">
          OUR BESTSELLERS
        </h2>

        <div className="relative w-full sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-4 py-4 bg-zinc-950">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500 }}
            loop={true}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              768: { slidesPerView: 4 },
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
                key={product.id}
                className="flex flex-col items-center"
              >
                <div className="mt-2 my-2 bg-zinc-950">
                  <div className="aspect-square w-full sm:max-w-[200px] overflow-hidden rounded-xl shadow-[0_0_25px_rgba(255,255,255,0.06)]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="mt-3 text-center w-full sm:max-w-[200px]">
                    <p className="text-lg sm:text-base font-light tracking-wide">
                      {product.name}
                    </p>
                    <p className="text-sm opacity-80">{product.price}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ✅ Pagination Dots Rendered Outside */}
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

        <div className="mt-12">
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
