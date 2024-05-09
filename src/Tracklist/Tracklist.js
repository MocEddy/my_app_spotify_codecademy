import { useState } from "react";
import styles from "./Tracklist.module.css";

function Tracklist(props){
    const [trackName, setTrackName] = useState("");

    const handleChange = (input) =>{
        setTrackName(input.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        props.playlist(trackName);
        props.saved();
        setTrackName("");
    }

    return (
        <div className = {styles.track_div}>
            <form onSubmit={handleSubmit} className={styles.playlist_form}>
                <input type="text" className = {styles.playlist_bar} value = {trackName} onChange = {handleChange} placeholder="New Playlist"/>
            </form>
            {props.tracks.map(({title, artist, album}, index) =>{
                return(
                    <div className={styles.playlist_card}>
                        <h2 className = {styles.song_title}>{title}</h2>
                        <p className= {styles.song_artist}>{artist} | {album}</p>
                        <button className={styles.remove_btn} onClick={() => {props.removeSong(index)}}>-</button>
                    </div>
                );
            })}
            <button onClick={handleSubmit} className = {styles.save_to_spotify}>SAVE TO SPOTIFY</button>
        </div>

    );
}

export default Tracklist;