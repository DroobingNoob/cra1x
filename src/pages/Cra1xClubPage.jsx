import React from "react";
import collage from "../assets/images/collage.jpg";
import NewsletterSection from "../components/NewsletterSection/NewsletterSection";

const Cra1xClubPage = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white pt-8">
      <div className="w-full">
        <img
          src={collage}
          alt="Brand Collage"
          className="w-full object-cover max-h-[70vh] md:max-h-[90vh] select-none"
        />
      </div>

      <NewsletterSection />
    </div>
  );
};

export default Cra1xClubPage;
