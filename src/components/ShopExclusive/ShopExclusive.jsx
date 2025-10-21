import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import belt from "../../assets/images/belt.png";
import grillz from "../../assets/images/grillz.png";
import keychain from "../../assets/images/keychain.png";
import keychain1 from "../../assets/images/keychain1.png";
import leatherbag from "../../assets/images/leather-bag.png";
import neckpiece from "../../assets/images/neck-piece.png";
import "./ShopExclusive.scss";

export default function ShopExclusive() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      x.set((e.clientX - innerWidth / 2) / 10);
      y.set((e.clientY - innerHeight / 2) / 10);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <section className="lg:mt-12 exclusive relative min-h-[100vh] text-white flex items-center justify-center overflow-hidden">
      {/* Floating images */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute inset-0 z-[10] pointer-events-none"
      >
        <img
          src={belt}
          alt="belt"
          className="absolute object-contain grayscale hover:grayscale-0 brightness-[0.8] hover:brightness-100 transition-all duration-700 hover:scale-110 float-animation top-[10%] left-[28%] lg:left-[20%] lg:top-[15%] w-[150px] md:w-[200px] lg:w-[200px] z-30"
        />
        <img
          src={grillz}
          alt="grillz"
          className="absolute object-contain grayscale hover:grayscale-0 brightness-[0.85] hover:brightness-105 transition-all duration-700 hover:scale-110 float-animation top-[18%] right-[2%] lg:right-[20%] lg:top-[12%] w-[150px] md:w-[200px] lg:w-[200px] z-40"
        />
        <img
          src={keychain}
          alt="keychain"
          className="absolute object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-105 float-animation top-[22%] left-[6%] lg:top-[40%] w-[150px] md:w-[180px] lg:w-[180px] z-20"
        />
        <img
          src={leatherbag}
          alt="leatherbag"
          className="absolute object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 float-animation top-[55%] right-[2%] lg:top-[35%] lg:right-[6%] lg:rotate-[7deg] w-[150px] md:w-[180px] lg:w-[210px] z-15"
        />
        <img
          src={neckpiece}
          alt="neckpiece"
          className="absolute object-contain opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500 float-animation bottom-[10%] left-[5%] lg:bottom-[8%] lg:left-[18%] w-[150px] md:w-[180px] lg:w-[180px] z-25"
        />
        <img
          src={keychain1}
          alt="keychain1"
          className="absolute object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 float-animation bottom-[7%] right-[29%] lg:bottom-[7%] lg:right-[18%] w-[150px] md:w-[180px] lg:w-[180px] z-35"
        />
      </motion.div>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-center pointer-events-none"
      >
        <div className="text-halo-container">
          <h2 className="text-[4rem] md:text-[6rem] sm:text-[3rem] font-black goth-font text-glow leading-[0.9] tracking-tight">
            CRA1X
          </h2>

          <p className="uppercase tracking-[0.3em] text-xs md:text-[0.8rem] mt-4 text-zinc-400">
            SOUL CENTRED
          </p>
        </div>
      </motion.div>

      {/* Glow aura behind text */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] blur-[120px] z-[5]" />

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 border border-zinc-700 px-8 py-3 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 "
      >
        Explore Drop
      </motion.button>
    </section>
  );
}
