import { useState } from "react";
import styles from "./Searchbar.module.css";


function Searchbar(props){
    const [song, setSong] = useState("");

    const handleChange = (e) =>{
        setSong(e.target.value)
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        props.onSubmit(song);
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