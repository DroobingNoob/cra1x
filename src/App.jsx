import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import MainLayout from "./layouts/MainLayout";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import ManageProductsPage from "./pages/admin/ManageProductsPage/ManageProductsPage";
import UsersPage from "./pages/admin/UsersPage/ManageUsersPage";
import AdminPanel from "./pages/admin/AdminPanel/AdminPanel";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute/ProtectedAdminRoute";
import ThankYouPage from "./pages/ThankYouPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import Loader from "./components/Loader/Loader";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // loader stays 1s

    // remove loader AFTER slide-up animation completes
    if (!loading) {
      const removeTimer = setTimeout(() => setShowLoader(false), 900); // match animation duration
      return () => clearTimeout(removeTimer);
    }

    return () => clearTimeout(timer);
  }, [loading]);
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        {/* loader always ON TOP */}
        {showLoader && <Loader hide={!loading} />}

        {/* content always below loader */}
        <div className={`${showLoader ? "pointer-events-none" : ""}`}>
          <Routes>
            {/* Wrap pages inside MainLayout */}
            <Route
              path="/"
              element={
                <MainLayout>
                  <HomePage />
                </MainLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <MainLayout>
                  <Contact />
                </MainLayout>
              }
            />
            <Route
              path="/products"
              element={
                <MainLayout>
                  <ProductsPage />
                </MainLayout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <MainLayout>
                  <ProductDetailsPage />
                </MainLayout>
              }
            />
            <Route
              path="/about"
              element={
                <MainLayout>
                  <AboutUsPage />
                </MainLayout>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminPanel />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <MainLayout>
                  <CartPage />
                </MainLayout>
              }
            />
            <Route
              path="/wishlist"
              element={
                <MainLayout>
                  <WishlistPage />
                </MainLayout>
              }
            />
            <Route
              path="/checkout"
              element={
                <MainLayout>
                  <CheckoutPage />
                </MainLayout>
              }
            />
            <Route
              path="/thank-you"
              element={
                <MainLayout>
                  <ThankYouPage />
                </MainLayout>
              }
            />
            <Route
              path="/my-orders"
              element={
                <MainLayout>
                  <MyOrdersPage />
                </MainLayout>
              }
            />
            {/* <Route
            path="/admin/users"
            element={
              <MainLayout>
                <UsersPage />
              </MainLayout>
            }
          /> */}
          </Routes>
        </div>
      </AuthProvider>
      <ToastContainer
        // position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // matches your dark theme
      />
    </BrowserRouter>
  );
};

export default App;
