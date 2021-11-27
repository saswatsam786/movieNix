import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from "../../pages/Login/Login"
import styled from "styled-components";
import axios from 'axios';
// import firebase from 'firebase';

export default function LibraryPage() {
    const [user, loading] = useAuthState(auth);
    // eslint-disable-next-line
    const [movies, setMovies] = useState([])

    useEffect(() => {
        user &&
            db
            .collection("accounts")
            .where("email", "==", user.email)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async doc => {
                    // console.log(doc.data().lib);
                    (doc.data().lib).map(async movie => {
                        const request = await axios.get(`https://api.themoviedb.org/3/movie/${(movie.id).toString()}?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b`)
                        // console.log(request.data);
                        setMovies(prevValue => [...prevValue, request.data])
                    })
                })
            })
        // eslint-disable-next-line
    }, [user])

    const truncate = (str, max = 10) => {
        const array = str.split(" ");
        const ellipsis = array.length > max ? "..." : "";
    
        return array.slice(0, max).join(" ") + ellipsis;
      };

    function loadLib() {
        return (
            
            <Wrapper>
                <Heading>Library</Heading>
                {/* eslint-disable-next-line */}
                <Row_Movies>
                    {movies.map((movie) => (
                    movie.media_type !== "tv" && <Movie key={movie.id} onClick={async () => {
                        // console.log(movie)
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
        )
    }

    return <>{loading ? <h1>loading...</h1> : user ? loadLib() : <Login />}</>;
}

const Wrapper = styled.div`
  width: fit-content;
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
  margin: 0 auto;
  position: relative;
  padding: 20px 40px 20px 20px;

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
  margin-left: 10px;
  opacity: 0;
  transition: all 0.7s;
  width: fit-content;
`;

const Movie = styled.div`
  flex-wrap: wrap;
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