import React from "react";

function MainImageSection() {
  let arr = ["Playlists", "Albums", "Artists", "Streams"];

  return (
    <div className="mt-2 py-2.5 w-full">
      {/* image section */}
      <div className="flex gap-3 w-full justify-center">
        <img
          className="w-[37%] rounded-2xl object-cover"
          src="/playlistimage.jpg"
          alt="playlistcard"
        />
        <img
          className="w-[59%] rounded-2xl object-cover"
          src="/kavishimage2.jpeg"
          alt="kavish"
        />
      </div>

      {/* state bar */}
      <div className="mt-7 flex flex-wrap sm:flex-nowrap gap-1 sm:gap-2 md:gap-2.5 h-full text-white px-2 overflow-x-auto">
        {arr.map((label, i) => (
          <div
            key={i}
            className="relative flex items-center text-[10px] sm:text-xs font-mono cursor-pointer
              border-t-2 border-transparent hover:border-amber-500 hover:bg-gray-900
              transition-all duration-300 ease-in-out px-2 sm:px-3 pb-1.5
              before:content-[''] before:absolute before:left-0 before:right-0 before:top-0
              before:h-6 before:bg-gradient-to-b before:from-amber-500/60 before:to-transparent
              before:opacity-0 hover:before:opacity-60 before:transition-all before:duration-500
              group whitespace-nowrap"
          >
            <div className="pt-3 text-white group-hover:text-red-500 transition-colors duration-300">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainImageSection;
