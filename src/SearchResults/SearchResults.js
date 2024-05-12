// SearchResults.js
import { useState, useEffect } from 'react';
import styles from "./SearchResults.module.css";

function SearchResults(props) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const x = await props.query(props.input);
        setSearchResults(x);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchResults();
  }, [props.input, props.query]);

  const handleClick = (title, artist, album, uri) => {
    const track = { title, artist, album, uri };
    props.addSong(track);
  };

  return (
    <div className={styles.results_div}>
      <h1 className={styles.header_results}>Results</h1>
      {searchResults.map(({ title, artist, album, uri }, index) => (
        <div key={uri} className={styles.result_card}>
          <h2 className={styles.song_title}>{title}</h2>
          <p className={styles.song_artist}>{artist} | {album}</p>
          <button
            className={styles.add_btn}
            onClick={() => handleClick(title, artist, album, uri)}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
