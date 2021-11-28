import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./MediaPage.css";
import { Button, Modal } from "react-bootstrap";
import VideoModal from "./VideoModal";
import { auth, db } from "../../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MediaPage() {
  // eslint-disable-next-line
  const [user, loading] = useAuthState(auth);
  const { media, id } = useParams();
  const [details, setDetails] = useState({});
  const [trailerKey, setTrailerKey] = useState("");
  const [showGenres, getGenres] = useState([]);
  const [accid, setAccid] = useState("");
  const [privatekey, setPrivatekey] = useState("");

  // FOR PRICING MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    //eslint-disable-next-line
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
        `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${process.env.REACT_APP_FIREBASE_TMDB_API_KEY}`
      );
      const movieDetails = await axios.get(
        `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_FIREBASE_TMDB_API_KEY}`
      );
      // console.log(movieDetails.data);
      // console.log(youtubeDetails.data.results[0]);
      setDetails({ ...movieDetails.data });
      setTrailerKey(youtubeDetails.data.results[0].key);
      getGenres(movieDetails.data.genres);
    }
    rendreDetails();
  }, [media, id, user]);

  // BUY FUNCTION FOR EACH MOVIE
  const buyFunc = async (price) => {
    console.log(accid);
    let data = await axios.post(`http://localhost:8000/transferMoney`, {
      id: accid,
      key: privatekey,
    });
    console.log(data.data.status);
    alert("Movie added to the library");
    setTimeout(handleClose(), 500);
  };

  // ADD THE SELECTED MOVIE TO THE LIBRARY
  function addToLibrary() {
    user
      ? db
          .collection("accounts")
          .where("email", "==", user.email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              const purchaseTimeStamp = new Date();
              const expTimeStamp = new Date();
              expTimeStamp.setDate(purchaseTimeStamp.getDate() + 30);

              let a = {
                id: details.id,
                purchaseDate: purchaseTimeStamp.toDateString(),
                expiryDate: expTimeStamp.toDateString(),
                time: purchaseTimeStamp.toLocaleTimeString(),
              };
              const variable = db.collection("accounts").doc(doc.id);
              await variable
                .update({ lib: firebase.firestore.FieldValue.arrayUnion(a) })
                .then((err) => {
                  console.log(err);
                })
                .then(() => {
                  user ? buyFunc(1) : alert("Login first");
                });
            });
          })
      : alert("Login first");
    handleClose();
  }

  // PATH FOR POSTER IN THE BACKGROUND
  const bgURL = `https://image.tmdb.org/t/p/original/${details.backdrop_path}`;
  // FUNCTION CONVERTS RUNTIME IN MINUTES TO HOURS AND MINUTES
  const runTime = (n) => {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hr " + rminutes + " min";
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgURL})` }}
      className="container-media-page"
    >
      <div className="container-details">
        <div id="container-header">
          <span>
            <h1>{details.original_title}</h1>
            <span style={{ color: "silver" }}>
              <>
                <p style={{ margin: "0 5px" }}>{details.release_date}</p>
                {"|"}
                <p style={{ margin: "0 5px" }}>{runTime(details.runtime)}</p>
              </>
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
            {/* MODAL FOR TRAILER */}
            <VideoModal
              videoKey={trailerKey}
              accid={accid}
              privatekey={privatekey}
            />

            {/* BUTTON FOR PURCHASE */}
            <Button
              onClick={handleShow}
              style={{ marginLeft: "10px" }}
              variant="outline-light"
            >
              <i className="fas fa-plus"></i> Buy Now
            </Button>
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Body>
                <p>
                  <strong>
                    Do you want to add this movie to your library?
                  </strong>
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    position: "relative",
                    margin: "0 5px",
                    padding: "0",
                  }}
                >
                  <li>
                    Current balance:{" "}
                    <span style={{ position: "absolute", right: "0" }}>
                      10 hbar
                    </span>
                    <hr style={{ margin: "5px 0" }} />
                  </li>
                  <li>
                    Cost:{" "}
                    <span style={{ position: "absolute", right: "0" }}>
                      1 hbar
                    </span>
                    <hr style={{ margin: "5px 0" }} />
                  </li>
                  <li>
                    Balance after purchase:{" "}
                    <span style={{ position: "absolute", right: "0" }}>
                      9 hbar
                    </span>
                    <hr style={{ margin: "5px 0" }} />
                  </li>
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-dark" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="dark" onClick={addToLibrary}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
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
