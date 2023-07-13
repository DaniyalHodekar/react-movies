import { useEffect, useState } from "react";
import './App.css'
import SearchIcon from './search.svg'
import Movie from "./Movie";

export default function App() {

const API_URL = `https://www.omdbapi.com?apikey=b6003d8a&s=`;

const [movies, setMovies] = useState([]);
const [input, setInput] = useState("");

useEffect(()=>{
    searchMovies(`Batman`);
},[]);

async function searchMovies (title){
    title = title.trim();
    if(title == '') return;
    const response = await fetch(`${API_URL}${title}`);
    const data = await response.json();
    console.log(data)
    if(data.Response == "False") return;
    setMovies(data.Search);
}
    return (
      <div className="app">
        <h1>MovieLand</h1>

        <div className="search">
          <input
            type="text"
            placeholder="Search for movies"
            value={input}
            onChange={(e) => {
                setInput(e.target.value);
            }}
          />
          <img src={SearchIcon} alt="search icon"
          onClick={()=> {
            searchMovies(input);
          }} />
        </div>
        <div className="container">
            { movies.length == 0 ? <h3 className="hello">Loading</h3> 
             :
             movies.map((movie)=>{
                return <Movie key={movie.imdbID} movie={movie} />
             })}
        </div>
      </div>
    );
}
