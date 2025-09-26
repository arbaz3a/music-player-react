import React, {useState, useEffect, useContext } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import SongsData from "../api/SongsData.json";
import { ContextFunction } from "../context/context";

function RightSidebar() {
  const {index, setindex, isplaying, songref, toggleplaybtn} = useContext(ContextFunction)
  const [progressbar, setProgressbar] = useState(0);
  const songObjectIndex = SongsData[index]; // song object array index

  // while switching song, song auto play
  useEffect(() => {
    if (isplaying && songref.current) {
      songref.current.play();
    }
  }, [index]);

  // play next song portion
  const playNext = () => {
    const nextIndex = (index + 1) % SongsData.length;
    setindex(nextIndex);
    setProgressbar(0);
  };

  // play previous song portion
  const playPrevious = () => {
    let previousIndex = (index - 1 + SongsData.length) % SongsData.length;
    setindex(previousIndex);
    setProgressbar(0);
  };

  // handle updation portion
  const handleUpdation = (e) => {
    // drag slider manually to jump in song shhhiiiiii
    const newProgressbar_value = e.target.value;
    let newduration = songref.current.duration;
    songref.current.currentTime = (newProgressbar_value / 100) * newduration; // calculate which point in the song to jump
    setProgressbar(newProgressbar_value);
  };

  // handle prograss bar
  let handleProgressBar = () => {
    // move progress bar automatically while playing
    const currTime = songref.current.currentTime;
    const duration = songref.current.duration;
    setProgressbar((currTime / duration) * 100 || 0); // gives fraction of how much has been played
  };

  return (
    <div className="h-[62%] flex flex-col items-center mt-7 bg-gray-800 rounded-xl text-white p-4">
      <audio
        ref={songref}
        src={songObjectIndex.link}
        onEnded={playNext}
        onTimeUpdate={handleProgressBar}
      />

      {/* song image */}
      <div className="w-60 h-60 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={songObjectIndex.thumbnail}
          alt={songObjectIndex.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* song info like author and title of song */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">{songObjectIndex.title}</h2>
        <p className="text-gray-400 text-sm">{songObjectIndex.artist}</p>
      </div>

      {/* prograss bar */}
      <div className="w-full mt-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progressbar}
          onChange={handleUpdation}
          className="w-full accent-amber-400 cursor-pointer"
        />
      </div>

      {/* music all controls */}
      <div className="flex items-center justify-center space-x-6 mt-6">
        <button
          className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 hover:cursor-pointer"
          onClick={playPrevious}
        >
          <IoPlayBack size={12} />
        </button>
        <button
          className="p-4 rounded-full bg-amber-500 hover:bg-amber-400 hover:cursor-pointer"
          onClick={toggleplaybtn}
        >
          {isplaying ? (
            <BsFillPauseFill size={16} />
          ) : (
            <BsFillPlayFill size={16} />
          )}
        </button>
        <button
          className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 hover:cursor-pointer"
          onClick={playNext}
        >
          <IoPlayForward size={12} />
        </button>
      </div>
      
    </div>
  );
}

export default RightSidebar;
