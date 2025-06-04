import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import DetailProduct from "../../components/DetailProduct";
import ProductCard2 from "../../components/ProductCard2";
import { getAllBooks, getBookById } from "../../API/bookApi";
import "../../index.css";

const DetailProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestBooks, setSuggestBooks] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getBookById(id);
        setProduct(data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  useEffect(() => {
    // Gợi ý sách liên quan
    const fetchSuggest = async () => {
      try {
        const all = await getAllBooks();
        // Nếu có type, lọc cùng thể loại, loại trừ chính sản phẩm này
        let filtered = all.filter((b) => b._id !== id);
        if (product && product.type) {
          filtered = filtered.filter(
            (b) => b.type === product.type && b._id !== id
          );
        }
        // Random 4 sách
        for (let i = filtered.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }
        setSuggestBooks(filtered.slice(0, 4));
      } catch {
        setSuggestBooks([]);
      }
    };
    fetchSuggest();
  }, [id, product]);

  return (
    <>
      <Header />
      <div className="h-[112px]"></div>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 py-10">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center mt-10">Đang tải...</div>
          ) : product ? (
            // Bỏ class bg-white nếu muốn nền trong suốt, và bỏ luôn shadow
            <div className="p-0 sm:p-8">
              <DetailProduct {...product} />
            </div>
          ) : (
            <div className="text-center text-red-500 mt-10">
              Không tìm thấy sản phẩm!
            </div>
          )}
        </div>
        {!loading && product && (
          <div className="max-w-5xl mx-auto mt-12">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-5 bg-blue-600 rounded-full"></span>
              Gửi đánh giá cho sản phẩm
            </h3>
            <div className="bg-white rounded-lg p-6 mb-10 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
              <textarea
                className="border rounded p-3 w-full sm:w-2/3 min-h-[60px] focus:ring-2 focus:ring-blue-200"
                placeholder="Nhập đánh giá của bạn về sản phẩm này..."
              />
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold mt-2 sm:mt-0"
                // onClick={handleSendReview} // Bạn có thể thêm hàm xử lý gửi đánh giá ở đây
              >
                Gửi đánh giá
              </button>
            </div>
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-5 bg-blue-600 rounded-full"></span>
              Có thể bạn quan tâm
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {suggestBooks.map((book) => (
                <ProductCard2 key={book._id} {...book} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailProductPage;
