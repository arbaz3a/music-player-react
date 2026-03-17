import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SongsData from "../api/SongsData.json";
import { ContextFunction } from "../context/context";
import { IoTrashOutline } from "react-icons/io5";
import SongTable from "./SongTable";

function PlaylistView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { searchQuery = "", playlists, setPlaylists, deletePlaylist } =
    useContext(ContextFunction);

  const playlist = playlists?.find(p => p.id === id);

  const removeFromPlaylist = (songId) => {
    if (setPlaylists) {
      setPlaylists(prev => prev.map(p => {
        if (p.id === id) {
          return { ...p, songs: p.songs.filter(sId => sId !== songId) };
        }
        return p;
      }));
    }
  };

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-900/50 rounded-xl">
        <p className="text-xl text-white font-bold mb-2">Playlist Not Found</p>
        <button onClick={() => navigate('/allsongs')} className="text-amber-500 hover:text-amber-400 border border-amber-500 rounded-md px-4 py-2">Go Back</button>
      </div>
    );
  }

  const playlistSongs = playlist.songs.map(songId => SongsData.find(s => s.id === songId)).filter(Boolean);

  const filteredSongs = playlistSongs.filter((song) => {
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      (song.artist && song.artist.toLowerCase().includes(query))
    );
  });

  return (
    <div className="mt-8 mb-4 flex flex-col h-full bg-gray-900/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-800/50">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-4">
          <span className={`w-6 h-6 sm:w-8 sm:h-8 ${playlist.color} rounded-full shadow-lg`}></span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{playlist.name}</h2>
        </div>
        <button
          onClick={() => {
            deletePlaylist(playlist.id);
            navigate('/allsongs');
          }}
          className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300"
          title="Delete Playlist"
        >
          <IoTrashOutline className="text-xl" />
        </button>
      </div>
      <SongTable
        songs={filteredSongs}
        showRemoveFromPlaylist={true}
        onRemoveFromPlaylist={removeFromPlaylist}
        emptyTitle="Playlist is empty."
        emptySubtitle="Add songs from the All Songs view!"
      />
    </div>
  );
}

export default PlaylistView;
