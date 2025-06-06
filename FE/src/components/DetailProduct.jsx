import React, { useEffect, useState } from "react";
import "../index.css";
import { addToCart } from "../API/cartApi";
import { useNavigate } from "react-router-dom";

const DetailProduct = ({
  image,
  title,
  salePrice,
  price,
  description,
  _id,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setUserId(storedUser._id);
    }
  }, []);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = async () => {
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      return;
    }
    try {
      await addToCart({ userId, bookId: _id, quantity });
      alert("Đã thêm vào giỏ hàng!");
    } catch (err) {
      alert("Thêm vào giỏ hàng thất bại!");
    }
  };

  const handleBuyNow = () => {
    navigate(`/pay/${_id}`);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-10 flex gap-12 mt-12 border-2 border-blue-400">
      <div className="w-1/2 flex items-center justify-center">
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt={title}
          className="w-full h-[480px] object-contain rounded-xl"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-blue-600 text-2xl font-bold">
            {salePrice?.toLocaleString()}₫
          </span>
          <span className="text-gray-400 line-through text-lg">
            {price?.toLocaleString()}₫
          </span>
        </div>
        <p className="mb-8 text-gray-700 text-base border border-blue-200 bg-blue-50 rounded-lg p-4">
          {description}
        </p>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-semibold">Số lượng:</span>
          <button
            className="w-8 h-8 rounded bg-gray-200 text-lg font-bold hover:bg-gray-300"
            onClick={handleDecrease}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-12 text-center border rounded"
          />
          <button
            className="w-8 h-8 rounded bg-gray-200 text-lg font-bold hover:bg-gray-300"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold text-lg"
            onClick={handleBuyNow}
          >
            Mua ngay
          </button>
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
