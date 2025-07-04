import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import BookShelfCard from "./BookShelfCard";
import img1 from '../assets/shelfBanner.jpg'

const BookShelf = () => {
  const bookShelf2 = useLoaderData();
  const [bookShelf, setBookShelf] = useState(bookShelf2);
  const [searchText, setSearchText] = useState("");
  const [filterbook, setFilterBook] = useState("");

  useEffect(() => {
    let filtered = bookShelf2;

    // Filter by reading_status
    if (filterbook) {
      filtered = filtered.filter(book =>
        book.reading_status.toLowerCase() === filterbook.toLowerCase()
      );
    }

    // Filter by title search
    if (searchText) {
      filtered = filtered.filter(book =>
        book.booktitle.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setBookShelf(filtered);
  }, [searchText, filterbook, bookShelf2]);

  return (
    <div className="max-w-7xl mx-auto px-4">
<div className="relative  top-25 bottom-15">
  <img
    className="mx-auto rounded-lg shadow-md "
    src={img1}
    alt="Bookshelf Illustration"
  />
  {/* Text overlay on the image */}
  <div
    className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 rounded-lg"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // semi-transparent black bg
  >
    <h1 className="text-white text-4xl font-bold mb-2">Bookshelf</h1>
    <p className="text-white hidden md:block text-lg max-w-xl">
      Here you can store all your books, view your reading list, and find detailed information about each book in one place.
    </p>
  </div>
</div>


<br />
<br />

      {/* Search & Filter */}
      <div className="mt-20 mb-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Search Input */}
        <div className="md:col-span-8 col-span-12">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-4 h-4 text-gray-500"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </span>
            <input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="md:col-span-4 col-span-12">
          <select
            value={filterbook}
            onChange={(e) => setFilterBook(e.target.value)}
            className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select all</option>
            <option value="Read">Read</option>
            <option value="Reading">Reading</option>
            <option value="Want to Read">Want to Read</option>
          </select>
        </div>
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-6">
        {bookShelf.map((book) => (
          <BookShelfCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
