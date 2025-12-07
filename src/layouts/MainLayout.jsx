import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import MobileBottomBar from "../components/MobileBottomBar/MobileBottomBar";
import NewsletterPopup from "../components/NewsletterPopup/NewsletterPopup";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="z-[1000]">
        <Navbar />
      </div>

      <NewsletterPopup />

      <main className="mt-[100px] sm:mt-[120px] md:mt-[140px]">{children}</main>

      <MobileBottomBar />

      <Footer />
    </>
  );
};

export default MainLayout;
