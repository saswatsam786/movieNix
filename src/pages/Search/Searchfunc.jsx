import React from "react"
import {
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'

export default function Search(movie) {
  return (
    <>
      { movie &&
        movie.media_type !== "tv" && (
          <>
            {/* <div
            onClick={async () => {
              console.log(movie)
              window.location = `/movie/${movie.id}`
            }}
            style={{display:"flex"}}
          >
          </div> */}
            <Card style={{maxWidth:"100px"}}>
              <CardMedia
                component="img"
                height="100"
                src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
              />
            </Card>
            <CardContent style={{maxWidth:"200px"}}>
              <Typography variant="h6" noWrap>{movie.title || movie.name}</Typography>
            </CardContent>
          </>
        )
      }
    </>
  )
}
