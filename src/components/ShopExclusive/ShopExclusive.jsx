import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./ShopExclusive.scss";

import model1 from "../../assets/images/model1.PNG";
import model2 from "../../assets/images/model2.JPG";
import model3 from "../../assets/images/model3.PNG";
import model4 from "../../assets/images/model4.JPG";
import model5 from "../../assets/images/model5.JPG";
import model6 from "../../assets/images/model6.JPG";
import model7 from "../../assets/images/model7.PNG";
import model8 from "../../assets/images/model8.JPG";
import model9 from "../../assets/images/model9.PNG";
import model10 from "../../assets/images/model10.PNG";
import model11 from "../../assets/images/model11.PNG";
import model12 from "../../assets/images/model12.PNG";
import cardboard from "../../assets/images/cardboard-texture.jpg"; // <--- noise overlay

const images = [model1, model2, model3, model5, model6, model7];

export default function ShopExclusive() {
  const [index, setIndex] = useState(0);
  const darkIndexes = [2, 5];

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // shorter interval
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="exclusive relative h-screen w-full overflow-hidden text-white mt-12">
      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`model-${index}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className={`absolute inset-0 w-full h-full object-cover object-center ${
            index === 2
              ? "brightness-[0.85] contrast-[1]" // model3 stays normal
              : "brightness-[0.5] contrast-[1.05]" // all others darkened
          }`}
        />
      </AnimatePresence>

      {/* <AnimatePresence mode="wait">

        <motion.img
          key={index}
          src={images[index]}
          alt={`model-${index}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className={`absolute inset-0 w-full h-full object-cover object-center ${
            darkIndexes.includes(index)
              ? "brightness-[1.25] contrast-[1.05]"
              : "brightness-[1] contrast-[1]"
          }`}
        />
      </AnimatePresence> */}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90 z-10 pointer-events-none" />

      {/* Cardboard Noise Overlay */}
      <div
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        style={{
          backgroundImage: `url(${cardboard})`,
          backgroundSize: "cover",
          opacity: 0.9, // increased from 0.12
          mixBlendMode: "overlay",
        }}
      />

      {/* Center Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-[3.5rem] md:text-[6rem] font-black goth-font tracking-tight leading-[0.9] text-glow select-none">
          CRA1X
        </h1>
        <p className="uppercase text-[0.8rem] tracking-[0.3em] text-zinc-400 mt-4 select-none">
          SOUL CENTRED
        </p>
      </motion.div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 160 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 border border-zinc-700 px-8 py-3 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 z-40"
      >
        Enter the Drop
      </motion.button>
    </section>
  );
}
