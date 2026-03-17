import React, { useContext, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { ContextFunction } from "../context/context";

function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(ContextFunction);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <div className="w-full px-4 sm:px-2 py-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {/* left section */}
        <div className="text-xl sm:text-lg md:text-2xl lg:text-3xl font-bold text-white">
          Resonix
        </div>

        {/* search bar - desktop */}
        <div className="hidden sm:flex items-center bg-gray-800 border border-gray-700 focus-within:border-amber-500 transition-colors px-4 py-1.5 rounded-full w-1/2 md:w-1/3 lg:w-1/2 shadow-inner">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by artist, music..."
            className="bg-transparent outline-none text-white w-full placeholder-gray-500 text-sm"
          />
        </div>

        {/* right section */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* mobile search toggle */}
          <button
            className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          >
            {mobileSearchOpen ? <FiX className="w-5 h-5" /> : <FiSearch className="w-5 h-5" />}
          </button>
          <button className="hidden sm:block px-3 font-mono sm:px-4 py-1 rounded-3xl border-2 border-amber-600 hover:bg-amber-700 text-white cursor-pointer">
            My Channel
          </button>
          <img
            className="rounded-full border-2 p-1 border-amber-500 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-cover cursor-pointer"
            src="/images/images.png"
            alt="profile"
          />
        </div>
      </div>

      {/* mobile search bar */}
      {mobileSearchOpen && (
        <div className="sm:hidden flex items-center bg-gray-800 border border-gray-700 focus-within:border-amber-500 transition-colors px-4 py-2 rounded-full shadow-inner">
          <FiSearch className="text-gray-400 mr-2 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by artist, music..."
            className="bg-transparent outline-none text-white w-full placeholder-gray-500 text-sm"
            autoFocus
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-white ml-2 flex-shrink-0">
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
