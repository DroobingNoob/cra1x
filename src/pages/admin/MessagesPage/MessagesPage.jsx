import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../config/config";
import { Mail, Clock } from "lucide-react";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({}); // Track which messages are expanded

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0]?.toUpperCase())
      .join("");
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4 sm:p-8 text-white">
      <h2 className="text-3xl font-bold mb-6">User Messages</h2>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-zinc-900/70 border border-zinc-800 p-5 rounded-xl"
            >
              <div className="h-4 bg-zinc-700/70 rounded w-1/4 mb-3"></div>
              <div className="h-4 bg-zinc-700/70 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-zinc-700/70 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && messages.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <Mail size={50} className="mx-auto mb-4 opacity-60" />
          <p className="text-lg">No messages received yet.</p>
        </div>
      )}

      {/* Messages List */}
      <div className="grid gap-5">
        {messages.map((msg) => {
          const isNew =
            Date.now() - new Date(msg.createdAt).getTime() <
            24 * 60 * 60 * 1000;

          const isLong = msg.message.length > 180;
          const showFull = expanded[msg._id];

          return (
            <div
              key={msg._id}
              className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl hover:border-zinc-600 hover:bg-zinc-800/80 transition-all shadow-sm"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-lg font-semibold">
                  {getInitials(msg.name || msg.email)}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div className="min-w-0">
                      <p className="font-semibold text-lg break-words">
                        {msg.name}
                      </p>
                      <p className="text-gray-400 text-sm break-all">
                        {msg.email}
                      </p>
                    </div>

                    <div className="text-right sm:text-right text-gray-400 text-sm whitespace-nowrap">
                      <p className="flex items-center gap-1 justify-end sm:justify-end">
                        <Clock size={14} />
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>

                      {isNew && (
                        <span className="text-xs mt-1 inline-block px-2 py-0.5 bg-green-600/20 border border-green-600/50 rounded-full text-green-400 font-medium">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-4 relative">
                    <p
                      className={`text-gray-300 leading-relaxed bg-zinc-800/50 p-3 rounded-lg border border-zinc-700 break-words ${
                        showFull ? "" : "line-clamp-4"
                      }`}
                    >
                      {msg.message}
                    </p>

                    {isLong && (
                      <button
                        onClick={() => toggleExpand(msg._id)}
                        className="mt-2 text-sm text-blue-400 hover:text-blue-300"
                      >
                        {showFull ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessagesPage;
