import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ShopExclusive from "../components/ShopExclusive/ShopExclusive";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import MobileBottomBar from "../components/MobileBottomBar/MobileBottomBar";
import FAQ from "../components/FAQ/FAQ";
import InstagramSection from "../components/InstagramSection/InstagramSection";
import ModelShowcase from "../components/ModelShowcase/ModelShowcase";
import NewsletterSection from "../components/NewsletterSection/NewsletterSection";
import HomeProductsSection from "../components/HomeProductsSection/HomeProductsSection";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

    if (!loading) {
      const hideTimer = setTimeout(() => setShowLoader(false), 900);
      return () => clearTimeout(hideTimer);
    }

    return () => clearTimeout(timer);
  }, [loading]);
  return (
    <>
      {/* <div className="z-[1000]">
        <Navbar />
      </div> */}
      {/* <div className="mt-[100px] sm:mt-[120px] md:mt-[140px]"> */}
      {showLoader && <Loader hide={!loading} />}

      <div className={`${showLoader ? "pointer-events-none" : ""}`}>
        <ShopExclusive />
        <HomeProductsSection />
        <Bestsellers />
        <ModelShowcase />
        <FAQ />
        <InstagramSection />
        {/* <NewsletterSection /> */}
        <div>
          <MobileBottomBar />
        </div>
        {/* </div> */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default HomePage;
