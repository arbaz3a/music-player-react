import React, { useState, useEffect, useContext, useRef } from "react";
import { IoPlay, IoPause, IoPlaySkipBack, IoPlaySkipForward, IoVolumeHigh, IoVolumeMute, IoVolumeLow, IoHeart, IoHeartOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import SongsData from "../api/SongsData.json";
import { ContextFunction } from "../context/context";

function RightSidebar() {
  const { index, setindex, isplaying, songref, toggleplaybtn, favorites = [], toggleFavorite, playlists, addToPlaylist } =
    useContext(ContextFunction);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaylistDropdownOpen, setIsPlaylistDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const songObjectIndex = SongsData[index];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPlaylistDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isplaying && songref.current) {
      songref.current.play();
    }
  }, [index, isplaying, songref]);

  useEffect(() => {
    if (songref.current) {
      songref.current.volume = volume;
    }
  }, [volume, songref]);

  const playNext = () => {
    const nextIndex = (index + 1) % SongsData.length;
    setindex(nextIndex);
  };

  const playPrevious = () => {
    let previousIndex = (index - 1 + SongsData.length) % SongsData.length;
    setindex(previousIndex);
  };

  const handleUpdation = (e) => {
    const newTime = Number(e.target.value);
    if (songref.current) {
      songref.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleProgressBar = () => {
    if (songref.current) {
      setCurrentTime(songref.current.currentTime);
      setDuration(songref.current.duration || 0);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (songref.current) {
      songref.current.volume = vol;
    }
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return '0:00';
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <IoVolumeMute className="w-5 h-5 lg:w-4 lg:h-4 text-gray-400 hover:text-white transition-colors" />;
    if (volume < 0.5) return <IoVolumeLow className="w-5 h-5 lg:w-4 lg:h-4 text-gray-400 hover:text-white transition-colors" />;
    return <IoVolumeHigh className="w-5 h-5 lg:w-4 lg:h-4 text-gray-400 hover:text-white transition-colors" />;
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="bg-[#121212] lg:bg-gradient-to-b lg:from-gray-800 lg:to-gray-900 border-t border-gray-800 lg:border lg:border-gray-700/50 lg:rounded-[2rem] lg:mt-7 text-white w-full h-auto flex flex-col p-2 lg:p-8 shadow-2xl transition-all duration-300 relative overflow-hidden group">
      
      {/* Background blur effect for desktop */}
      <div className="hidden lg:block absolute -top-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="hidden lg:block absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <audio
        ref={songref}
        src={songObjectIndex.link}
        onEnded={playNext}
        onTimeUpdate={handleProgressBar}
        onLoadedMetadata={handleProgressBar}
      />

      {/* MOBILE VIEW */}
      <div className="flex lg:hidden flex-col w-full max-w-[1200px] mx-auto">
        <div className="w-full flex items-center gap-2 mb-2 px-1">
          <span className="text-[10px] text-gray-400 w-8 text-right font-medium">{formatTime(currentTime)}</span>
          <div className="relative flex-1 flex items-center h-4 group-touch">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleUpdation}
              className="w-full accent-amber-500 cursor-pointer h-1 bg-gray-700 appearance-none rounded-lg absolute inset-y-auto"
              style={{ background: `linear-gradient(to right, #f59e0b ${(currentTime / (duration || 1)) * 100}%, #374151 ${(currentTime / (duration || 1)) * 100}%)` }}
            />
          </div>
          <span className="text-[10px] text-gray-400 w-8 font-medium">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-between w-full px-1">
          <div className="flex items-center gap-2 max-w-[35%] overflow-hidden">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-md overflow-hidden shadow-lg flex-shrink-0">
              <img src={songObjectIndex.thumbnail} alt={songObjectIndex.title} className="w-full h-full object-cover" />
            </div>
            <div className="truncate pr-1">
              <h2 className="text-xs sm:text-sm font-bold truncate text-white">{songObjectIndex.title}</h2>
              <p className="text-[10px] text-gray-400 truncate">{songObjectIndex.artist}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-shrink-0 mx-1">
            <button 
              className={`p-1 mr-1 transition-colors ${favorites.includes(songObjectIndex.id) ? "text-green-500" : "text-gray-400"}`}
              onClick={() => toggleFavorite?.(songObjectIndex.id)}
            >
              {favorites.includes(songObjectIndex.id) ? <IoHeart className="w-5 h-5" /> : <IoHeartOutline className="w-5 h-5" />}
            </button>
            <button className="p-1 text-gray-300 active:text-white" onClick={playPrevious}>
              <IoPlaySkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="flex-shrink-0 aspect-square h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-amber-500 text-black active:bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20" onClick={toggleplaybtn}>
              {isplaying ? <IoPause className="w-4 h-4 sm:w-5 sm:h-5" /> : <IoPlay className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />}
            </button>
            <button className="p-1 text-gray-300 active:text-white" onClick={playNext}>
              <IoPlaySkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="flex items-center justify-end gap-1 flex-1 min-w-0 pr-1">
            <button onClick={toggleMute} className="flex-shrink-0">{getVolumeIcon()}</button>
            <div className="w-12 sm:w-16 flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-white h-1 bg-gray-700 appearance-none rounded-lg"
                 style={{
                  background: `linear-gradient(to right, #ffffff ${volume * 100}%, #374151 ${volume * 100}%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>


      {/* DESKTOP VIEW */}
      <div className="hidden lg:flex flex-col w-full h-full relative z-10">
        
        {/* Album Art Premium Display */}
        <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] mb-8 relative group cursor-pointer transition-transform duration-500 hover:scale-[1.02]">
          <img
            src={songObjectIndex.thumbnail}
            alt={songObjectIndex.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
        </div>

        {/* Info */}
        <div className="text-center w-full px-2 mb-6 cursor-default">
          <h2 className="text-2xl font-extrabold truncate text-white tracking-wide hover:text-amber-400 transition-colors drop-shadow-md">
            {songObjectIndex.title}
          </h2>
          <p className="text-base text-gray-400 font-medium truncate mt-1.5 hover:text-gray-300 transition-colors">
            {songObjectIndex.artist}
          </p>
        </div>

        {/* Timeline Desktop */}
        <div className="w-full px-2 mb-8">
           <div className="relative flex items-center h-4 group transition-all">
             <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleUpdation}
              className="w-full accent-amber-500 cursor-pointer h-1.5 transition-all bg-gray-700 appearance-none rounded-lg absolute inset-y-1/2 -translate-y-1/2"
              style={{
                background: `linear-gradient(to right, #f59e0b ${(currentTime / (duration || 1)) * 100}%, #374151 ${(currentTime / (duration || 1)) * 100}%)`
              }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 px-1">
            <span className="text-[11px] font-semibold tracking-wider text-gray-400">{formatTime(currentTime)}</span>
            <span className="text-[11px] font-semibold tracking-wider text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls Desktop */}
        <div className="flex items-center justify-between w-full mb-6 px-2">
          {/* Heart */}
          <button 
            className={`p-1.5 rounded-full transition-all cursor-pointer flex-shrink-0 ${
              favorites.includes(songObjectIndex.id) ? "text-green-500 hover:text-green-400 hover:scale-110" : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
            onClick={() => toggleFavorite?.(songObjectIndex.id)}
          >
            {favorites.includes(songObjectIndex.id) ? <IoHeart className="w-5 h-5" /> : <IoHeartOutline className="w-5 h-5" />}
          </button>

          {/* Play Controls */}
          <div className="flex items-center justify-center gap-2">
            <button
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              onClick={playPrevious}
            >
              <IoPlaySkipBack className="w-5 h-5" />
            </button>
            
            <button
              className="flex-shrink-0 aspect-square h-12 w-12 rounded-full bg-amber-500 text-black transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] cursor-pointer flex items-center justify-center mx-1"
              onClick={toggleplaybtn}
            >
              {isplaying ? (
                <IoPause className="w-6 h-6" />
              ) : (
                <IoPlay className="w-6 h-6 ml-0.5" />
              )}
            </button>
            
            <button
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              onClick={playNext}
            >
              <IoPlaySkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Add to Playlist */}
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button 
              className="p-1.5 rounded-full transition-all cursor-pointer text-gray-400 hover:text-white hover:bg-white/10"
              onClick={() => setIsPlaylistDropdownOpen(!isPlaylistDropdownOpen)}
            >
              <FiPlus className="w-5 h-5" />
            </button>
            {isPlaylistDropdownOpen && (
              <div className="absolute right-0 bottom-full mb-3 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                <div className="p-2 border-b border-gray-700 text-xs font-semibold text-gray-400">Add to Playlist</div>
                <div className="max-h-48 overflow-y-auto custom-scrollbar">
                  {playlists?.length > 0 ? playlists.map(p => (
                    <button
                      key={p.id}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToPlaylist(p.id, songObjectIndex.id);
                        setIsPlaylistDropdownOpen(false);
                      }}
                    >
                      {p.name}
                    </button>
                  )) : (
                    <div className="px-4 py-2 text-sm text-gray-500">No playlists yet</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Volume Level Desktop */}
        <div className="flex items-center justify-center gap-3 px-4 w-full opacity-80 hover:opacity-100 transition-opacity">
          <button onClick={toggleMute} className="focus:outline-none">{getVolumeIcon()}</button>
          <div className="w-full max-w-[120px] flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-white hover:accent-amber-500 cursor-pointer h-1 bg-gray-700 appearance-none rounded-lg transition-colors"
               style={{
                background: `linear-gradient(to right, #ffffff ${volume * 100}%, #374151 ${volume * 100}%)`
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default RightSidebar;
