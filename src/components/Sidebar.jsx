import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ContextFunction } from "../context/context";
import {
  FiHome,
  FiList,
  FiBarChart2,
  FiHeart,
  FiClock,
  FiCalendar,
  FiRadio,
  FiPlus,
} from "react-icons/fi";

function Sidebar() {
  const { playlists, createPlaylist } = useContext(ContextFunction);
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const navigate = useNavigate();

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName);
      setNewPlaylistName("");
      setIsCreating(false);
    }
  };
  const getNavLinkClass = ({ isActive }) =>
    `relative flex items-center gap-4 px-4 md:px-6 py-2.5 text-sm font-medium cursor-pointer transition-all duration-300 ease-in-out group rounded-r-lg border-l-[3px] ` +
    (isActive
      ? "border-amber-500 bg-gray-800 text-white"
      : "border-transparent hover:border-amber-500 hover:bg-gray-900 text-gray-400");

  const getIconClass = ({ isActive }) =>
    `text-lg transition-colors duration-300 ` +
    (isActive ? "text-amber-500" : "text-gray-400 group-hover:text-amber-500");

  const getTextClass = ({ isActive }) =>
    `hidden md:inline transition-colors duration-300 ` +
    (isActive ? "text-white" : "group-hover:text-white");

  return (
    <div className="w-20 md:w-40 lg:w-48 mt-7 flex flex-col gap-8 pb-8 pr-2">
      {/* top section */}
      <div className="flex flex-col gap-2">
        <NavLink to="/allsongs" className={getNavLinkClass}>
          {({ isActive }) => (
            <>
              <FiHome className={getIconClass({ isActive })} />
              <span className={getTextClass({ isActive })}>Home</span>
            </>
          )}
        </NavLink>

        <NavLink to="/statistics" className={getNavLinkClass}>
          {({ isActive }) => (
            <>
              <FiBarChart2 className={getIconClass({ isActive })} />
              <span className={getTextClass({ isActive })}>Statistics</span>
            </>
          )}
        </NavLink>
      </div>

      {/* middle section */}
      <div className="flex flex-col gap-2">
        <p className="hidden md:block text-xs font-semibold text-gray-500 tracking-wider uppercase px-4 md:px-6 mb-2">
          Your Music
        </p>

        <NavLink to="/favorites" className={getNavLinkClass}>
          {({ isActive }) => (
            <>
              <FiHeart className={getIconClass({ isActive })} />
              <span className={getTextClass({ isActive })}>Favourites</span>
            </>
          )}
        </NavLink>

        <NavLink to="/history" className={getNavLinkClass}>
          {({ isActive }) => (
            <>
              <FiCalendar className={getIconClass({ isActive })} />
              <span className={getTextClass({ isActive })}>History</span>
            </>
          )}
        </NavLink>
      </div>

      {/* bottom section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-4 md:px-6 mb-2">
          <p className="hidden md:block text-xs font-semibold text-gray-500 tracking-wider uppercase">
            Your Playlists
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
            title="Create Playlist"
          >
            <FiPlus />
          </button>
        </div>

        {isCreating && (
          <form onSubmit={handleCreatePlaylist} className="px-4 md:px-6 mb-2">
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist name..."
              className="w-full bg-gray-900 text-white text-sm px-3 py-1.5 rounded-md border border-gray-700 outline-none focus:border-amber-500 transition-colors"
              autoFocus
              onBlur={() => setIsCreating(false)}
            />
          </form>
        )}

        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => navigate(`/playlist/${playlist.id}`)}
            className="flex items-center gap-4 px-4 md:px-6 py-2 border-l-[3px] border-transparent hover:border-amber-500 hover:bg-gray-900 rounded-r-lg text-sm font-medium cursor-pointer group transition-all duration-300"
          >
            <span
              className={`w-2.5 h-2.5 ${playlist.color} rounded-full group-hover:scale-125 transition-transform shrink-0 ml-1`}
            ></span>
            <span className="hidden md:inline text-gray-400 group-hover:text-white transition-colors pl-1 truncate max-w-[100px]">
              {playlist.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
