import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// import model1 from "../../assets/images/model-1.jpg";
import model1 from "../../assets/images/model-1.jpg";
import model2 from "../../assets/images/model-2.jpg";
import model3 from "../../assets/images/model3.PNG";
import model5 from "../../assets/images/model5.JPG";
import model6 from "../../assets/images/model-6.jpg";
import model7 from "../../assets/images/model7.PNG";
import model8 from "../../assets/images/model8.JPG";
import model13 from "../../assets/images/model13.jpg";
import model14 from "../../assets/images/model14.jpg";
import model15 from "../../assets/images/model-15.jpg";
import model16 from "../../assets/images/model-16.jpg";
import model17 from "../../assets/images/model-17.jpg";

const ModelShowcase = () => {
  return (
    <div className="relative w-full bg-[#0a0a0a] py-10 overflow-hidden">
      <h2 className="text-center text-3xl md:text-5xl text-white mb-8 tracking-wide goth-font">
        Featured Looks
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1.2}
        spaceBetween={20}
        centeredSlides
        loop
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: { slidesPerView: 2.2 },
          // 1024: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.2 },
        }}
        // className="max-w-[95%] md:max-w-6xl mx-auto"
        className="w-full max-w-[1600px] mx-auto px-4"
      >
        {[
          model1,
          model2,
          model5,
          model6,
          model7,
          model13,
          model14,
          model15,
          model16,
          model17,
        ].map((model, i) => (
          <SwiperSlide key={i}>
            <div className="relative group rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.5)]">
              <img
                src={model}
                alt={`model-${i}`}
                className="w-full h-[48vh] md:h-[58vh] object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ModelShowcase;
