import React from "react";
import { NavLink } from "react-router-dom";

function MainImageSection() {
  let arr = [
    { label: "All Songs", path: "allsongs" },
    { label: "Favourite Song", path: "favourites" },
    { label: "Artists", path: "artists" },
    { label: "About", path: "about" },
  ];
  return (
    <div className="mt-2 py-2.5 w-full">
      {/* image section */}
      <div className="flex gap-3 w-full justify-center">
        <img
          className="w-[37%] rounded-2xl object-cover"
          src="/images/playlistimage.jpg"
          alt="playlistcard"
        />
        <img
          className="w-[59%] rounded-2xl object-cover"
          src="/images/kavishimage2.jpeg"
          alt="kavish"
        />
      </div>

      {/* state navbar */}
      <div className="mt-7 flex flex-wrap sm:flex-nowrap gap-1 sm:gap-2 md:gap-2.5 h-full text-white px-2 overflow-x-auto">
        {arr.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `relative flex items-center text-[10px] sm:text-xs font-mono
     border-t-2 transition-all duration-300 ease-in-out px-2 sm:px-3 pb-1.5
     before:content-[''] before:absolute before:left-0 before:right-0 before:top-0
     before:h-6 before:bg-gradient-to-b before:from-red-500/60 before:to-transparent
     before:opacity-0 before:transition-all before:duration-500
     group whitespace-nowrap pt-3
     ${
       isActive
         ? "border-red-500 text-red-500 bg-gray-900 before:opacity-60"
         : "border-transparent text-white hover:border-red-500 hover:text-red-500 hover:bg-gray-900 hover:before:opacity-60"
     }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default MainImageSection;
