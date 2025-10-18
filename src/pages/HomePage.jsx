import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ShopExclusive from "../components/ShopExclusive/ShopExclusive";
import Bestsellers from "../components/Bestsellers/Bestsellers";

const HomePage = () => {
  return (
    <>
      <Navbar />
      {/* <div className="mt-[100px] sm:mt-[120px] md:mt-[140px]"> */}
      <ShopExclusive />
      <Bestsellers />
      {/* </div> */}
      <Footer />
    </>
  );
};

export default HomePage;
