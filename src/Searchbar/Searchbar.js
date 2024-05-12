import { useState } from "react";
import styles from "./Searchbar.module.css";
import { fetchSearchQuery } from "../api_stuff/api";

function Searchbar(props){
    const [song, setSong] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSong(value);
      };


    const handleSubmit = (event) =>{
        event.preventDefault();
        props.onSubmit(song);
        setSong("");
    }
    return(
        <div>
            <form onSubmit={handleSubmit} className = {styles.form}> 
                <input type="text" value = {song} onChange={handleChange} className = {styles.search_bar}/>
                <button  type="submit" className = {styles.submit_btn}>Submit</button>
            </form>
        </div>
    );
}

export default Searchbar;