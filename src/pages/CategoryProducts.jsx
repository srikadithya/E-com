import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import './CategoryProducts.css';
import axios from "axios";

const CategoryPage = () => {
  const { state } = useLocation();
  const { category } = useParams();
  const products = state?.products || [];
  const [loading, setLoading] = useState(false); // For payment processing

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Initialize Razorpay payment
  const initPayment = (order, amount) => {
    if (!order?.order_id) {
      alert("Invalid order details. Please try again.");
      console.error("Invalid order object:", order);
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_06GeKary0jkcOO",
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "My Shop",
      description: "Test Transaction",
      order_id: order.order_id,
      handler: async (response) => {
        try {
          const verifyUrl = "https://4fk28ydw23.execute-api.us-east-1.amazonaws.com/payment-stage/verify-order";
          const { data } = await axios.post(verifyUrl, response);
        } catch (err) {
          //alert("Payment verification failed. Check console for details.");
          console.error("Payment verification error:", err);
        } finally {
          setLoading(false);
        }
      },
      modal: {
        ondismiss: () => {
          alert("Payment cancelled.");
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Handle Buy button click
  const handlePayment = async (price) => {
  setLoading(true);
  price = price*100;
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    alert("Razorpay SDK failed to load. Check your internet connection.");
    setLoading(false);
    return;
  }

  try {
    const orderUrl = "https://4fk28ydw23.execute-api.us-east-1.amazonaws.com/payment-stage/create-order";
    const response = await axios.post(orderUrl, { amount: price });

    let order = response.data;

    // If API wraps data in 'body' string, parse it
    if (order?.body) {
      order = JSON.parse(order.body);
    }

    console.log("Parsed order:", order); // Debug

    if (!order?.order_id) {
      console.error("Order ID missing in response:", order);
      //alert("Order creation failed. Please try again.");
      setLoading(false);
      return;
    }

    initPayment(order, price);

  } catch (err) {
    console.error("Order creation failed:", err);
    alert("Order creation failed. Check console for details.");
    setLoading(false);
  }
};


  return (
    <div className="category-container">
      <h1 className="category-title">{category} Products</h1>
      {products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <div className="products-grid">
          {products.map((p, idx) => (
            <div key={idx} className="product-card">
              <img src={p.ImageURL} alt={p.ProductName} className="product-image" />
              <h3 className="product-name">{p.ProductName}</h3>
              {p.Price && <p className="product-price">Price: ₹{p.Price}</p>}
              <button 
                onClick={() => handlePayment(p.Price)} 
                disabled={loading} // Disable during payment
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
