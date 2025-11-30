import React, { useEffect, useState } from "react";
import { Mail, Copy, Loader2, Search } from "lucide-react";
import { BASE_URL } from "../../../config/config";

const NewsletterPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/newsletter/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        setSubscribers(data.subscribers);
        setFiltered(data.subscribers);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch emails.");
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleSearch = (text) => {
    setQuery(text);
    const filteredList = subscribers.filter((item) =>
      item.email.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredList);
  };

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-blue-400" size={32} />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-400 font-medium py-10">{error}</div>
    );

  return (
    <div className="text-gray-200">
      <h1 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Mail size={22} className="text-blue-400" />
        Newsletter Subscribers
      </h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search emails..."
          className="w-full bg-zinc-800 border border-zinc-700 text-gray-200 rounded-lg py-2 pl-10 pr-4 outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-left bg-zinc-900/50 rounded-lg overflow-hidden">
          <thead className="bg-zinc-800/60">
            <tr>
              <th className="px-4 py-3 text-gray-300 text-sm">Email</th>
              <th className="px-4 py-3 text-gray-300 text-sm">Date</th>
              <th className="px-4 py-3 text-gray-300 text-sm">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No subscribers found.
                </td>
              </tr>
            ) : (
              filtered.map((sub) => (
                <tr
                  key={sub._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40 transition"
                >
                  <td className="px-4 py-3">{sub.email}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => copyEmail(sub.email)}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
                    >
                      <Copy size={16} /> Copy
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterPage;
