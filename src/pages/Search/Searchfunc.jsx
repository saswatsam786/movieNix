import React from "react"
import { Card } from "react-bootstrap"
// import axios from "axios"

export default function Search(movie) {
  return (
    <>
      { movie &&
        movie.media_type !== "tv" && (
          <>
            <div
            onClick={async () => {
              console.log(movie)
              window.location = `/movie/${movie.id}`
            }}
            style={{display:"flex"}}
          >
            <div>
              <img src={
                  "https://image.tmdb.org/t/p/original" + movie.poster_path
                }
                style={{width:"3rem",height:"3rem",}} />
            </div>
            <div>
              <p >{movie.title || movie.name}</p>
              </div>
          </div>
          
          </>
        )
      }
    </>
  )
}
