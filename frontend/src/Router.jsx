import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Farms from "./components/Farms";
import Contact from "./components/Contact";
import Header from "./components/Header";
import CustomerDashboard from "./components/customer/Dashboard";
import FarmerDashboard from "./components/farmer/Dashboard";
import AddFarm from "./components/farmer/AddFarm";
import MyFarms from "./components/farmer/MyFarms";
import Login from "./components/Login";
import Register from "./components/Registration";
import Details from "./components/products/Details";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import ProtectedRoute from "./ProtectedRouter";
import "./assets/product-card.css";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute permit={"customer"}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute permit={"farmer"}>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farmer/addfarm"
          element={
            <ProtectedRoute permit={"farmer"}>
              <AddFarm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farmer/myfarms"
          element={
            <ProtectedRoute permit={"farmer"}>
              <MyFarms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/details"
          element={
            <ProtectedRoute permit={"customer"}>
              <Details />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
