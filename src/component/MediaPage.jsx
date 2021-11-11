import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router';

export default function MediaPage() {
    const [details, setDetails] = useState({})
    const {id} = useParams()

    useEffect(() => {
        async function rendreDetails() {
            // const request = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b`)
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b`)
            console.log(request.data);
            setDetails({...request.data})
        }
        rendreDetails()
    }, [id])

    return (
        <div style={{background: "white"}}>
            Media Page
            {/* <p>{id}</p>
            <p>{details.key}</p> */}
        </div>
    )
}
// {match:{params:{id}}}
// https://image.tmdb.org/t/p/original
// https://www.youtube.com/watch?v=SUXWAEX2jlg
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US