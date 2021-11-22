import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./MediaPage.css";
import { Button } from "react-bootstrap";
import VideoModal from "./VideoModal";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../firebase";
import { ContractByteCodeQuery } from "@hashgraph/sdk";

export default function MediaPage() {
  // eslint-disable-next-line
  const [user, loading] = useAuthState(auth);
  const { media, id } = useParams();
  const [details, setDetails] = useState({});
  const [trailerKey, setTrailerKey] = useState("");
  const [showGenres, getGenres] = useState([]);
  const [accid, setAccid] = useState("");
  const [privatekey, setPrivatekey] = useState("");

  useEffect(() => {
    {
      user &&
        db
          .collection("accounts")
          .where("email", "==", user.email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setAccid(doc.data().accid);
              setPrivatekey(doc.data().privatekey);
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
    }
    // console.log(media);
    async function rendreDetails() {
      const youtubeDetails = await axios.get(
        `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b`
      );
      const movieDetails = await axios.get(
        `https://api.themoviedb.org/3/${media}/${id}?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b`
      );
      console.log(movieDetails.data);
      // console.log(youtubeDetails.data.results[0]);
      setDetails({ ...movieDetails.data });
      setTrailerKey(youtubeDetails.data.results[0].key);
      getGenres(movieDetails.data.genres);
    }
    rendreDetails();
  }, [media, id]);

  const bgURL = `https://image.tmdb.org/t/p/original/${details.backdrop_path}`;
  const runTime = (n) => {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hr " + rminutes + " min";
  };

  const buyFunc = async (price) => {
    console.log(accid);
    let data = await axios.post(`http://localhost:8000/transferMoney`, {
      id: accid,
      key: privatekey,
    });
    console.log(data.data.status);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgURL})` }}
      className="container-media-page"
    >
      <div className="container-details">
        <div id="container-header">
          <span>
            <h1>{media === "movie" ? details.original_title : details.name}</h1>
            <span style={{ color: "silver" }}>
              {/* <p style={{margin: '0 5px'}}>{(details.release_date)}</p>{'|'} */}

              {media === "tv" ? (
                <>
                  <p style={{ margin: "0 5px" }}>{details.first_air_date}</p>
                  {"|"}
                  <p style={{ margin: "0 5px" }}>
                    Season {details.number_of_seasons} {"."}{" "}
                    {details.number_of_episodes} Episodes
                  </p>
                </>
              ) : (
                <>
                  <p style={{ margin: "0 5px" }}>{details.release_date}</p>
                  {"|"}
                  <p style={{ margin: "0 5px" }}>{runTime(details.runtime)}</p>
                </>
              )}
              {"|"}

              <p style={{ margin: "0 5px" }}>
                {showGenres.map((g) => {
                  return g.name + ". ";
                })}
              </p>
              {"|"}
              <p style={{ margin: "0 5px" }}>
                {details.adult ? "A 18+" : "U/A 13+"}
              </p>
            </span>
          </span>

          <span>
            <VideoModal videoKey={trailerKey} />
            <Button
              onClick={() => {
                user ? buyFunc(1) : alert("Login first");
              }}
              style={{ marginLeft: "10px" }}
              variant="outline-light"
            >
              <i className="fas fa-plus"></i> Buy Now
            </Button>
          </span>
        </div>

        <p id="description" style={{ margin: "25px 0" }}>
          {details.overview}
        </p>
      </div>
    </div>
  );
}
// {match:{params:{id}}}
// https://image.tmdb.org/t/p/original
// https://www.youtube.com/watch?v=SUXWAEX2jlg
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
