import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import MobileBottomBar from "../components/MobileBottomBar/MobileBottomBar";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="z-[1000]">
        <Navbar />
      </div>

      <main className="mt-[100px] sm:mt-[120px] md:mt-[140px]">{children}</main>

      <MobileBottomBar />

      <Footer />
    </>
  );
};

export default MainLayout;
