import React from "react";

const ProductList = ({ brand, productName, price, stock, image }) => (
  <div className="product-card" style={{
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  }}>
    <img
      src={image}
      alt={productName}
      style={{
        width: "100px",
        height: "100px",
        objectFit: "cover",
        borderRadius: "8px"
      }}
    />
    <div>
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>{productName}</div>
      <div>Brand: {brand}</div>
      <div>Price: ₹{price}</div>
      <div>Stock: {stock}</div>
    </div>
  </div>
);

export default ProductList;