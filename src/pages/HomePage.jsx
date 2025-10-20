import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ShopExclusive from "../components/ShopExclusive/ShopExclusive";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import MobileBottomBar from "../components/MobileBottomBar/MobileBottomBar";

const HomePage = () => {
  return (
    <>
      <div className="z-[1000]">
        <Navbar />
      </div>
      {/* <div className="mt-[100px] sm:mt-[120px] md:mt-[140px]"> */}
      <ShopExclusive />
      <Bestsellers />
      <div>
        <MobileBottomBar />
      </div>
      {/* </div> */}
      <Footer />
    </>
  );
};

export default HomePage;
