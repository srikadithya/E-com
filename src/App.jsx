import React from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import CategoryProducts from "./pages/CategoryProducts";
import ProductList from "./pages/ProductList";
import ViewProducts from "./pages/ViewProducts";

import { Authenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Auth />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <Authenticator>
            <Home />
          </Authenticator>
        }
      />
      <Route
        path="/category/:category"
        element={
          <Authenticator>
            <CategoryProducts />
          </Authenticator>
        }
      />
      <Route
        path="/products"
        element={
          <Authenticator>
            <ProductList />
          </Authenticator>
        }
      />
      <Route
        path="/view"
        element={
          <Authenticator>
            <ViewProducts />
          </Authenticator>
        }
      />
    </Routes>
  );
}

export default App;
