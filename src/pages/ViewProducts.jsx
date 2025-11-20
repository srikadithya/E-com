import React from "react";
import { useParams } from "react-router-dom";
import products from "../products";
import ProductList from "./ProductList";
import "./ViewProducts.css";

const ViewProducts = () => {
  const { category } = useParams();
  const items = products[category] || [];

  return (
    <div className="view-container">
      <h1 className="view-title">{category.toUpperCase()}</h1>

      <div className="products-grid">
        {items.map((item, index) => (
          <ProductList
            key={index}
            brand={item.brand}
            productName={item.productName}
            price={item.price}
            stock={item.stock}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;
