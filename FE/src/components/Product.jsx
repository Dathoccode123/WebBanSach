import React from "react";
import { useNavigate } from "react-router-dom";
import "../main.css";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const {
    id,
    image,
    name,
    originalPrice,
    salePrice,
    quantitySold,
    discountPercentage,
  } = product;

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="bg-gradient-to-b from-white to-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 cursor-pointer"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="relative p-2">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-contain transition-transform duration-300 hover:scale-110"
        />
        {/* Discount Badge */}
        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          -{discountPercentage}%
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-base font-bold text-red-500">
            {salePrice.toLocaleString("vi-VN")}đ
          </span>
          <span className="text-xs text-gray-500 line-through">
            {originalPrice.toLocaleString("vi-VN")}đ
          </span>
        </div>

        {/* Quantity Sold */}
        <div className="text-xs text-gray-600">
          Đã bán: {quantitySold.toLocaleString("vi-VN")}
        </div>
      </div>
    </div>
  );
};

export default Product;
