import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, X } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../../../config/config";

const API_URL = `${BASE_URL}/coupons`;

const SettingsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    maxAmount: "",
    minimumAmountValue: "",
    validFrom: "",
    expiry: "",
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCoupons(data);
    } catch (error) {
      toast.error("Failed to fetch coupons");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddOrEdit = async () => {
    if (
      !formData.code ||
      !formData.discount ||
      !formData.maxAmount ||
      !formData.minimumAmountValue ||
      !formData.validFrom ||
      !formData.expiry
    )
      return toast.error("Please fill in all fields.");

    try {
      const token = localStorage.getItem("token");
      let res;
      if (editingCoupon) {
        res = await fetch(`${API_URL}/${editingCoupon._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Error saving coupon");
        return;
      }

      await fetchCoupons();
      setShowForm(false);
      setEditingCoupon(null);
      setFormData({
        code: "",
        discount: "",
        maxAmount: "",
        minimumAmountValue: "",
        validFrom: "",
        expiry: "",
      });
      toast.success("Coupon saved successfully!");
    } catch (error) {
      toast.error("Error saving coupon");
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discount: coupon.discount,
      maxAmount: coupon.maxAmount,
      minimumAmountValue: coupon.minimumAmountValue,
      validFrom: coupon.validFrom?.split("T")[0],
      expiry: coupon.expiry?.split("T")[0],
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to delete coupon.");
        return;
      }
      setCoupons(coupons.filter((c) => c._id !== id));
      toast.success("Coupon deleted.");
    } catch (error) {
      toast.error("Failed to delete coupon.");
    }
  };

  return (
    <div className="text-gray-200 p-4 min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold tracking-wide text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
          🕸️ Coupon Management
        </h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingCoupon(null);
            setFormData({
              code: "",
              discount: "",
              maxAmount: "",
              minimumAmountValue: "",
              validFrom: "",
              expiry: "",
            });
          }}
          className="flex items-center gap-2 bg-violet-700 hover:bg-violet-800 transition px-4 py-2 rounded-lg font-medium shadow-[0_0_15px_-4px_rgba(139,92,246,0.4)]"
        >
          <Plus size={16} /> Add Coupon
        </button>
      </div>

      {/* Modal Form with Animation */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-950 border border-violet-800/40 rounded-2xl p-6 w-full max-w-md relative shadow-[0_0_25px_-5px_rgba(139,92,246,0.4)]"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-white"
              >
                <X size={18} />
              </button>
              <h3 className="text-lg font-semibold mb-5 text-violet-400">
                {editingCoupon ? "Edit Coupon" : "Add Coupon"}
              </h3>

              <div className="space-y-4">
                {[
                  { label: "Code", name: "code", type: "text" },
                  { label: "Discount (%)", name: "discount", type: "number" },
                  {
                    label: "Min Amount (₹)",
                    name: "minimumAmountValue",
                    type: "number",
                  },
                  {
                    label: "Max Discount (₹)",
                    name: "maxAmount",
                    type: "number",
                  },
                ].map((input) => (
                  <div key={input.name}>
                    <label className="text-sm text-gray-400">
                      {input.label}
                    </label>
                    <input
                      type={input.type}
                      name={input.name}
                      value={formData[input.name]}
                      onChange={handleChange}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-violet-600 outline-none"
                    />
                  </div>
                ))}

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-sm text-gray-400">Valid From</label>
                    <input
                      type="date"
                      name="validFrom"
                      value={formData.validFrom}
                      onChange={handleChange}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-violet-600 outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-400">Expiry</label>
                    <input
                      type="date"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-violet-600 outline-none"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddOrEdit}
                  className="w-full mt-5 bg-violet-700 hover:bg-violet-800 py-2 rounded-lg text-sm font-medium shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  {editingCoupon ? "Save Changes" : "Add Coupon"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coupon Cards with Motion */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        transition={{ layout: { duration: 0.4 } }}
      >
        {coupons.map((coupon) => (
          <motion.div
            key={coupon._id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-[0_0_25px_-5px_rgba(139,92,246,0.3)] hover:border-violet-700/50 hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)] transition-all duration-300"
          >
            <div>
              <h4 className="text-lg font-semibold text-violet-400 tracking-wide">
                {coupon.code}
              </h4>
              <p className="text-sm text-gray-400 mt-1">
                {coupon.discount}% off | Min ₹{coupon.minimumAmountValue} | Max
                ₹{coupon.maxAmount}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                📅 {coupon.validFrom?.split("T")[0]} →{" "}
                {coupon.expiry?.split("T")[0]}
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => handleEdit(coupon)}
                className="p-2 bg-zinc-900 hover:bg-violet-700/20 rounded-lg text-violet-400 transition"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => handleDelete(coupon._id)}
                className="p-2 bg-zinc-900 hover:bg-red-600/20 rounded-lg text-red-400 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {coupons.length === 0 && (
        <div className="text-center text-gray-500 mt-10 italic">
          No coupons added yet 🕸️
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
