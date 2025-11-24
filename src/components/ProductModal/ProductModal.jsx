import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import "./ProductModal.scss";

const ProductModal = ({
  show,
  editing,
  formData,
  setFormData,
  onClose,
  onSubmit,
  categories,
  handleImageSelect,
  removeImage,
}) => {
  const textareaRef = useRef(null);

  // Auto-resize description textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, [formData.description]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleChange = (e) => {
    handleInput(e);
    const ta = textareaRef.current;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="modal-scroll bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-md border border-zinc-700 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {editing ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* --- Name --- */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInput}
              placeholder="Product Name"
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
              required
            />
          </div>

          {/* --- Description --- */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              ref={textareaRef}
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Description"
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded resize-none"
              style={{ overflow: "hidden" }}
            />
          </div>

          {/* --- Category --- */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInput}
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-gray-300"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* --- Prices + Stock --- */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Actual Price (₹)
              </label>
              <input
                type="number"
                name="actual_price"
                value={formData.actual_price}
                onChange={handleInput}
                className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Discounted Price (₹)
              </label>
              <input
                type="number"
                name="discounted_price"
                value={formData.discounted_price}
                onChange={handleInput}
                className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInput}
              placeholder="Stock quantity"
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
            />
          </div>

          {/* --- Image Upload --- */}
          <div>
            <label className="text-sm font-medium text-gray-300">
              Product Images
            </label>
            <div
              onClick={() => document.getElementById("fileInput").click()}
              className="mt-2 border-2 border-dashed border-zinc-700 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-600 hover:text-blue-500 cursor-pointer transition-all duration-200 bg-zinc-900/60"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-2 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm">
                <span className="text-blue-400">Click to upload</span> or drag &
                drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Up to 5 images (max 500KB each)
              </p>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {formData.images.map((url, i) => (
                  <div
                    key={i}
                    className="relative group rounded-lg overflow-hidden border border-zinc-700 hover:border-blue-600 transition-all duration-200"
                  >
                    <img
                      src={url}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      className="absolute top-1 right-1 bg-red-600/80 group-hover:bg-red-600 text-white rounded-full p-[4px] transition-all duration-200"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- Toggles --- */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                name="visible"
                checked={formData.visible}
                onChange={handleInput}
              />
              Visible
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                name="bestseller"
                checked={formData.bestseller}
                onChange={handleInput}
              />
              Bestseller
            </label>
          </div>

          {/* --- Buttons --- */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600 text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
            >
              {editing ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
