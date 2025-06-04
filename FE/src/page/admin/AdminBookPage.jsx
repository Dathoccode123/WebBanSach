import React, { useState } from "react";
import AdminPage from "./AdminPage";
import AdminBookManager from "../../components/AdminBookManager";
import { searchBook } from "../../API/search";

const AdminBookPage = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    try {
      const results = await searchBook(search);
      setSearchResults(results);
    } catch {
      alert("Không tìm thấy sách phù hợp!");
      setSearchResults([]);
    }
  };

  return (
    <AdminPage>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm sách..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tìm kiếm
        </button>
      </form>
      <AdminBookManager books={searchResults} />
    </AdminPage>
  );
};

export default AdminBookPage;
