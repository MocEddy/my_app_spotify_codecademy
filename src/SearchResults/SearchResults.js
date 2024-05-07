// SearchResults.js
import styles from "./SearchResults.module.css";

function SearchResults(props){

    const handleClick = (title, artist, album) => {
        const track = { title, artist, album }; // Simplified object creation
        props.addSong(track);
    }

    return(
        <div className={styles.results_div}>
            <h1 className={styles.header_results}>Results</h1>
            {props.results.map(({title, artist, album}) => {
                return(
                    <div className={styles.result_card} key={`${title}-${artist}-${album}`}>
                        <h2 className={styles.song_title}>{title}</h2>
                        <p className={styles.song_artist}>{artist} | {album}</p>
                        <button className={styles.add_btn} onClick={() => handleClick(title, artist, album)}>+</button>
                    </div>
                );
            })}
        </div>
    );
}

export default SearchResults;
