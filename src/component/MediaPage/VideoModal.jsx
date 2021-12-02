import { Modal, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
// import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

export default function VideoModal(props) {
  const [show, setShow] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [accbal, setAccbal] = useState("");
  const [display, setDisplay] = useState(false);

  const bodyRef = useRef(null);
  const handleClose = () => setShow(false);

  useEffect(() => {
    async function fetchData() {
      let data = await axios.post(
        `https://movienix-backend.herokuapp.com/balance`,
        {
          id: props.accid,
          key: props.privatekey,
        }
      );

      setAccbal(
        (data.data.data.balance._valueInTinybar / 100000000 - 0).toFixed(4)
      );
    }
    fetchData();
  }, [display === true]);

  const getWatchTime = () => {
    if (duration.getCurrentTime() > time) {
      setTime(
        Math.round((duration.getCurrentTime() + Number.EPSILON) * 100) / 100
      );
    }
  };

  const totalMoney = async () => {
    setDisplay(true);
    setShow(false);
    if (!props.check) {
      let data = await axios.post(
        `https://movienix-backend.herokuapp.com/transferMoney`,
        {
          id: props.accid,
          key: props.privatekey,
          amount: Math.round((time * 0.01 + Number.EPSILON) * 100) / 100,
        }
      );
    }
  };

  const finalPayment = () => {
    setDisplay(false);
    setDuration(0);
    setTime(0);
  };

  return (
    <>
      {user ? (
        !props.check ? (
          <Button variant="light" onClick={() => setShow(true)}>
            <i className="fas fa-play"></i> Trailer
          </Button>
        ) : (
          <Button variant="light" onClick={() => setShow(true)}>
            <i className="fas fa-play"></i> Watch Now
          </Button>
        )
      ) : (
        <Link to="/login">
          <Button variant="light">Log In</Button>
        </Link>
      )}

      {/* <Modal show={display} onHide={() => setDisplay(false)} centered>
        <Modal.Body>
          <p>
            <strong>
              You haven't bought this movie. If you want continue for 0.01
              hbar/sec. Then press OK .
            </strong>
          </p>
          <ul
            style={{
              listStyle: "none",
              position: "relative",
              margin: "0 5px",
              padding: "0",
            }}
          ></ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={finalPayment}>
            OK
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Modal show={display} onHide={() => setDisplay(false)} centered>
        <Modal.Body>
          <p>
            <strong>Amount deducted for watching this movie</strong>
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
                {accbal} hbar
              </span>
              <hr style={{ margin: "5px 0" }} />
            </li>
            <li>
              Seconds watched:{" "}
              <span style={{ position: "absolute", right: "0" }}>
                {time} secs
              </span>
              <hr style={{ margin: "5px 0" }} />
            </li>
            <li>
              Cost:{" "}
              <span style={{ position: "absolute", right: "0" }}>
                {props.check
                  ? 0
                  : Math.round((time * 0.01 + Number.EPSILON) * 100) / 100}{" "}
                hbar
              </span>
              <hr style={{ margin: "5px 0" }} />
            </li>
            <li>
              Balance after purchase:{" "}
              <span style={{ position: "absolute", right: "0" }}>
                {props.check
                  ? accbal.toFixed(4)
                  : (accbal - time * 0.01).toFixed(4)}{" "}
                hbar
              </span>
              <hr style={{ margin: "5px 0" }} />
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={finalPayment}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="xl"
        // style={{height: "auto", width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        centered={true}
        show={show}
        onHide={() => {
          getWatchTime();
          totalMoney();
        }}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        {/* <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Custom Modal Styling
            </Modal.Title>
        </Modal.Header> */}
        <Modal.Body
          ref={bodyRef}
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: "fit-content",
            width: "auto",
          }}
        >
          <ReactPlayer
            playing={true}
            controls={true}
            ref={(p) => {
              setDuration(p);
            }}
            onPause={() => getWatchTime()}
            width="100vw"
            height="80vh"
            url={`https://www.youtube.com/watch?v=${props.videoKey}`}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
