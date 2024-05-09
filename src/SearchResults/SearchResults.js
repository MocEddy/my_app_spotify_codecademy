// SearchResults.js
import styles from "./SearchResults.module.css";

function SearchResults(props){

    const handleClick = (title, artist, album, uri) => {
        const track = { title, artist, album, uri };
        props.addSong(track);
        console.log(uri)
    }

    return(
        <div className={styles.results_div}>
            <h1 className={styles.header_results}>Results</h1>
            {props.results.map(({title, artist, album}, index) => {
                return(
                    <div className={styles.result_card}>
                        <h2 className={styles.song_title}>{title}</h2>
                        <p className={styles.song_artist}>{artist} | {album}</p>
                        <button className={styles.add_btn} onClick={() => handleClick(title, artist, album, props.results[index].uri)}>+</button>
                    </div>
                );
            })}
        </div>
    );
}

export default SearchResults;
