import React from "react";
import Header from "../../components/Header";
import products from "../../data";
import ProductCard from "../../components/ProductCard";
import BannerWithCategory from "../../components/BannerWithCategory";
import ProductCard2 from "../../components/ProductCard2";
import "../../index.css";

const HomePage = () => {
  return (
    <>
      <Header ></Header>
      <div className="h-[112px]"></div>; 
      <BannerWithCategory></BannerWithCategory>
      <div>
        <ul className="flex gap-4 list-none p-0 justify-center">
          {products.map((product, index) => (
            <li key={index}>
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
      </div>
      <h2 className="text-2xl font-bold text-blue-700 mt-10 mb-4 text-center uppercase tracking-wide">
        Sách đề xuất
      </h2>
      <div>
        <ul className="flex gap-4 list-none p-0 justify-center">
          {products.map((product, index) => (
            <li key={index}>
              <ProductCard2 {...product} />
            </li>
          ))}
        </ul>
      </div>
      <h2 className="text-2xl font-bold text-green-700 mt-10 mb-4 text-center uppercase tracking-wide">
        Sách bán chạy
      </h2>
      <div>
        <ul className="flex gap-4 list-none p-0 justify-center">
          {products.map((product, index) => (
            <li key={index}>
              <ProductCard2 {...product} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default HomePage;