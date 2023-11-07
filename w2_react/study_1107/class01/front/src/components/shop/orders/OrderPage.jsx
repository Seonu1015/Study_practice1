import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, InputGroup, Row, Table, Spinner } from 'react-bootstrap';
import ModalPostCode from '../users/ModalPostCode';
import { BoxContext } from '../BoxContext';

const OrderPage = ({ books }) => {
    const [loading, setLoading] = useState(false);
    const {setBox} = useContext(BoxContext);
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);
    const [form, setForm] = useState({
        uid: '',
        uname: '',
        phone: '',
        address1: '',
        address2: ''
    });

    const getUser = async () => {
        const res = await axios.get(`/users/read/${sessionStorage.getItem("uid")}`)
        // console.log(res.data);
        setForm(res.data);
    }

    const { uid, uname, phone, address1, address2 } = form;

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
        getUser();
    }, []);

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onOrder = () => {
        setBox({
            show: true,
            message: "주문을 진행하시겠습니까?",
            action: async () => {
                setLoading(true);
                const data = {...form, sum, uid};
                // console.log(data);
                const res = await axios.post("/orders/insert/purchase", data);
                const pid = res.data.last;
                // console.log(pid)
                // 주문 상품 저장
                for(const order of orders) {
                    const data = {...order, pid}
                    // console.log(data)
                    await axios.post("/orders/insert", data);
                }
                setLoading(false);
                window.location.href = "/";
            }
        });
    }

    if(loading) return <div className='my-5 text-center'><Spinner>:-)</Spinner></div>

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
                    <Col>전체주문상품 : {orders.length}종 (총 {total}권)</Col>
                    <Col className='text-end'>총 금액 : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Col>
                </Row>
            </Alert>
            <div>
                <h1 className='text-center mt-5 mb-3'>주문자 정보</h1>
                <Card className='p-3'>
                    <form>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>이름</InputGroup.Text>
                            <Form.Control name="uname" value={uname} onChange={onChange} />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>연락처</InputGroup.Text>
                            <Form.Control name="phone" value={phone} onChange={onChange} />
                        </InputGroup>
                        <InputGroup className='mb-1'>
                            <InputGroup.Text>배송지</InputGroup.Text>
                            <Form.Control name="address1" value={address1} onChange={onChange} />
                            <ModalPostCode user={form} setUser={setForm} />
                        </InputGroup>
                        <Form.Control name="address2" className='mb-3' placeholder='상세 주소'
                            value={address2} onChange={onChange} />
                    </form>
                </Card>
            </div>
            <div className='my-3 text-center'>
                <Button className='px-5' type='submit' onClick={onOrder}>주문하기</Button>
            </div>
        </div>
    )
}

export default OrderPage