import React, { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductModal from "../../../components/ProductModal/ProductModal";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../config/config";
import DeleteConfirmModal from "../../../components/DeleteConfirmModal/DeleteConfirmModal";

const categories = ["Keychain", "Grillz", "Chromeos", "Bags", "Headphones"];
const API_URL = `${BASE_URL}/api/products`;

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    actual_price: "",
    discounted_price: "",
    stock: "",
    visible: true,
    bestseller: false,
    images: [],
  });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleChange = (e) => {
    handleInput(e);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${ta.scrollHeight}px`;
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 5) {
      toast.error("You can upload up to 5 images only.");
      return;
    }

    const validImages = [];
    for (const file of files) {
      if (file.size > 500 * 1024) {
        toast.error(`${file.name} exceeds 500KB limit.`);
        continue;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        validImages.push(event.target.result);
        if (
          validImages.length ===
          files.filter((f) => f.size <= 500 * 1024).length
        ) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...validImages],
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (url) => {
    setFormData({
      ...formData,
      images: formData.images.filter((img) => img !== url),
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const method = editing ? "PUT" : "POST";
    const url = editing ? `${API_URL}/${editing._id}` : API_URL;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error saving product");
        return;
      }

      if (method === "POST") {
        setProducts((prev) => [data.product, ...prev]);
      } else {
        setProducts((prev) =>
          prev.map((p) => (p._id === editing._id ? data.product : p))
        );
      }
      resetForm();
      toast.success("Product saved successfully!");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditing(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDeleteRequest = (productId) => {
    setDeleteTarget(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/${deleteTarget}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== deleteTarget));
      toast.success("Product deleted.");
    } catch (err) {
      toast.error("Failed to delete product.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setDeleteTarget(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      actual_price: "",
      discounted_price: "",
      stock: "",
      visible: true,
      bestseller: false,
      images: [],
    });
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <motion.input
          type="text"
          placeholder="🔍 Search by product name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-1/3 bg-zinc-900 border border-zinc-700 focus:border-violet-500 transition rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none shadow-[0_0_12px_-4px_rgba(139,92,246,0.4)]"
        />

        <h1 className="text-2xl font-semibold text-violet-400 tracking-wide drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]">
          🛠️ Manage Products
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-violet-700 hover:bg-violet-800 transition px-4 py-2 rounded-lg font-medium shadow-[0_0_15px_-4px_rgba(139,92,246,0.4)]"
        >
          <Plus size={18} /> Add Product
        </motion.button>
      </div>

      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 mb-3 italic"
        >
          Loading...
        </motion.p>
      )}

      {/* Product Table (Desktop) */}
      <motion.div
        layout
        className="hidden lg:block bg-zinc-950/80 border border-zinc-800 rounded-2xl shadow-[0_0_25px_-5px_rgba(139,92,246,0.3)] p-6"
      >
        <table className="w-full text-sm text-gray-100 border-collapse">
          <thead className="bg-zinc-900/90 text-violet-300 uppercase text-xs tracking-wider rounded-t-xl">
            <tr>
              <th className="py-4 px-5 text-left font-semibold">Name</th>
              <th className="py-4 px-5 text-left font-semibold">Category</th>
              <th className="py-4 px-5 text-center font-semibold">Price</th>
              <th className="py-4 px-5 text-center font-semibold">
                Discounted
              </th>
              <th className="py-4 px-5 text-center font-semibold">Stock</th>
              <th className="py-4 px-5 text-center font-semibold">Visible</th>
              <th className="py-4 px-5 text-center font-semibold">
                Bestseller
              </th>
              <th className="py-4 px-5 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p, i) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`transition-all duration-200 ${
                    i % 2 === 0 ? "bg-zinc-950/60" : "bg-zinc-900/40"
                  } hover:bg-zinc-900/80`}
                >
                  <td className="py-4 px-5 font-medium text-white">{p.name}</td>
                  <td className="py-4 px-5 text-gray-400">{p.category}</td>
                  <td className="py-4 px-5 text-center">₹{p.actual_price}</td>
                  <td className="py-4 px-5 text-center text-violet-400">
                    ₹{p.discounted_price}
                  </td>
                  <td className="py-4 px-5 text-center">{p.stock}</td>
                  <td className="py-4 px-5 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        p.visible
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {p.visible ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-center">
                    {p.bestseller ? (
                      <span className="text-orange-400 font-bold">🔥</span>
                    ) : (
                      <span className="text-gray-500">–</span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-violet-400 hover:text-violet-300 transition"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(p._id)}
                        className="text-red-500 hover:text-red-400 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="py-6 text-center text-gray-500 italic"
                >
                  No products found 🕸️
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Mobile Layout */}
      <div className="grid gap-4 lg:hidden mt-6">
        <AnimatePresence>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] hover:border-violet-700/50 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-base font-semibold text-violet-400">
                      {p.name}
                    </h2>
                    <p className="text-sm text-gray-400">{p.category}</p>
                  </div>
                  {p.bestseller && (
                    <span className="text-orange-400 text-lg">🔥</span>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-gray-300">
                  <div>Actual: ₹{p.actual_price}</div>
                  <div>Discounted: ₹{p.discounted_price}</div>
                  <div>Stock: {p.stock}</div>
                  <div>
                    <span
                      className={`px-2 py-[2px] text-xs rounded-full font-medium ${
                        p.visible
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {p.visible ? "Visible" : "Hidden"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-violet-400 hover:text-violet-300"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(p._id)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 italic"
            >
              No products yet 🕸️
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <ProductModal
        show={showForm}
        editing={editing}
        formData={formData}
        setFormData={setFormData}
        onClose={resetForm}
        onSubmit={handleSubmit}
        categories={categories}
        handleImageSelect={handleImageSelect}
        removeImage={removeImage}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ManageProductsPage;
