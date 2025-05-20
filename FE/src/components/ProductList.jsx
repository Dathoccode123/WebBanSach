import React from "react";
import Product from "./Product";
import { products } from "../data/products";
import "../main.css";

const ProductList = () => {
  return (
    <div className="container mx-auto px-8 py-12 max-w-6xl">
      <h2 className="text-2xl font-bold text-blue-500 mb-8">
        Sản Phẩm Nổi Bật
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
