import styles from './App.module.css';
import Searchbar from '../Searchbar/Searchbar';
import { useState } from 'react';
import SearchResults from "../SearchResults/SearchResults";
import Tracklist from '../Tracklist/Tracklist';

function App() {
  const [input, setInput] = useState("");
  const handleSubmit = (song) =>{
    setInput(song);
  }
  const results = [{title: "Belly Dancer", artist: "Drake", album:"Sanaa"}, {title: "Belly Dancer", artist: "Drake", album:"Havana"}, {title: "Belly Dancer", artist: "Drake", album:"Savona"}, {title: "Belly Dancer", artist: "Drake", album:"Savant"}];
  const tracks = [{title: "Belly Dancer", artist: "Drake", album:"Sanaa"}, {title: "Belly Dancer", artist: "Drake", album:"Havana"}, {title: "Belly Dancer", artist: "Drake", album:"Savona"}, {title: "Belly Dancer", artist: "Drake", album:"Savant"}];
  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <h1 className={styles.headerTxt}>Jamming</h1>
      </header>
      <Searchbar onSubmit={handleSubmit}/>
      <SearchResults results ={results}/>
      <Tracklist tracks={tracks}/>
    </div>
  );
}

export default App;
