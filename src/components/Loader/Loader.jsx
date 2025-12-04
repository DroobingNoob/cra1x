import React from "react";
import logo from "../../assets/images/cra1x-logo-background-removed.png";
import "./Loader.scss";

const Loader = ({ hide }) => {
  return (
    <div
      className={`loader-wrapper fixed inset-0 bg-black flex items-center justify-center z-[9999]
        ${hide ? "loader-slide-up" : ""}
      `}
    >
      <img src={logo} alt="logo" className="w-40 animate-streetVibe" />
    </div>
  );
};

export default Loader;
