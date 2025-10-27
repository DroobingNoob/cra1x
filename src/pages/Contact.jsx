import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Send,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-zinc-950 text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors duration-300"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <h2 className="text-4xl md:text-5xl font-black goth-font text-glow mb-6 select-none relative inline-block">
          CONTACT US
          <span className="block w-20 h-1 bg-white mx-auto mt-2 rounded-full opacity-50"></span>
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
          Got a question, a collaboration idea, or just want to say hi? We’d
          love to hear from you. Drop us a message or reach out through our
          socials.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div className="flex flex-col justify-center space-y-8 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-4 hover:text-white transition-colors duration-300">
                <Mail className="text-white opacity-80" size={22} />
                <p className="text-gray-300 text-sm sm:text-base">
                  cra1x.queries@gmail.com
                </p>
              </div>
              <div className="flex items-center gap-4 hover:text-white transition-colors duration-300">
                <Phone className="text-white opacity-80" size={22} />
                <p className="text-gray-300 text-sm sm:text-base">
                  +91 98701 40982
                </p>
              </div>
              <div className="flex items-center gap-4 hover:text-white transition-colors duration-300">
                <MapPin className="text-white opacity-80" size={22} />
                <p className="text-gray-300 text-sm sm:text-base">
                  Mumbai, India
                </p>
              </div>
            </div>

            <div className="flex gap-5 mt-4">
              <a
                href="#"
                className="p-3 border border-zinc-700 rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="p-3 border border-zinc-700 rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-zinc-900/70 backdrop-blur-md p-8 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-zinc-800"
          >
            <div className="mb-5">
              <label className="block text-sm mb-2 tracking-wide text-gray-300">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm mb-2 tracking-wide text-gray-300">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2 tracking-wide text-gray-300">
                Message
              </label>
              <textarea
                rows="5"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300 resize-none"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full border border-white py-3 rounded-lg text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              <Send size={16} />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
