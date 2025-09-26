import React, { useContext } from "react";
import SongsData from "../api/SongsData.json";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { ContextFunction } from "../context/context";

function MainImageSection() {
  const { setindex, index, isplaying, toggleplaybtn } =
    useContext(ContextFunction);

  const handlePlayClick = (id) => {
    if (index === id - 1) {
      toggleplaybtn();
    } else {
      setindexByID(id);
      toggleplaybtn();
    }
  };

  const setindexByID = (id) => {
    setindex(id - 1);
  };

  let arr = ["All Song", "Favourite Song", "Artists", "About"];

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
        {arr.map((label, i) => (
          <div
            key={i}
            className="relative flex items-center text-[10px] sm:text-xs font-mono cursor-pointer
              border-t-2 border-transparent hover:border-red-500 hover:bg-gray-900
              transition-all duration-300 ease-in-out px-2 sm:px-3 pb-1.5
              before:content-[''] before:absolute before:left-0 before:right-0 before:top-0
              before:h-6 before:bg-gradient-to-b before:from-red-500/60 before:to-transparent
              before:opacity-0 hover:before:opacity-60 before:transition-all before:duration-500
              group whitespace-nowrap"
          >
            <div className="pt-3 text-white group-hover:text-red-500 transition-colors duration-300">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* playlist part */}
      <div className="border-2 border-t-amber-800 border-transparent text-white p-2 mt-2 h-47 overflow-y-auto rounded-md">
        {SongsData.map((label) => (
          <div
            key={label.id}
            className="flex items-center justify-between mb-3 transition-all duration-300 ease-in-out"
          >
            {/* left section of div song */}
            <div
              onClick={() => setindexByID(label.id)}
              className={`flex items-center gap-4 flex-1 cursor-pointer rounded-md px-2 py-1 ${
                index === label.id - 1 ? "bg-gray-900" : "hover:bg-gray-900"
              }`}
            >
              {/* image and name  */}
              <div className="flex items-center gap-3 w-56 sm:w-70">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden sm:w-[32px] sm:h-[32px] flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={label.thumbnail}
                    alt={`${label.title} cover`}
                  />
                </div>
                <p className="font-semibold text-base sm:text-sm truncate">
                  {label.title}
                </p>
              </div>
              {/* info and date */}
              <div className="flex-1 min-w-0 grid grid-cols-2 items-center gap-4">
                <p className="text-xs text-gray-300 hidden md:block truncate">
                  {label.duration}
                </p>
                <p className="text-xs text-gray-400 hidden md:block truncate">
                  {label.releaseDate}
                </p>
              </div>
            </div>

            {/* right section of div */}
            {/* play button */}
            <div className="ml-3 ">
              {index === label.id - 1 && isplaying ? (
                <BsFillPauseFill
                  className="text-xl text-amber-700 cursor-pointer"
                  onClick={() => handlePlayClick(label.id)}
                />
              ) : (
                <BsFillPlayFill
                  className={`text-xl cursor-pointer ${
                    index === label.id - 1
                      ? "text-amber-700"
                      : "text-white hover:text-amber-700"
                  }`}
                  onClick={() => handlePlayClick(label.id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default MainImageSection;
