// src/components/ProtectedAdminRoute.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config/config";

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first");
          navigate("/");
          return;
        }

        const { data } = await axios.get(`${BASE_URL}/api/auth/check-admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!data.isAdmin) {
          toast.error("Access denied");
          navigate("/"); // redirect non-admins to home
        }
      } catch (err) {
        toast.error("Unauthorized or session expired");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (loading)
    return (
      <div className="text-center mt-20 text-white">Checking access...</div>
    );

  return <>{children}</>;
};

export default ProtectedAdminRoute;
