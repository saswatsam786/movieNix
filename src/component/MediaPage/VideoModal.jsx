import { Modal, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

export default function VideoModal(props) {
  const [show, setShow] = useState(false);
  // eslint-disable-next-line
  const [user, loading] = useAuthState(auth);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [accbal, setAccbal] = useState("");
  const [display, setDisplay] = useState(false);
  const [open, setOpen] = useState(false);

  const bodyRef = useRef(null);
  // const handleClose = () => setShow(false);

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
    //eslint-disable-next-line
  }, [show, display, duration, open, user, time, accbal]);

  const getWatchTime = () => {
    if (duration.getCurrentTime() > time) {
      setTime((duration.getCurrentTime() - 0).toFixed(4));
    }
  };

  const totalMoney = async () => {
    setDisplay(true);
    setShow(false);
    if (!props.check) {
      //eslint-disable-next-line
      let data = await axios.post(
        `https://movienix-backend.herokuapp.com/transferMoney`,
        {
          id: props.accid,
          key: props.privatekey,
          amount: time * 0.01,
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
          <Button variant="light" onClick={() => setOpen(true)}>
            <i className="fas fa-play"></i> Watch Now
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

      <Modal show={open} onHide={() => setOpen(false)} centered>
        <Modal.Body>
          <p>
            <strong>
              {accbal - 0 >= 5
                ? "You haven't bought this movie. If you still want continue for 0.01 hbar/sec. Then press OK ."
                : "Insufficient balance to continue watching..."}
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
          <Button
            variant="dark"
            onClick={() => {
              setShow(true);
              setOpen(false);
            }}
            disabled={accbal - 0 >= 5 ? false : true}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
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
                {props.check ? 0 : (time * 0.01).toFixed(4)} hbar
              </span>
              <hr style={{ margin: "5px 0" }} />
            </li>
            <li>
              Balance after purchase:{" "}
              <span style={{ position: "absolute", right: "0" }}>
                {props.check
                  ? (accbal - 0).toFixed(4)
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
