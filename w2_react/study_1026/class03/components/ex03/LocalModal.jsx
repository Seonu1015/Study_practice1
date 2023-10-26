import React, { useState, useEffect } from 'react'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import { Map, MapMarker } from 'react-kakao-maps-sdk'


const LocalModal = ({ local }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                위치보기
            </Button>

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{local.place_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Map center={{ lat: local.y, lng: local.x }} style={{ width: "100%", height: "300px" }}>
                        <MapMarker position={{ lat: local.y, lng: local.x }}>
                            <div>{local.phone}</div>
                        </MapMarker>
                    </Map>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LocalModal