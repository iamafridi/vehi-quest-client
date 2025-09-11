import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { categories } from "../Categories/CategoriesData";

const SearchBar = ({ onSearch, defaultCategory = "" }) => {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [range, setRange] = useState({ min: "", max: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCategory(defaultCategory);
  }, [defaultCategory]);

  const handleSearch = () => {
    onSearch({
      location,
      category,
      min: range.min,
      max: range.max,
    });
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 p-5 md:p-6 bg-black/20 backdrop-blur-md rounded-xl shadow-lg shadow-cyan-500 mt-10 items-center justify-center">

      {/* Location Input */}
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 min-w-[180px] px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
      />

      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="flex-1 min-w-[160px] px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.label} value={cat.label}>
            {cat.label}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <div className="flex gap-2 flex-wrap justify-center md:justify-start">
        <input
          type="number"
          placeholder="Min"
          value={range.min}
          onChange={(e) => setRange({ ...range, min: e.target.value })}
          className="w-20 px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />
        <input
          type="number"
          placeholder="Max"
          value={range.max}
          onChange={(e) => setRange({ ...range, max: e.target.value })}
          className="w-20 px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>

  );
};

export default SearchBar;
