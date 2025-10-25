import React from "react";

const InstagramSection = () => {
  return (
    <section className="relative w-full py-20 text-center text-white overflow-hidden">
      {/* Full-width Background gradient/overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-gray-900 to-black opacity-80 -z-10"></div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-5">
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-black goth-font text-glow select-none mb-4">
          Join us on Instagram
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 md:text-lg mb-8">
          Be the first to know about new drops and exclusive offers.
        </p>

        {/* Follow Button */}
        <a
          href="https://www.instagram.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-white text-black goth-font font-bold rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-200 transition-all duration-300"
        >
          Follow
        </a>
      </div>
    </section>
  );
};

export default InstagramSection;
