import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Table } from 'react-bootstrap';

const OrderModal = ({ purchase, sum }) => {
    const [show, setShow] = useState(false);
    const [list, setList] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getOrder = async () => {
        const res = await axios("/orders/list/order.json?pid=" + purchase.pid);
        // console.log(res.data);
        setList(res.data);
    }

    useEffect(() => {
        getOrder();
    }, [])

    return (
        <>
            <Button variant="warning" onClick={handleShow} size='sm'>
                주문상세
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>주문상세</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4>{purchase.rname} [{purchase.str_result}]</h4>
                        <hr />
                        <div>배송지 : {purchase.raddress1} {purchase.raddress2}</div>
                        <div>연락처 : {purchase.rphone}</div>
                        <hr />
                        <h4>주문상품</h4>
                        <Table hover striped>
                            <thead style={{display:'none'}}>
                                <tr className='text-center'>
                                    <th width="10%"></th>
                                    <th colSpan={2} width="60%">제목</th>
                                    <th>수량</th>
                                    <th>금액</th>
                                    <th>합계</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map(book =>
                                    <tr key={book.bid} className='text-center justify-content-center align-middle'>
                                        <td>{book.bid}</td>
                                        <td><img src={book.image} width={30}/></td>
                                        <td className='text-start ps-3'>{book.title}</td>
                                        <td>{book.qnt}</td>
                                        <td>{book.fmtprice}원</td>
                                        <td>총 {book.fmtsum}원</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <Alert className='text-end p'>
                            총 금액 : {sum}원
                        </Alert>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OrderModal