import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';

import Pagination from 'react-js-pagination';
import '../Pagination.css';

import ModalOrder from '../order/ModalOrder';

const OrderList = () => {
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const [key, setKey] = useState("uid");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const size = 3;

    const getList = async () => {
        const res = await axios(`/purchase/admin/list.json?key=${key}&query=${query}&page=${page}&size=${size}`)
        setList(res.data.list);
        setTotal(res.data.total);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        getList();
    }

    const onSubmitStatus = (e) => {
        setKey("status");
        setPage(1);
        getList();
    }

    const onChangeStatus = (e, oid) => {
        const data = list.map(p => p.oid === oid ? { ...p, status: e.target.value } : p);
        setList(data);
    }

    const onClickStatus = async (oid, status) => {
        await axios.post("/purchase/update/status", { oid, status });
        alert("주문상태 변경 완료!");
        getList();
    }

    const onChangeKey = (e) => {
        setQuery("");
        setKey(e.target.value);
    }

    useEffect(() => {
        getList();
    }, [page])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>주문관리</h1>
            <Row className='mb-3'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Select onChange={onChangeKey}>
                                <option value="oid">주문번호</option>
                                <option value="uname">주문자명</option>
                                <option value="uid">아이디</option>
                                <option value="phone">연락처</option>
                                <option value="address1">배송지</option>
                                <option value="status">주문상태</option>
                            </Form.Select>
                            {key === "status" ?
                                <Form.Select onChange={(e) => setQuery(e.target.value)}>
                                    <option value=""></option>
                                    <option value="0">결제확인중</option>
                                    <option value="1">결제완료</option>
                                    <option value="2">배송준비중</option>
                                    <option value="3">배송중</option>
                                    <option value="4">배송완료</option>
                                    <option value="5">구매확정</option>
                                </Form.Select>
                                :
                                <Form.Control placeholder='Search' value={query} onChange={(e) => setQuery(e.target.value)} />
                            }
                            <Button type='submit' variant='secondary'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col>
                </Col>
                {/* <Col md={2}>
                    <Form.Select onChange={(e) => setQuery(e.target.value)}>
                        <option value="0">결제확인중</option>
                        <option value="1">결제완료</option>
                        <option value="2">배송준비중</option>
                        <option value="3">배송중</option>
                        <option value="4">배송완료</option>
                        <option value="5">구매확정</option>
                    </Form.Select>
                </Col> */}
                <Col>
                    <div className='text-end mb-3'>
                        (총 검색 수 : {total}건)
                    </div>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr className='text-center'>
                        <th>주문번호</th>
                        <th>주문자명</th>
                        <th>연락처</th>
                        <th>배송지</th>
                        <th>상세보기</th>
                        <th>주문상태</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {list.map(p =>
                        <tr key={p.oid}>
                            <td>{p.oid}</td>
                            <td>{p.uname}({p.uid})</td>
                            <td>{p.phone}</td>
                            <td>{p.address1}</td>
                            <td><ModalOrder p={p}/></td>
                            <td>
                                <InputGroup size='sm'>
                                    <Form.Select value={p.status} onChange={(e) => onChangeStatus(e, p.oid)}>
                                        <option value="0">결제확인중</option>
                                        <option value="1">결제완료</option>
                                        <option value="2">배송준비중</option>
                                        <option value="3">배송중</option>
                                        <option value="4">배송완료</option>
                                        <option value="5">구매확정</option>
                                    </Form.Select>
                                    <Button onClick={() => onClickStatus(p.oid, p.status)}>변경</Button>
                                </InputGroup>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {
                total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => setPage(page)}
                />
            }
        </div>
    )
}

export default OrderList