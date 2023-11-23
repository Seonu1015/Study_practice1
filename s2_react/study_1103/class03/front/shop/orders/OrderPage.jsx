import React, { useEffect, useState } from 'react';
import { Alert, Col, Row, Table } from 'react-bootstrap';

const OrderPage = ({ books }) => {
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        let list = books.filter(book => book.checked);
        let sumAll = 0;
        let sumQnt = 0;
        list.map(book => {
            sumAll += book.sum;
            sumQnt += book.qnt;
        })
        setTotal(sumQnt);
        setSum(sumAll);
        setOrders(list);
    }, []);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>주문하기</h1>
            <Table hover className='text-center justify-center align-middle'>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(book =>
                        <tr key={book.cid}>
                            <td className='text-start ps-3'><div className='ellipsis'>[{book.bid}] {book.title}</div></td>
                            <td>{book.fmtprice}원</td>
                            <td>{book.qnt}권</td>
                            <td>{book.fmtsum}원</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Alert variant='info'>
                <Row className='px-3'>
                    <Col>전체주문상품 : {books.length}종 (총 {total}권)</Col>
                    <Col className='text-end'>총 금액 : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Col>
                </Row>
            </Alert>
        </div>
    )
}

export default OrderPage