// App.js
import styles from './App.module.css';
import Searchbar from '../Searchbar/Searchbar';
import { useState, useEffect, useRef, useMemo } from 'react';
import SearchResults from "../SearchResults/SearchResults";
import Tracklist from '../Tracklist/Tracklist';
import {requestAuthorization, onReturn, fetchSearchQuery} from "../api_stuff/api";
import { createPlaylist, addToPlaylist } from "../api_stuff/api";

function App() {
  
  

  const [input, setInput] = useState("");
  const [tracks, setTracks] = useState([]);
  const [songsToAdd, setSongsToAdd] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
      requestAuthorization();
      onReturn();
  }, []);

  const handleSubmit = (song) => {
    setInput(song);
  }

  const addSong = (track) => {
    setTracks(prevTracks => [...prevTracks, track]);
  }

  const removeSong = (target_idx) =>{
    setTracks((prevTracks) =>{
      return prevTracks.filter((_, idx) =>{
        return idx !== target_idx;
      })
    })
  }
  
  const savedPlaylist = () =>{
    setSongsToAdd(tracks);
    setTracks([]);
  }

  const addPlaylistName = (name)=>{
    setPlaylistName(name);
  }

   const createAddPlaylist = () =>{
    const uris = tracks.map((element) =>{
      return element.uri;
    })
    createPlaylist(playlistName, uris);
  }

  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <h1 className={styles.headerTxt}>Jamming</h1>
      </header>
      <Searchbar onSubmit={handleSubmit}/>
      <SearchResults results={results} addSong={addSong} input={input} query={fetchSearchQuery}/>
      <Tracklist tracks={tracks} removeSong={removeSong} saved = {savedPlaylist} playlist={addPlaylistName} final ={createAddPlaylist}/>
    </div>
  );
}

export default App;
