import React, { useContext } from "react";
import SongsData from "../api/SongsData.json";
import { ContextFunction } from "../context/context";
import SongTable from "./SongTable";

function Favorites() {
  const { searchQuery = "", favorites = [] } = useContext(ContextFunction);

  const filteredSongs = SongsData.filter(song => favorites.includes(song.id)).filter((song) => {
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      (song.artist && song.artist.toLowerCase().includes(query))
    );
  });

  return (
    <div className="mt-8 mb-4 flex flex-col h-full bg-gray-900/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-800/50">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">Your Favourites</h2>
      </div>
      <SongTable
        songs={filteredSongs}
        emptyTitle="No favourite songs found."
        emptySubtitle="Click the heart icon on any song to save it here."
      />
    </div>
  );
}

export default Favorites;
