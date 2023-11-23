import { useState } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap'

const BookModal = ({ book }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                상세보기
            </Button>

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>상세정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={3} className='text-center'>
                            <img src={book.thumbnail || "http://via.placeholder.com/170x250"} width="100%" />
                        </Col>
                        <Col>
                            <h3>{book.title}({book.authors},{book.publisher})</h3>
                            <hr />
                            <p>가격 : {book.price}</p>
                            <p>ISBN : {book.isbn}</p>
                            <p>출판일 : {book.datetime}</p>
                        </Col>
                    </Row>
                    <hr />
                    <div>
                        {book.contents || <p>내용없음</p>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BookModal