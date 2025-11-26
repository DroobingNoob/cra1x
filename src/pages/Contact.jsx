import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Send,
  ArrowLeft,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config";

const Contact = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Failed to send message");
        setLoading(false);
        return;
      }

      setSuccess("Your message has been sent!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }

    setLoading(false);
  };

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
          {/* LEFT SIDE */}
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

          {/* RIGHT SIDE FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-zinc-900/70 backdrop-blur-md p-8 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-zinc-800"
          >
            {/* SUCCESS MESSAGE */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-3 mb-5 bg-green-700/20 text-green-400 rounded-lg border border-green-700"
              >
                <CheckCircle size={20} /> {success}
              </motion.div>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <div className="p-3 mb-5 bg-red-700/20 text-red-400 rounded-lg border border-red-700">
                {error}
              </div>
            )}

            {/* NAME */}
            <div className="mb-5">
              <label className="block text-sm mb-2 tracking-wide text-gray-300">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300"
                placeholder="Your Name"
              />
            </div>

            {/* EMAIL */}
            <div className="mb-5">
              <label className="block text-sm mb-2 tracking-wide text-gray-300">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>

            {/* MESSAGE */}
            <div className="mb-6">
              <label className="block text-sm mb-2 tracking-wide text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300 resize-none"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full border border-white py-3 rounded-lg text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
