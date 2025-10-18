import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./BestSellers.scss";
import belt from "../../assets/images/belt.png";
import grillz from "../../assets/images/grillz.png";
import keychain from "../../assets/images/keychain.png";
import keychain1 from "../../assets/images/keychain1.png";
import leatherbag from "../../assets/images/leather-bag.png";
import neckpiece from "../../assets/images/neck-piece.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrow components
// Next Arrow
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 sm:right-[-40px] md:right-[-10px] top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-md transition-all duration-300 z-10"
  >
    <ChevronRight className="w-5 h-5" />
  </button>
);

// Prev Arrow
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 sm:left-[-40px] md:left-[-10px] top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-md transition-all duration-300 z-10"
  >
    <ChevronLeft className="w-5 h-5" />
  </button>
);

const Bestsellers = () => {
  const products = [
    { id: 1, name: "Belt", price: "₹800.00", image: belt },
    { id: 2, name: "Grillz", price: "₹600.00", image: grillz },
    { id: 3, name: "Keychain", price: "₹320.00", image: keychain },
    { id: 4, name: "Leather Bag", price: "₹1,000.00", image: leatherbag },
    { id: 5, name: "Neckpiece", price: "₹1,000.00", image: neckpiece },
    { id: 6, name: "Keychain", price: "₹320.00", image: keychain1 },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "ease-in-out",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="relative bg-zinc-950 text-white py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative goth-font">
        {/* Section Heading */}
        <h2 className="goth-font text-3xl md:text-4xl font-semibold tracking-wider mb-16 font-mono">
          OUR BESTSELLERS
        </h2>

        {/* Carousel */}
        <div className="relative w-full">
          <Slider {...settings}>
            {products.map((product) => (
              <div
                key={product.id}
                className="px-2 sm:px-4 py-4 flex flex-col items-center transition-transform duration-300 hover:scale-105"
              >
                {/* Product Image */}
                <div className="w-full max-w-[160px] sm:max-w-[200px] aspect-square overflow-hidden rounded-xl shadow-[0_0_25px_rgba(255,255,255,0.06)]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Name + Price */}
                <div className="mt-3 text-center w-full max-w-[160px] sm:max-w-[200px]">
                  <p className="text-lg font-light tracking-wide">
                    {product.name}
                  </p>
                  <p className="text-sm opacity-80">{product.price}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* CTA Button */}
        <div className="mt-14">
          <button className="px-8 py-2 border border-white text-sm tracking-wider hover:bg-white hover:text-black transition-colors duration-300">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
