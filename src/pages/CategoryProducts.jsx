import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../products";
import ProductList from "./ProductList";

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // Redirect if user NOT logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth");
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [navigate]);

  // Get products for the category
  const items = productsData[category];

  // If category does NOT exist
  if (!items) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Category not found</h2>
        <p>The category <b>{category}</b> does not exist.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{category} Products</h1>
      {items.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {items.map((item, index) => (
            <ProductList
              key={index}
              brand={item.brand}
              productName={item.productName}
              price={item.price}
              stock={item.stock}
              category={category}
              image={item.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;