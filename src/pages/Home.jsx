import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const categories = [
  { name: "ElectricalAppliance", img: "https://static-assets.business.amazon.com/assets/in/24th-jan/705_Website_Blog_Appliances_2880x960.jpg.transform/2880x960/image.jpg" },
  { name: "Furniture", img: "https://www.realsimple.com/thmb/S83UM3lA3tJ24XT_husW2BddPuc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/furniture-styles-GettyImages-1467984982-512fed4077b646eabbc187619554d517.jpg" },
  { name: "KitchenAppliance", img: "https://femina.wwmindia.com/content/2020/nov/kitchenshutterstock14389512561605268523.jpg" },
  { name: "Laptop", img: "https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopstopicpage-2048px-3685-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp" },
  { name: "Mobile", img: "https://etimg.etb2bimg.com/photo/98913352.cms" }
];

const Home = () => {
  const navigate = useNavigate();

  const goToCategory = (cat) => {
    navigate(`/category/${cat}`);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">E-Commerce Categories</h1>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => goToCategory(cat.name)}
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="category-image"
            />
            <div className="category-name">{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;