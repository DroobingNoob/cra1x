import React, { useState, useRef, useEffect } from "react";

const faqData = [
  {
    question: "When will my order arrive?",
    answer:
      "Orders are typically dispatched within 3-4 business days and delivered within 5 to 15 business days; however, please be aware that shipping and delivery times may be impacted by delays during festival seasons or public holidays.",
  },
  {
    question: "Do you ship all over India?",
    answer:
      "Yes, we ship PAN India, ensuring delivery to most locations across the country.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "We offer various payment methods including online payments, UPI, credit/debit cards, and cash on delivery (COD). Please note that COD may not be available for certain products or in specific regions/states.",
  },
  {
    question: "Do you offer returns/refunds or exchanges?",
    answer:
      "We do not offer returns, refunds, or exchanges for any reason, including sizing issues. Please ensure you check the size chart for each product before making a purchase.",
  },
];

const FAQItem = ({ item, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="
        rounded-lg shadow-lg 
        bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(180,180,180,0.05))]
        border border-white/20
        backdrop-blur-sm
      "
    >
      <button
        className="
          w-full text-left px-6 py-4 flex justify-between items-center 
          goth-font font-bold text-lg 
          hover:bg-white/10 transition
        "
        onClick={onClick}
      >
        <span>{item.question}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <div
        style={{ height }}
        className="overflow-hidden transition-all duration-300"
      >
        <div
          ref={contentRef}
          className="
            px-6 pt-2 pb-4 text-sm md:text-base font-mono 
            text-gray-300
          "
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-5 py-16 text-white relative z-10">
      <h2 className="text-3xl md:text-6xl font-black goth-font text-center mb-12 select-none">
        FAQs
      </h2>

      <div className="flex flex-col space-y-4">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => toggleIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
