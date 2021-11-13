import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
// import dotenv from "dotenv";

// dotenv.config({ path: "./../../.env" });

const Row = ({ genre, moviePath }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(moviePath);
      setMovies(request.data.results);
    }
    fetchData();
  }, [moviePath]);

  const truncate = (str, max = 10) => {
    const array = str.split(" ");
    const ellipsis = array.length > max ? "..." : "";

    return array.slice(0, max).join(" ") + ellipsis;
  };

  // console.table(movies);

  return (
    <Wrapper>
      <Heading>{genre}</Heading>
      {/* eslint-disable-next-line */}
      <Row_Movies>
        {movies.map((movie) => (
          movie.media_type !== "tv" && <Movie key={movie.id} onClick={async () => {
              console.log(movie)
              window.location = `/movie/${movie.id}`
            }}>
            <Image
              key={movie.id}
              src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
              alt={movie.id}
            ></Image>
            <Info>
              <Title>{movie.title || movie.name}</Title>
              <Desc>{truncate(movie.overview, 12)}</Desc>
            </Info>
          </Movie>
        ))}
      </Row_Movies>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;
const Heading = styled.h2`
  flex: 0.25;
  padding-left: 1.5vw;
  color: #f1e8e8c6;
`;
const Row_Movies = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  width: 95%;
  overflow-y: hidden;
  overflow-x: scroll;
  margin: 0 auto;
  scroll-behavior: smooth;
  position: relative;
  padding: 20px 0;

  &::-webkit-scrollbar {
    visibility: hidden;
  }
`;
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
  margin-left: 15px;
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
`;

export default Row;

