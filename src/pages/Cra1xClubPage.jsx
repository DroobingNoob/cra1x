import React from "react";
import collage from "../assets/images/collage.jpg";
import collageold from "../assets/images/collage-old.jpg";
import NewsletterSection from "../components/NewsletterSection/NewsletterSection";

const Cra1xClubPage = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white pt-8">
      <div className="w-full">
        <img
          src={collage}
          alt="Brand Collage"
          className="w-full object-cover object-center select-none"
        />
      </div>

      <NewsletterSection />
    </div>
  );
};

export default Cra1xClubPage;
