// App.js
import styles from './App.module.css';
import Searchbar from '../Searchbar/Searchbar';
import { useState } from 'react';
import SearchResults from "../SearchResults/SearchResults";
import Tracklist from '../Tracklist/Tracklist';

function App() {
  const [input, setInput] = useState("");
  const [tracks, setTracks] = useState([]);

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

  const results = [
    { title: "Belly Dancer", artist: "Drake", album: "Sanaa" },
    { title: "Belly Dancer", artist: "Drake", album: "Havana" },
    { title: "Belly Dancer", artist: "Drake", album: "Savona" },
    { title: "Belly Dancer", artist: "Drake", album: "Savant" }
  ];

  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <h1 className={styles.headerTxt}>Jamming</h1>
      </header>
      <Searchbar onSubmit={handleSubmit}/>
      <SearchResults results={results} addSong={addSong}/>
      <Tracklist tracks={tracks} removeSong={removeSong}/>
    </div>
  );
}

export default App;
