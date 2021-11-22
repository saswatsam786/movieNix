import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router';
import './MediaPage.css'
import {Button, Modal} from 'react-bootstrap';
import VideoModal from './VideoModal';
import { auth, db } from '../../firebase'
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function MediaPage() {
    // eslint-disable-next-line
    const [user, loading] = useAuthState(auth);
    const {media, id} = useParams()
    const [details, setDetails] = useState({})
    const [trailerKey, setTrailerKey] = useState("")
    const [showGenres, getGenres] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function rendreDetails() {
            const youtubeDetails = await axios.get(`https://api.themoviedb.org/3/${media}/${id}/videos?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b`)
            const movieDetails = await axios.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b`)
            // console.log(movieDetails.data);
            // console.log(youtubeDetails.data.results[0]);
            setDetails({...movieDetails.data})
            setTrailerKey(youtubeDetails.data.results[0].key)
            getGenres(movieDetails.data.genres)
        }
        rendreDetails()
    }, [media, id])

    const bgURL = `https://image.tmdb.org/t/p/original/${details.backdrop_path}`
    const runTime = (n) => {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + " hr " + rminutes + " min";
    }

    function addToLibrary() {
        user &&
            db
            .collection("accounts")
            .where("email", "==", user.email)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async doc => {
                    const purchaseTimeStamp = new Date()
                    // console.log(purchaseTimeStamp);
                    // purchaseTimeStamp.setDate(purchaseTimeStamp.getDate() + 30)
                    // console.log(purchaseTimeStamp);

                    const expTimeStamp = new Date()
                    expTimeStamp.setDate(purchaseTimeStamp.getDate() + 30)

                    let a = {
                        id: details.id,
                        purchaseDate: purchaseTimeStamp.toDateString(),
                        expiryDate: expTimeStamp.toDateString(),
                        time: purchaseTimeStamp.toLocaleTimeString()
                    }
                    const variable = db.collection("accounts").doc(doc.id)
                    await variable.update({lib: firebase.firestore.FieldValue.arrayUnion(a)}).then(err => {console.log(err)})
                })
            })
    }

    return (
        <div
         style={{backgroundImage: `url(${bgURL})`}}
         className="container-media-page">

            <div className="container-details">
                <div id="container-header">

                    <span>
                        <h1>{media === "movie" ? details.original_title : details.name}</h1>
                        <span style={{color: 'silver'}}>
                            {/* <p style={{margin: '0 5px'}}>{(details.release_date)}</p>{'|'} */}
                            
                            {media === "tv" ? 
                            <>
                                <p style={{margin: '0 5px'}}>{(details.first_air_date)}</p>{'|'}
                                <p style={{margin: '0 5px'}}>
                                    Season {details.number_of_seasons} {'.'} {details.number_of_episodes} Episodes
                                </p>
                            </> : 
                            <>
                                <p style={{margin: '0 5px'}}>{(details.release_date)}</p>{'|'}
                                <p style={{margin: '0 5px'}}>{runTime(details.runtime)}</p>
                            </>    }
                            {'|'}

                            <p style={{margin: '0 5px'}}>{showGenres.map(g => {return g.name+'. '})}</p>{'|'}
                            <p style={{margin: '0 5px'}}>{details.adult ? 'A 18+' : 'U/A 13+'}</p>
                        </span>
                    </span>

                    <span>
                        <VideoModal videoKey={trailerKey} />
                        <Button
                            onClick={handleShow}
                            style={{marginLeft: '10px'}} 
                            variant="outline-light">
                            <i className="fas fa-plus"></i>  Buy Now
                        </Button>
                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Body>
                                <p><strong>Do you want to add this movie to your library?</strong></p>
                                <ul style={{listStyle: 'none', position: 'relative', margin: '0 5px', padding: '0'}}>
                                    <li>Current balance: <span style={{position: 'absolute', right: '0'}}>10 hbar</span><hr style={{margin: '5px 0'}} /></li>
                                    <li>Cost: <span style={{position: 'absolute', right: '0'}}>1 hbar</span><hr style={{margin: '5px 0'}} /></li>
                                    <li>Balance after purchase: <span style={{position: 'absolute', right: '0'}}>9 hbar</span><hr style={{margin: '5px 0'}} /></li>
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

                <p id="description" style={{margin: '25px 0'}}>{details.overview}</p>

            </div>

        </div>
    )
}
// {match:{params:{id}}}
// https://image.tmdb.org/t/p/original
// https://www.youtube.com/watch?v=SUXWAEX2jlg
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US