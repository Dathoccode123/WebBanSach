import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import BannerWithCategory from "../../components/BannerWithCategory";
import ProductCard from "../../components/ProductCard";
import { searchBook } from "../../API/search";

const SearchPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy query từ URL
  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await searchBook(query);
        setProducts(result);
      } catch {
        setProducts([]);
      }
      setLoading(false);
    };
    if (query) fetchData();
    else setLoading(false);
  }, [query]);

  return (
    <>
      <Header />
      <div className="h-[112px]"></div>
      <BannerWithCategory />
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold mb-6">
          Kết quả tìm kiếm cho: <span className="text-blue-600">{query}</span>
        </h2>
        {loading ? (
          <div>Đang tải...</div>
        ) : products.length === 0 ? (
          <div className="text-gray-500">Không tìm thấy sản phẩm phù hợp.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCard
                key={item._id}
                image={item.image}
                name={item.name}
                salePrice={item.salePrice}
                price={item.price}
                _id={item._id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
