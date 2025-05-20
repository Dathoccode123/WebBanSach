import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import "../main.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Find the product with the matching ID
  const product = products.find((p) => p.id === parseInt(id));

  // If product not found, show a message
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Sản phẩm không tồn tại
        </h1>
        <p className="mt-4 text-gray-600">
          Vui lòng quay lại trang chủ để xem các sản phẩm khác.
        </p>
      </div>
    );
  }

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(100, value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(`Adding ${quantity} ${product.name} to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="grid grid-cols-4 gap-2">
            {/* Thumbnail images would go here */}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-600">{product.name}</h1>

          {/* Price Section */}
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-red-500">
              {product.salePrice.toLocaleString("vi-VN")}đ
            </span>
            <span className="text-lg text-gray-500 line-through">
              {product.originalPrice.toLocaleString("vi-VN")}đ
            </span>
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              -{product.discountPercentage}%
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border ">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-1 hover:text-primary  bg-gray-500 text-white"
              >
                -
              </button>
              <input
               type="text"
                min="1"
                max="100"
                value={quantity}
                
                className="w-16 text-center  py-1"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:text-primary bg-red-500"
              >
                +
              </button>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">Tổng tiền:</div>
              <div className="text-xl font-bold text-red-500">
                {(product.salePrice * quantity).toLocaleString("vi-VN")}đ
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Thêm vào giỏ hàng
            </button>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Mô tả sản phẩm
            </h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-600">Tác giả:</span>
              <span className="ml-2 text-gray-800">{product.author}</span>
            </div>
            <div>
              <span className="text-gray-600">Nhà xuất bản:</span>
              <span className="ml-2 text-gray-800">{product.publisher}</span>
            </div>
            <div>
              <span className="text-gray-600">Năm xuất bản:</span>
              <span className="ml-2 text-gray-800">{product.publishYear}</span>
            </div>
            <div>
              <span className="text-gray-600">Số trang:</span>
              <span className="ml-2 text-gray-800">{product.pages}</span>
            </div>
            <div>
              <span className="text-gray-600">Ngôn ngữ:</span>
              <span className="ml-2 text-gray-800">{product.language}</span>
            </div>
            <div>
              <span className="text-gray-600">Hình thức:</span>
              <span className="ml-2 text-gray-800">{product.format}</span>
            </div>
          </div>

          {/* Quantity Sold */}
          <div className="text-gray-600">
            Đã bán: {product.quantitySold.toLocaleString("vi-VN")} cuốn
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              Thêm vào giỏ hàng
            </button>
            <button className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
