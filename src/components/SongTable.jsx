import React, { useContext, useState, useRef, useEffect } from "react";
import { ContextFunction } from "../context/context";
import { IoPlay, IoPause, IoHeart, IoHeartOutline, IoTrashOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

const GRID_COLS_HEADER = "grid-cols-[minmax(200px,2fr)_minmax(80px,1fr)_minmax(80px,1fr)_120px]";
const GRID_COLS_ROW_MD = "md:grid-cols-[minmax(200px,2fr)_minmax(80px,1fr)_minmax(80px,1fr)_120px]";

function SongTable({ songs, emptyTitle, emptySubtitle, showAddToPlaylist = false, showRemoveFromPlaylist = false, onRemoveFromPlaylist }) {
  const { setindex, index, isplaying, toggleplaybtn, favorites = [], toggleFavorite, playlists, addToPlaylist } =
    useContext(ContextFunction);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePlayClick = (id) => {
    if (index === id - 1) {
      toggleplaybtn();
    } else {
      setindex(id - 1);
      toggleplaybtn();
    }
  };

  return (
    <>
      {/* Table Header */}
      <div className={`hidden md:grid ${GRID_COLS_HEADER} gap-3 px-3 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-800 mb-2`}>
        <div className="pl-2">Title</div>
        <div className="text-left">Duration</div>
        <div className="text-left">Release Date</div>
        <div className="text-center"></div>
      </div>

      {/* Song List */}
      <div className="flex-1 overflow-y-auto max-h-[600px] lg:max-h-none custom-scrollbar pr-1 pb-2">
        {songs.length > 0 ? (
          <div className="space-y-1">
            {songs.map((song) => (
              <div
                key={song.id}
                className={`grid grid-cols-[1fr_auto] ${GRID_COLS_ROW_MD} items-center gap-3 px-3 py-2 rounded-lg transition-colors group cursor-pointer ${
                  index === song.id - 1
                    ? "bg-gray-800/80 hover:bg-gray-800"
                    : "hover:bg-gray-800/50"
                }`}
              >
                {/* Song Title and Thumbnail */}
                <div
                  onClick={() => setindex(song.id - 1)}
                  className="flex items-center gap-3 min-w-0"
                >
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 group-hover:shadow-md transition-shadow rounded-md overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={song.thumbnail}
                      alt={`${song.title} cover`}
                    />
                    {index === song.id - 1 && isplaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-1 h-2 sm:h-3 bg-amber-500 rounded-sm animate-pulse mr-0.5" />
                        <div className="w-1 h-3 sm:h-4 bg-amber-500 rounded-sm animate-pulse mr-0.5" style={{ animationDelay: '150ms' }} />
                        <div className="w-1 h-1.5 sm:h-2 bg-amber-500 rounded-sm animate-pulse" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className={`font-semibold text-sm leading-tight truncate transition-colors ${
                      index === song.id - 1 ? "text-amber-500" : "text-white group-hover:text-amber-400"
                    }`}>
                      {song.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {song.artist || song.title}
                    </p>
                  </div>
                </div>

                {/* Duration (Desktop only) */}
                <div onClick={() => setindex(song.id - 1)} className="hidden md:block text-sm text-gray-400 transition-colors group-hover:text-gray-300">
                  {song.duration}
                </div>

                {/* Release Date (Desktop only) */}
                <div onClick={() => setindex(song.id - 1)} className="hidden md:block text-sm text-gray-400 transition-colors group-hover:text-gray-300">
                  {song.releaseDate}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  {/* Add to Playlist */}
                  {showAddToPlaylist && (
                    <div className="relative flex items-center" ref={openDropdownId === song.id ? dropdownRef : null}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === song.id ? null : song.id);
                        }}
                        className="p-1 rounded-full text-gray-500 sm:opacity-0 group-hover:opacity-100 hover:text-white hover:bg-gray-700 transition-all duration-300"
                        title="Add to Playlist"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                      {openDropdownId === song.id && (
                        <div className="absolute right-0 top-full mt-1 w-44 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                          <div className="p-2 border-b border-gray-700 text-xs font-semibold text-gray-400">Add to Playlist</div>
                          <div className="max-h-48 overflow-y-auto custom-scrollbar">
                            {playlists?.length > 0 ? playlists.map(p => (
                              <button
                                key={p.id}
                                className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToPlaylist(p.id, song.id);
                                  setOpenDropdownId(null);
                                }}
                              >
                                {p.name}
                              </button>
                            )) : (
                              <div className="px-3 py-2 text-sm text-gray-500">No playlists yet</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Remove from Playlist */}
                  {showRemoveFromPlaylist && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromPlaylist?.(song.id);
                      }}
                      className="p-1 rounded-full text-gray-500 sm:opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300"
                      title="Remove from Playlist"
                    >
                      <IoTrashOutline className="w-4 h-4" />
                    </button>
                  )}

                  {/* Favorite */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(song.id);
                    }}
                    className={`p-1 rounded-full transition-all duration-300 ${
                      favorites.includes(song.id)
                        ? "text-green-500 hover:text-green-400 group-hover:scale-110"
                        : "text-gray-500 sm:opacity-0 group-hover:opacity-100 hover:text-white group-hover:scale-110"
                    }`}
                  >
                    {favorites.includes(song.id) ? <IoHeart className="w-4 h-4" /> : <IoHeartOutline className="w-4 h-4" />}
                  </button>

                  {/* Play / Pause */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayClick(song.id);
                    }}
                    className={`flex shrink-0 items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ${
                      index === song.id - 1
                        ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                        : "sm:opacity-0 group-hover:opacity-100 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-110"
                    }`}
                  >
                    {index === song.id - 1 && isplaying ? (
                      <IoPause className="w-3.5 h-3.5" />
                    ) : (
                      <IoPlay className="w-3.5 h-3.5 ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <p className="text-lg mt-4">{emptyTitle || "No songs found."}</p>
            <p className="text-sm">{emptySubtitle || ""}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default SongTable;
