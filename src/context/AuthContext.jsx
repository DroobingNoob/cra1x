import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../config/config";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // ✅ Load user & token on first render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      try {
        const decoded = jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(decoded));
        setUser(decoded);
        window.history.replaceState({}, document.title, "/products");

        // Fetch user data right after login
        fetchUserCart(token);
        fetchUserWishlist(token);
      } catch (err) {}

      return;
    }

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      fetchUserCart(storedToken);
      fetchUserWishlist(storedToken);
    }
  }, []);

  // ✅ Token expiry check every 60s
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          toast.error("Session expired — please log in again");
          logout();
        }
      } catch {
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch user cart safely
  const fetchUserCart = async (tokenParam) => {
    try {
      const token = tokenParam || localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();

      const formatted = (data.items || [])
        .filter((item) => item?.productId)
        .map((item) => ({
          id: item._id,
          productId: item.productId._id,
          name: item.productId.name,
          description: item.productId.description,
          price: item.productId.discounted_price,
          image: item.productId.images?.[0],
          quantity: item.quantity || 1,
          stock: item.productId.stock,
        }));

      setCartItems(formatted);
      const totalItems = formatted.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );
      setCartCount(totalItems);
    } catch (err) {
      toast.error("Error fetching cart");
    }
  };

  // ✅ Update cart item
  const updateCartItem = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await fetch(`${BASE_URL}/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      await fetchUserCart();
    } catch (err) {
      toast.error("Error updating cart item");
    }
  };

  // ✅ Remove cart item
  const removeCartItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await fetch(`${BASE_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchUserCart();
      toast.success("Removed from Cart");
    } catch (err) {
      toast.error("Error removing cart item");
    }
  };

  // ✅ Fetch wishlist safely
  const fetchUserWishlist = async (tokenParam) => {
    try {
      const token = tokenParam || localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${BASE_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch wishlist");
      const data = await res.json();

      const formatted = (data.items || [])
        .filter((item) => item?.productId)
        .map((item) => ({
          id: item._id,
          productId: item.productId._id,
          name: item.productId.name,
          description: item.productId.description,
          price: item.productId.discounted_price,
          image: item.productId.images?.[0],
        }));

      setWishlistItems(formatted);
      setWishlistCount(formatted.length);
    } catch (err) {}
  };

  // ✅ Add to wishlist
  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await fetch(`${BASE_URL}/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      await fetchUserWishlist();
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Error adding to wishlist");
    }
  };

  // ✅ Remove wishlist item
  const removeWishlistItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await fetch(`${BASE_URL}/wishlist/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchUserWishlist();
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Error removing from wishlist");
    }
  };

  // ✅ Logout user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCartItems([]);
    setCartCount(0);
    setWishlistItems([]);
    setWishlistCount(0);
    toast.warn("Session expired — please log in again");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        cartItems,
        setCartItems,
        wishlistItems,
        setWishlistItems,
        cartCount,
        setCartCount,
        wishlistCount,
        setWishlistCount,
        fetchUserCart,
        updateCartItem,
        removeCartItem,
        fetchUserWishlist,
        addToWishlist,
        removeWishlistItem,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
