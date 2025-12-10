import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUsPage = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-zinc-950 text-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors duration-300"
        >
          <ArrowLeft size={20} /> Back
        </button>
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black goth-font text-center mb-12 tracking-wide"
        >
          ABOUT US
        </motion.h1>

        {/* Quote */}
        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="italic text-gray-400 text-center max-w-3xl mx-auto text-lg md:text-xl leading-relaxed mb-16"
        >
          “Accessories used to be a mark of identity—now they’re just
          factory-made replicas stamped out for the masses. When did we stop
          wearing meaning?”
        </motion.p> */}

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-8 text-gray-300 text-[15px] leading-relaxed md:leading-loose tracking-wide"
        >
          <p>
            Fashion is the greatest form of self-expression—a silent yet
            powerful language that speaks before words ever do. It is the art we
            wear, the identity we curate, and the statement we make every day.
          </p>

          <p>
            That realization led to{" "}
            <span className="text-white font-semibold">CRA1X</span>.
          </p>

          <p>
            I wanted to create something that wasn’t just about accessories, but
            about meaningful, intentional style. The name itself,{" "}
            <span className="text-white font-semibold">CRA1X</span>, is derived
            from “Crux” — the core, the essence of existence and being. Just as
            art distills human emotion into form, fashion distills personality
            into expression. Every piece we wear is an extension of who we are,
            what we believe, and how we choose to be seen.
          </p>

          <p>
            <span className="text-white font-semibold">CRA1X</span> was built to
            redefine accessories—not as mere additions, but as statements of
            individuality. Sourced from the finest makers worldwide, each piece
            is crafted for those who see fashion as an extension of their being.
          </p>

          <p>
            This is more than a launch. It’s the beginning of a movement where
            fashion is not just worn—it is lived.
          </p>

          <p className="text-white font-semibold text-lg mt-10">
            Welcome to CRA1X.
          </p>
        </motion.div>

        {/* Signature Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <div className="h-[1px] w-32 bg-zinc-700"></div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center text-gray-500 mt-6 tracking-widest uppercase text-sm"
        >
          The Core of Expression
        </motion.p>
      </div>
    </section>
  );
};

export default AboutUsPage;
