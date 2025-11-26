import React, { useEffect, useState } from "react";
import UserDetailsModal from "../../../components/UserDetailsModal/UserDetailsModal";
import { BASE_URL } from "../../../config/config";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/auth`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  if (loading)
    return (
      <div className="text-gray-500 p-6 text-center tracking-wide">
        Summoning user data...
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-100 tracking-wider flex items-center gap-2">
        <span className="text-violet-400">⛧</span> Users Management
      </h1>

      {/* TABLE — desktop view */}
      <div className="hidden md:block bg-zinc-950/90 border border-zinc-800 rounded-xl shadow-lg backdrop-blur-sm">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-zinc-900/80 text-gray-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-center">Cart</th>
              <th className="py-3 px-4 text-center">Wishlist</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr
                key={u.id || index}
                className="border-t border-zinc-800 hover:bg-zinc-900/70 transition duration-200"
              >
                <td className="py-3 px-4 font-medium text-gray-100">
                  {u.name}
                </td>
                <td className="py-3 px-4 text-gray-400">{u.email}</td>
                <td className="py-3 px-4 text-center">{u.cartCount}</td>
                <td className="py-3 px-4 text-center">{u.wishlistCount}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => openModal(u)}
                    className="px-3 py-1 text-xs bg-violet-700 hover:bg-violet-800 rounded-md text-white shadow-sm transition"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARD GRID — mobile view */}
      <div className="grid gap-4 md:hidden mt-4">
        {users.map((u, index) => (
          <div
            key={u.id || index}
            className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 shadow-md hover:shadow-lg hover:border-violet-700 transition"
          >
            <h2 className="text-lg font-semibold text-white mb-1 tracking-wide">
              {u.name}
            </h2>
            <p className="text-sm text-gray-400 mb-3">{u.email}</p>

            <div className="flex justify-between text-sm text-gray-400 mb-4">
              <span>🛒 {u.cartCount} items</span>
              <span>💜 {u.wishlistCount}</span>
            </div>

            <button
              onClick={() => openModal(u)}
              className="w-full py-2 text-sm bg-violet-700 hover:bg-violet-800 text-white rounded-lg font-medium tracking-wide shadow-sm transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <UserDetailsModal user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
};

export default UsersPage;
