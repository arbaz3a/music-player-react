import React, { useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";

function RightSidebar() {
  const [audiobar, setaudiobar] = useState(30);

  return (
    <div className="h-screen flex flex-col items-center justify-center mt-7 bg-gray-800 rounded-xl text-white p-4">
      {/* song image */}
      <div className="w-60 h-60 rounded-2xl overflow-hidden shadow-lg">
        <img
          src="/images/playlist1.jpeg"
          alt="Song Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* song info like author and title of song */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">Bachpan</h2>
        <p className="text-gray-400 text-sm">Kaavish</p>
      </div>

      {/* prograss bar */}
      <div className="w-full mt-4">
        <input
          type="range"
          min="0"
          max="100"
          value={audiobar}
          onChange={(e) => setaudiobar(e.target.value)}
          className="w-full accent-amber-400 cursor-pointer"
        />
      </div>

      {/* musics all controls */}
      <div className="flex items-center justify-center space-x-6 mt-6">
        <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700">
          <IoPlayBack size={28} />
        </button>
        <button className="p-4 rounded-full bg-amber-500 hover:bg-amber-400">
          <BsFillPauseFill size={30} />
        </button>
        <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700">
          <IoPlayForward size={28} />
        </button>
      </div>
    </div>
  );
}

export default RightSidebar;
