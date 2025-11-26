// src/hooks/useAdminCheck.js
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";

const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { data } = await axios.get(`${BASE_URL}/auth/check-admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.isAdmin) setIsAdmin(true);
      } catch {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  return isAdmin;
};

export default useAdminCheck;
