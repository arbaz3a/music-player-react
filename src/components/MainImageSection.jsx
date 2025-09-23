import React from "react";
import SongsData from '../api/SongsData.json'
import { GiPlayButton } from "react-icons/gi";



function MainImageSection() {

  let arr = ["All Song", "Favourite Song", "Popular Song", "Artists"];
  const arr2 = [
    {
      image: "/images/playlist1.jpeg",
      title: "Hip Hop",
      info: "31 tracks · 1h 45m",
      date: "13 June 2024",
    },
    {
      image: "/images/playlist2.jpeg",
      title: "Chill Vibes",
      info: "25 tracks · 2h 10m",
      date: "02 July 2024",
    },
    {
      image: "/images/playlist3.jpeg",
      title: "Workout Hits",
      info: "40 tracks · 1h 55m",
      date: "28 August 2024",
    },
    {
      image: "/images/playlist4.jpeg",
      title: "Lo-Fi Beats",
      info: "20 tracks · 1h 20m",
      date: "10 September 2024",
    },
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
      <div className="border-2 border-t-amber-800 border-transparent text-white p-2 mt-2">
        {arr2.map((label, i) => (
          <div key={i} className="flex items-center gap-4 mb-3 hover:bg-gray-900 cursor-pointer transition-all duration-300 ease-in-out">
            {/* image and name  */}
            <div className="flex items-center gap-3 w-56 sm:w-70">
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden sm:w-[32px] sm:h-[32px] flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={label.image}
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
                {label.info}
              </p>
              <p className="text-xs text-gray-400 hidden md:block truncate">
                {label.date}
              </p>
            </div>
            {/* play button */}
            <GiPlayButton className="text-xl text-white cursor-pointer hover:text-amber-600" />
          </div>
        ))}
      </div>

    </div>
  );
}

export default MainImageSection;
