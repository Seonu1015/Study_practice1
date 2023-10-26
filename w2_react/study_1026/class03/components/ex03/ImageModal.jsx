import React from 'react'
import { Button, Modal, Card } from 'react-bootstrap';

const ImageModal = ({ box, setBox }) => {
    const handleClose = () => setBox({...box, show:false});

    return (
        <>
            <Modal
                show={box.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className='p-1'>
                        <img src={box.url} width="100%" />
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ImageModal