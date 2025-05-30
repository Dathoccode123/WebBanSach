import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import BannerWithCategory from "../../components/BannerWithCategory";
import ProductCard2 from "../../components/ProductCard2";
import { getAllBooks } from "../../API/bookApi";
import "../../index.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setProducts(data);
      } catch (err) {
        setProducts([]);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <div className="h-[112px]"></div>
      <BannerWithCategory />

      {/* Sản phẩm mới */}
     <div className="flex justify-center">
  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-fit">
    {products.slice(0, 10).map((product) => (
      <li key={product.id || product._id}>
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
          {products.slice(0, 8).map((product) => (
            <li key={product.id || product._id}>
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
          {products.slice(0, 8).map((product) => (
            <li key={product.id || product._id}>
              <ProductCard2 {...product} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
