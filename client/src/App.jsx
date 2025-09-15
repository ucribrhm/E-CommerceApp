import React from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import Navbar from "./Component/Navbar";
import SingIn from "./pages/Auth/SingIn";
import SingUp from "./pages/Auth/SingUp";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "@/pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";
import Home from "./pages/Admin/Home";
import Orders from "./pages/Admin/Orders";
import Product from "./pages/Admin/Products";
import ProductEditDetail from "./pages/Admin/ProductEditDetail";
import NewProduct from "./pages/Admin/Products/new";
function App() {
  return (
    <div id="content">
      <Navbar />
      <Routes>
        <Route index element={<Products />} />
        <Route path="/product">
          <Route index element={<Products />} />
          <Route path=":product_id" element={<ProductDetail />} />
        </Route>
        <Route path="/SingIn" element={<SingIn />} />
        <Route path="/SingUp" element={<SingUp />} />
        <Route path="/Sepet" element={<Basket />} />
        <Route path="*" element={<Error404 />} />
        {/* <ProtectedRoute path="/Profile" element={<Profile />}/> */}
        <Route
          path="/Profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<Admin />} admin={true}></ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Product />} />
          <Route path="products/new" element={<NewProduct />} />
          <Route path="products/:product_id" element={<ProductEditDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
