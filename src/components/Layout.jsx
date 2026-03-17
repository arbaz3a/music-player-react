import React, { useState, useRef, useEffect } from "react";
import { ContextFunction } from "../context/context";
import Sidebar from "./Sidebar";
import MainImageSection from "./MainImageSection";
import RightSidebar from "./RightSidebar";
import MobileNav from "./MobileNav";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  const [index, setindex] = useState(0);
  const songref = useRef(null);
  const [isplaying, setisplaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const savedValue = localStorage.getItem("resonix_favorites");
    return savedValue !== null ? JSON.parse(savedValue) : [];
  });

  const [history, setHistory] = useState(() => {
    const savedValue = localStorage.getItem("resonix_history");
    return savedValue !== null ? JSON.parse(savedValue) : [];
  });

  const [playlists, setPlaylists] = useState(() => {
    const savedValue = localStorage.getItem("resonix_playlists");
    return savedValue !== null ? JSON.parse(savedValue) : [];
  });

  useEffect(() => {
    localStorage.setItem("resonix_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("resonix_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("resonix_playlists", JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    if (isplaying) {
      setHistory((prev) => {
        const newHistory = prev.filter((id) => id !== index);
        return [index, ...newHistory].slice(0, 50); // Keep last 50 songs in history
      });
    }
  }, [index, isplaying]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const toggleplaybtn = () => {
    if (isplaying) {
      songref.current.pause();
    } else {
      songref.current.play();
    }
    setisplaying(!isplaying);
  };

  const createPlaylist = (name) => {
    if (!name.trim()) return;
    const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"];
    const newPlaylist = {
      id: "p_" + Date.now(),
      name: name.trim(),
      color: colors[Math.floor(Math.random() * colors.length)],
      songs: []
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const addToPlaylist = (playlistId, songId) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id === playlistId && !p.songs.includes(songId)) {
        return { ...p, songs: [...p.songs, songId] };
      }
      return p;
    }));
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
  };

  return (
    <>
      <ContextFunction.Provider
        value={{
          isplaying,
          setisplaying,
          index,
          setindex,
          songref,
          toggleplaybtn,
          searchQuery,
          setSearchQuery,
          favorites,
          toggleFavorite,
          history,
          playlists,
          setPlaylists,
          createPlaylist,
          addToPlaylist,
          deletePlaylist,
        }}
      >
        <div className="flex flex-col h-screen overflow-hidden bg-black text-white">
          <Navbar />
          <div className="flex flex-1 overflow-hidden relative lg:gap-4">
            {/* left sidebar */}
            <div className="h-full overflow-y-auto hidden sm:block">
              <Sidebar />
            </div>

            {/* main content section */}
            <div className="flex-1 overflow-y-auto px-4 lg:px-6 pb-36 sm:pb-28 lg:pb-4 custom-scrollbar lg:mr-2">
              <MainImageSection />
              <div className="mt-4">
                <Outlet />
              </div>
            </div>

            {/* right sidebar / player */}
            <div className="w-full fixed bottom-[52px] sm:bottom-0 left-0 z-50 lg:static lg:w-[25%] lg:max-w-[340px] lg:h-full lg:overflow-y-auto lg:pr-6 pb-2 lg:pb-0">
              <RightSidebar />
            </div>
          </div>

          {/* mobile bottom nav */}
          <MobileNav />
        </div>
      </ContextFunction.Provider>
    </>
  );
}

export default Layout;
