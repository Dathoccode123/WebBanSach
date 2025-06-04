import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import BannerWithCategory from "../../components/BannerWithCategory";
import ProductCard2 from "../../components/ProductCard2";
import { getAllBooks, getBooksByType } from "../../API/bookApi";
import { useLocation } from "react-router-dom";
import "../../index.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const location = useLocation();

  // Lấy type từ query string nếu có
  const type = new URLSearchParams(location.search).get("type");

  // Lấy tất cả sách cho đề xuất và bán chạy
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const data = await getAllBooks();
        setAllBooks(data);
      } catch {
        setAllBooks([]);
      }
    };
    fetchAllBooks();
  }, []);

  // Lấy sách theo thể loại (nếu có type)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let data1 = [];
        if (type) {
          data1 = await getBooksByType(type);
        } else {
          data1 = await getAllBooks();
        }
        setProducts(data1);
      } catch {
        setProducts([]);
      }
    };
    fetchBooks();
  }, [type]);

  // Hàm trộn mảng ngẫu nhiên
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return (
    <>
      <Header />
      <div className="h-[112px]"></div>
      <BannerWithCategory />

      {/* Sản phẩm theo thể loại hoặc mới */}
      <div className="flex justify-center">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-fit">
          {products.slice(0, 10).map((product) => (
            <li key={product.id || product._id}>
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
      </div>

      {/* Luôn lấy từ allBooks */}
      <h2 className="text-2xl font-bold text-blue-700 mt-10 mb-4 text-center uppercase tracking-wide">
        Sách đề xuất
      </h2>
      <div>
        <ul className="flex gap-4 list-none p-0 justify-center">
          {shuffleArray(allBooks).slice(0, 8).map((product) => (
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
          {allBooks.slice(0, 8).map((product) => (
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
