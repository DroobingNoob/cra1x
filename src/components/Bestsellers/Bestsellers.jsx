import React from "react";
// React imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // Swiper 10+ modules

// CSS
import "swiper/css";
import "swiper/css/navigation";

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

  return (
    <section className="relative bg-zinc-950 text-white py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center goth-font">
        <h2 className="goth-font text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wider mb-12 sm:mb-16 font-mono">
          OUR BESTSELLERS
        </h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3500 }}
          loop
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 2 }, // mobile
            768: { slidesPerView: 3 }, // tablet
            1024: { slidesPerView: 3 }, // desktop
          }}
          className="relative"
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              className="flex flex-col items-center"
            >
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
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-14">
          <button className="px-8 py-2 border border-white text-sm tracking-wider hover:bg-white hover:text-black transition-colors duration-300">
            View All
          </button>
        </div>
      </div>

      {/* Custom white arrows */}
      <style>{`
  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    transition: all 0.3s ease;
  }

  /* Position arrows outside the carousel on desktop */
  .swiper-button-prev {
    left: -40px; /* move slightly outside the first slide */
  }
  .swiper-button-next {
    right: -40px; /* move slightly outside the last slide */
  }

  /* On smaller screens, place arrows below the carousel */
  @media (max-width: 768px) {
    .swiper-button-next,
    .swiper-button-prev {
      position: absolute;
      top: auto;
      bottom: -40px;
      transform: translateY(0);
    }
    .swiper-button-prev {
      left: 35%;
    }
    .swiper-button-next {
      right: 35%;
    }
  }
`}</style>
    </section>
  );
};

export default Bestsellers;
