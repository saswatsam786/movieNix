import { Modal, Button } from 'react-bootstrap'
import { useState, useRef } from 'react'
import YouTube from 'react-youtube';

export default function VideoModal(props) {
    const [show, setShow] = useState(false);
    const bodyRef = useRef(null)

    function _onReady(event) {
      event.target.pauseVideo();
    }

    const opts = {
        height: '620',
        width: '1105',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        },
    };
  
    return (
      <>
        <Button 
            variant="light"
            onClick={() => setShow(true)}
        ><i className="fas fa-play"></i>{' '} Trailer</Button>
  
        <Modal
          size="xl"
          // style={{height: "95vh", width: '100vw'}}
          centered={true}
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          {/* <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Custom Modal Styling
            </Modal.Title>
          </Modal.Header> */}
          <Modal.Body ref={bodyRef} style={{alignItems:'center', display: 'flex', justifyContent: 'center', height: 'fit-content', width: 'fit-content'}}>
            <YouTube videoId={props.videoKey} opts={opts} onReady={_onReady} />
          </Modal.Body>
        </Modal>
      </>
    );
  }
  