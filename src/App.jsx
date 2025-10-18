import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProductDetails from "./pages/ProductDetails";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
