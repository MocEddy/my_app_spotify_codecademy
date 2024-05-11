// App.js
import styles from './App.module.css';
import Searchbar from '../Searchbar/Searchbar';
import { useState, useEffect, useRef } from 'react';
import SearchResults from "../SearchResults/SearchResults";
import Tracklist from '../Tracklist/Tracklist';
import {requestAuthorization, onReturn} from "../api_stuff/api";

function App() {
  localStorage.setItem("reload", "1")

  useEffect(() => {
    if (localStorage.getItem("reload") === "1") {
      requestAuthorization();
      localStorage.setItem("reload", "0")
      onReturn();
    }
  }, []);
  

  const [input, setInput] = useState("");
  const [tracks, setTracks] = useState([]);
  const [songsToAdd, setSongsToAdd] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

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

  const results = [
    { title: "Belly Dancer", artist: "Drake", album: "Sanaa", uri:"11dFghVXANMlKmJXsNCbNl" },
    { title: "Belly Dancer", artist: "Drake", album: "Havana", uri:"11dFghVXANMlKmJXsNC" },
    { title: "Belly Dancer", artist: "Drake", album: "Savona", uri:"11dFghVXANMlKmJXsNCb" },
    { title: "Belly Dancer", artist: "Drake", album: "Savant", uri:"11dFghVXANMlKmJXsNCbN" }
  ];

  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <h1 className={styles.headerTxt}>Jamming</h1>
      </header>
      <Searchbar onSubmit={handleSubmit}/>
      <SearchResults results={results} addSong={addSong}/>
      <Tracklist tracks={tracks} removeSong={removeSong} saved = {savedPlaylist} playlist={addPlaylistName} />
    </div>
  );
}

export default App;
