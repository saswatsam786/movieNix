import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { Placeholder } from "react-bootstrap";

export default function HomeCarousel() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_FIREBASE_TMDB_API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    async function getMovies() {
      const request = await axios.get(upcoming);
      setMovies(request.data.results.slice(0, 5));
      setLoading(false);
    }
    getMovies();
  }, [upcoming]);

  return loading ? (
    <Placeholder as={Carousel} animation="glow">
      <Placeholder
        xs={12}
        bg="dark"
        style={{ marginTop: "5px", height: "570px" }}
      />
    </Placeholder>
  ) : (
    <Carousel
      fade
      style={{ width: "97vw", margin: "0 auto", marginTop: "5px" }}
    >
      {movies.map((movie) => {
        return (
          <Carousel.Item
            interval={2500}
            key={movie.id}
            onClick={() => {
              window.location = `/movie/${movie.id}`;
            }}
            style={{ cursor: "pointer" }}
          >
            <img
              className="d-block w-100"
              src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
              height="570px"
              alt={movie.original_title}
              style={{
                objectFit: "cover",
              }}
            />
            <Carousel.Caption
              style={{
                background: "linear-gradient(to bottom,transparent,#000000)",
                right: "0",
                left: "0",
                bottom: "0",
              }}
            >
              <h1>{movie.original_title}</h1>
              <br />
              {/* <p>{movie.overview}</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
