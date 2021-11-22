import React, { useState } from "react"
import { Form, FormControl, Button } from "react-bootstrap"
import axios from "axios"
import styled from "styled-components"

function Search() {
  const [searchText, setSearchText] = useState("")
  const [movies, setMovies] = useState([])

  const fetchSearch = async () => {
    const req = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&language=en-US&query=${searchText}&page=1&sort_by=popularity.desc`
    )
    setMovies(req.data.results)
    console.log(movies)
  }

  const truncate = (str, max = 10) => {
    const array = str.split(" ")
    const ellipsis = array.length > max ? "..." : ""

    return array.slice(0, max).join(" ") + ellipsis
  }

  return (
    <div>
      <Form
        className="d-flex me-auto"
        style={{ margin: "20px 5px" }}
        onSubmit={()=>fetchSearch}
      >
        <FormControl
          type="search"
          placeholder="Search"
          className="me-1"
          aria-label="Search"
          onChange={
            ((e) => {
              setSearchText(e.target.value)
              fetchSearch()
            })
          }
        />
        <Button variant="outline-light" onClick={fetchSearch} >Search</Button>
      </Form>

      {movies ? (
        movies.map(
          (movie) =>
            movie.media_type !== "tv" && (
              <Movie
                key={movie.id}
                onClick={async () => {
                  console.log(movie)
                  window.location = `/movie/${movie.id}`
                }}
              >
                <Image
                  key={movie.id}
                  src={
                    "https://image.tmdb.org/t/p/original" + movie.poster_path
                  }
                  alt={movie.id}
                ></Image>
                <Info>
                  <Title>{movie.title || movie.name}</Title>
                  <Desc>{truncate(movie.overview, 12)}</Desc>
                </Info>
              </Movie>
            )
        )
      ) : (
        <h2>No related content</h2>
      )}
    </div>
  )
}

export default Search

const Image = styled.img`
  object-fit: contain;
  height: 280px;
  border-radius: 20px;
  transition: all 0.5s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.2);
    border-radius: 15px;
  }
`;

const Info = styled.div`
  position: absolute;
  z-index: 5;
  opacity: 1;
  color: white;
  margin-bottom: 0px;
  left: 0;
  margin-left: 10px;
  opacity: 0;
  transition: all 0.7s;
`;

const Movie = styled.div`
  width: 100%;
  height: 270px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transition: all 0.5s;
  margin: 5px;

  &::before {
    content: "";
    display: flex;
    justify-content: center;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #000000);
    /* z-index: 2; */
    transition: all 0.5s;
    opacity: 0;
    transform: scale(1);
  }
  &:hover::before {
    border-radius: 15px;
    opacity: 0.7;
    z-index: 4;
  }

  &:hover {
    transform: scale(1.2);
    z-index: 3;
  }

  &:hover ${Info} {
    transition: opacity 1s ease;
    opacity: 1;
  }
`;

const Title = styled.h4`
  font-size: medium;
  font-weight: 500;
`;
const Desc = styled.p`
  font-size: small;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
`;