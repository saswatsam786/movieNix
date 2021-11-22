import React from "react"
import { Card } from "react-bootstrap"
// import axios from "axios"

export default function Search(movie) {
  return (
    <>
      { movie &&
        movie.media_type !== "tv" && (
          <>
            <Card
            onClick={async () => {
              console.log(movie)
              window.location = `/movie/${movie.id}`
            }}
            onKeyDown={(e) => {
             e.key === "Enter" && (window.location = "/search")
            }}
            >
              <Card.Img
                variant="top"
                src={
                  "https://image.tmdb.org/t/p/original" + movie.poster_path
                }
                style={{width:"auto",height:"15rem",}}            
              />
              <Card.Body>
                <Card.Text classname="text-muted">{movie.title || movie.name}</Card.Text>
              </Card.Body>
                    </Card>
          </>
        )
      }
    </>
  )
}
