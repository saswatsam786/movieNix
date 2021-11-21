import React, {useState, useEffect} from "react";
// import { Switch } from "react-router";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel'
// import genres from "../moviePath";

export default function HomeCarousel(){
    const [movies, setMovies] = useState([]);
    const upcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&language=en-US&page=1";
    useEffect(()=>{
        async function getMovies(){
            const request = await axios.get(upcoming);
            setMovies(request.data.results.slice(0,5));
        }
        getMovies();
    });

    return(
        <Carousel fade>
            {movies.map((movie)=>{
                return(
                    <Carousel.Item Intervel={500}>
                    <img
                        className="d-block w-100"
                        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                        alt={movie.original_title}
                        
                    />
                    <Carousel.Caption>
                        <h3>{movie.original_title}</h3>
                        <p>{movie.overview}</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                );
            })}   
        </Carousel>
    )
}

