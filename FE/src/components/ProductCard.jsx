import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { addToCart } from "../API/cartApi";

const ProductCard = ({ image, name, salePrice, price, _id }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setUserId(storedUser._id);
    }
  }, []);
  console.log("User ID:", userId);

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      return;
    }
    try {
      await addToCart({ userId, bookId: _id, quantity: 1 });
      alert("Đã thêm vào giỏ hàng!");
    } catch {
      alert("Thêm vào giỏ hàng thất bại!");
    }
  };

  return (
    <Link
      to={`/detail/${_id}`}
      className="bg-white rounded-xl shadow-lg p-4 w-64 hover:shadow-2xl transition flex flex-col cursor-pointer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="flex-1 flex items-center justify-center mb-3">
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt={name}
          className="h-40 object-contain border"
        />
      </div>
      <h3 className="text-base font-semibold mb-1 line-clamp-2 min-h-[48px]">
        {name}
      </h3>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-blue-600 font-bold text-lg">
          {salePrice.toLocaleString()}₫
        </span>
        <span className="text-gray-400 line-through text-sm">
          {price.toLocaleString()}₫
        </span>
      </div>
      <div className="flex gap-2 mt-auto">
        <button
          className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
          onClick={(e) => e.preventDefault()}
        >
          Mua ngay
        </button>
        <button
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
