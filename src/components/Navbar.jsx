import React from "react";
import { FiSearch } from "react-icons/fi";

function Navbar() {
  return (
    <div className="w-full px-4 sm:px-2 py-3 flex items-center justify-between">
      {/* left section */}
      <div className="text-xl sm:text-lg md:text-2xl lg:text-3xl font-bold text-white">
        Resonix
      </div>

      {/* search bar */}
      <div className="hidden sm:flex items-center bg-gray-700 px-3 py-1 rounded-xl w-1/2 md:w-1/3 lg:w-1/2">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search by artist, music..."
          className="bg-transparent outline-none text-white w-full placeholder-gray-400"
        />
      </div>

      {/* right section */}
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <button className="hidden sm:block px-3 font-mono sm:px-4 py-1 rounded-3xl border-2 border-amber-600 hover:bg-amber-700 text-white cursor-pointer">
          My Channel
        </button>
        <img
          className="rounded-full border-2 p-1 border-amber-500 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-cover cursor-pointer"
          src="/images.png"
          alt="profile"
        />
      </div>
    </div>
  );
}

export default Navbar;
