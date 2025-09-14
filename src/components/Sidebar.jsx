import React from "react";
import {
  FiHome,
  FiList,
  FiBarChart2,
  FiHeart,
  FiClock,
  FiCalendar,
  FiRadio,
} from "react-icons/fi";

function Sidebar() {
  return (
    <>
        <div className="text-gray-300 md:w-[16%] sm:w-[14%] w-[12%] h-screen mt-7 flex flex-col gap-6 pr-2">
          {/* top section */}
          <div className="flex flex-col gap-3">
            <div
              className="relative flex items-center gap-3 pl-3 py-2 text-xs font-medium cursor-pointer
                border-l-2 border-transparent hover:border-red-500 hover:bg-gray-900
                transition-all duration-300 ease-in-out
                before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 
                before:w-12 before:bg-gradient-to-r before:from-red-500/60 before:to-transparent 
                before:opacity-0 hover:before:opacity-60 before:transition-all before:duration-500
                group"
            >
              <FiHome className="md:ml-5 text-white group-hover:text-red-500 transition-colors duration-300" />
              <span className="hidden sm:inline text-white group-hover:text-red-500 transition-colors duration-300">
                Feed
              </span>
            </div>

            <div
              className="relative flex items-center gap-3 pl-3 py-2 text-xs font-medium cursor-pointer
                border-l-2 border-transparent hover:border-red-500 hover:bg-gray-900
                transition-all duration-300 ease-in-out
                before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 
                before:w-12 before:bg-gradient-to-r before:from-red-500/60 before:to-transparent 
                before:opacity-0 hover:before:opacity-60 before:transition-all before:duration-500
                group"
            >
              <FiList className="md:ml-5 text-white group-hover:text-red-500 transition-colors duration-300" />
              <span className="hidden sm:inline text-white group-hover:text-red-500 transition-colors duration-300">
                Playlists
              </span>
            </div>
            <div
              className="relative flex items-center gap-3 pl-3 py-2 text-xs font-medium cursor-pointer
                border-l-2 border-transparent hover:border-red-500 hover:bg-gray-900
                transition-all duration-300 ease-in-out
                before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 
                before:w-12 before:bg-gradient-to-r before:from-red-500/60 before:to-transparent 
                before:opacity-0 hover:before:opacity-60 before:transition-all before:duration-500
                group"
            >
              <FiBarChart2 className="md:ml-5 text-white group-hover:text-red-500 transition-colors duration-300" />
              <span className="hidden sm:inline text-white group-hover:text-red-500 transition-colors duration-300">
                Statistics
              </span>
            </div>
          </div>

          {/* middle section */}
          <div className="flex flex-col gap-2">
            <p className="hidden md:block text-xs text-gray-500 uppercase px-3 mb-1">
              Your Music
            </p>
            <div className="flex items-center gap-3 pl-3 py-2 border-l-2 text-xs border-transparent hover:border-lime-200 hover:bg-gray-900 text-white font-medium cursor-pointer">
              <FiHeart className="md:ml-5" />
              <span className="hidden sm:inline">Favourites</span>
            </div>
            <div className="flex items-center gap-3 pl-3 py-2 border-l-2 text-xs border-transparent hover:border-lime-200 hover:bg-gray-900 text-white font-medium cursor-pointer">
              <FiClock className="md:ml-5" />
              <span className="hidden sm:inline">Listen Later</span>
            </div>
            <div className="flex items-center gap-3 pl-3 py-2 border-l-2 text-xs border-transparent hover:border-lime-200 hover:bg-gray-900 text-white font-medium cursor-pointer">
              <FiCalendar className="md:ml-5" />
              <span className="hidden sm:inline">History</span>
            </div>
            <div className="flex items-center gap-3 pl-3 py-2 border-l-2 text-xs border-transparent hover:border-lime-200 hover:bg-gray-900 text-white font-medium cursor-pointer">
              <FiRadio className="md:ml-5" />
              <span className="hidden sm:inline">Podcasts</span>
            </div>
          </div>

          {/* bottom section */}
          <div className="flex flex-col gap-2">
            <p className="hidden md:block text-xs text-gray-500 uppercase px-3 mb-1">
              Your Playlists
            </p>
            <div className="flex items-center gap-3 border-l-2 pl-3 border-transparent hover:border-fuchsia-700 hover:bg-gray-900 py-2 text-xs text-white font-medium cursor-pointer">
              <span className="md:ml-5 w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="hidden sm:inline">Mono</span>
            </div>
            <div className="flex items-center gap-3 border-l-2 border-transparent hover:border-fuchsia-700 hover:bg-gray-900 pl-3 py-2 text-xs text-white font-medium cursor-pointer">
              <span className="md:ml-5 w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="hidden sm:inline">Xapt</span>
            </div>
            <div className="flex items-center gap-3 border-l-2 pl-3 border-transparent hover:border-fuchsia-700 hover:bg-gray-900 py-2 text-xs text-white font-medium cursor-pointer">
              <span className="md:ml-5 w-2 h-2 bg-gray-700 rounded-full"></span>
              <span className="hidden sm:inline">Franz</span>
            </div>
          </div>
        </div>
    </>
  );
}

export default Sidebar;
