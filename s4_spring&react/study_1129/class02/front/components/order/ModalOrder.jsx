import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Modal, Table } from 'react-bootstrap';

const ModalOrder = ({ p }) => {
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getOrders = async () => {
        const res = await axios(`/purchase/list.json/${p.oid}`);
        setOrders(res.data);
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <>
            <Button variant="primary" onClick={handleShow} size='sm'>
                상세보기
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>주문번호 : {p.oid}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className='p-3'>
                        <CardBody>
                            <p>주문자 : {p.uname} ({p.uid})</p>
                            <p>연락처 : {p.phone}</p>
                            <p>주소 : {p.address1} {p.address2}</p>
                            <p>주문금액 : {p.fmtsum}</p>
                            <br/>
                            <hr />
                            <h3 className='my-3 text-center'>주문상품</h3>
                            <Table>
                                <thead>
                                    <tr className='text-center'>
                                        <th colSpan={2}>상품명</th>
                                        <th>금액</th>
                                        <th>수량</th>
                                        <th>총금액</th>
                                    </tr>
                                </thead>
                                <tbody className='justify-content-center align-middle'>
                                    {orders.map(o =>
                                        <tr key={o.pid}>
                                            <td><img src={`/display?file=${o.image}`} width="50" /></td>
                                            <td>{o.title}</td>
                                            <td>{o.fmtprice}원</td>
                                            <td>{o.qnt}</td>
                                            <td>{o.fmtsum}원</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
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

export default ModalOrder