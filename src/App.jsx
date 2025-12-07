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
import Cra1xClubPage from "./pages/cra1xClubPage";
import BasePage from "./pages/BasePage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />

        <Routes>
          {/* Wrap pages inside MainLayout */}
          <Route path="/" element={<BasePage />} />
          <Route
            path="/home"
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
          <Route
            path="/cra1x-club"
            element={
              <MainLayout>
                <Cra1xClubPage />
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
