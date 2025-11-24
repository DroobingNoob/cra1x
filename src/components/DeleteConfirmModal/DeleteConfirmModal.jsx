// src/components/DeleteConfirmModal/DeleteConfirmModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const DeleteConfirmModal = ({ show, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-[0_0_25px_-5px_rgba(139,92,246,0.4)] p-6 w-[90%] max-w-sm text-center"
          >
            <h2 className="text-lg font-semibold text-violet-400 mb-2">
              Confirm Deletion
            </h2>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this product? <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-[0_0_15px_-4px_rgba(239,68,68,0.4)] transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
