import React, { useEffect, useState } from "react";
import Cards from "../../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data); // Initially, display all items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1); 
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Menu Banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
        <div className="py-48 flex flex-col items-center justify-center">
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost.
            </p>
            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Menu Shop Section */}
      <div className="section-container py-16">
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-3 mb-8">
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={showAll}
              className={`${
                selectedCategory === "all" ? "bg-green text-white" : ""
              } px-4 py-2 rounded-full`}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={`${
                selectedCategory === "salad" ? "bg-green text-white" : ""
              } px-4 py-2 rounded-full`}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={`${
                selectedCategory === "pizza" ? "bg-green text-white" : ""
              } px-4 py-2 rounded-full`}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={`${
                selectedCategory === "soup" ? "bg-green text-white" : ""
              } px-4 py-2 rounded-full`}
            >
              Soup
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={`${
                selectedCategory === "dessert" ? "bg-green text-white" : ""
              } px-4 py-2 rounded-full`}
            >
              Dessert
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={`${
                selectedCategory === "drinks" ? "bg-green text-white" : ""
              } px-4 py-2 rounded-full`}
            >
              Drinks
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-black" />
            <select
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-8">
          {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-full ${
                currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
