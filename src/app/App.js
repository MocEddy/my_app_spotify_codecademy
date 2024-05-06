import styles from './App.module.css';
import Searchbar from '../Searchbar/Searchbar';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState("");
  const handleSubmit = (song) =>{
    setInput(song);
  }

  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <h1 className={styles.headerTxt}>Jamming</h1>
      </header>
      <Searchbar onSubmit={handleSubmit}/>
    </div>
  );
}

export default App;
