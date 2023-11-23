import axios from 'axios';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Table, Spinner, InputGroup, Form, Button, Row, Col } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import '../Pagination.css';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderModal from './OrderModal';
import {BoxContext} from '../BoxContext';

const OrderAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const {setBox} = useContext(BoxContext);

    const navi = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const size = 5;
    const [query, setQuery] = useState("");

    const getList = async () => {
        setLoading(true);
        const res = await axios(`/orders/list.json?page=${page}&size=${size}&query=${query}`);
        // console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const onChangePage = (page) => {
        navi(`/orders/admin?page=${page}&size=${size}&query=${query}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`/orders/admin?page=1&size=${size}&query=${query}`);
    }

    const onChangeStatus = (e, pid) => {
        const plist = list.map(p=> p.pid===pid ? {...p, status:e.target.value} : p);
        setList(plist);
    }

    const onClickChange = (pid, status) => {
        setBox({
            show:true,
            message:`${pid}주문 상태를 '${status}'로 변경하시겠습니까?`,
            action: async () => {
                await axios.post('/orders/update', {pid, status})
                getList();
            }
        });
    }

    useEffect(() => {
        getList();
    }, [location]);

    if (loading) return <div className='text-center my-5'><Spinner>:-(</Spinner></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>주문관리</h1>
            <Row className='mb-2'>
                <Col>
                    검색 수: {total}건
                </Col>
                <Col md={3} className='text-end'>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control placeholder='주문자, 주소, 전화' value={query}
                                onChange={(e) => setQuery(e.target.value)} />
                            <Button type='submit'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Table hover className='text-center'>
                <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>주문날짜</th>
                        <th>아이디</th>
                        <th colSpan={2}>배송정보</th>
                        <th>주문금액</th>
                        <th>주문상태</th>
                        <th>주문상세</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p =>
                        <tr key={p.pid}>
                            <td>{p.pid}</td>
                            <td>{p.fmtdate}</td>
                            <td>{p.uid}</td>
                            <td>{p.rname}</td>
                            <td className='text-start ps-3'>
                                <div>주소 : {p.raddress1} {p.raddress2}</div>
                                <div>연락처 : {p.rphone}</div>
                            </td>
                            <td>{p.fmtsum}</td>
                            <td>
                                <InputGroup>
                                    <Form.Select value={p.status} onChange={(e) => onChangeStatus(e, p.pid)}>
                                        <option value="0">결제 확인 중</option>
                                        <option value="1">결제 완료</option>
                                        <option value="2">배송 준비 중</option>
                                        <option value="3">배송 중</option>
                                        <option value="4">배송 완료</option>
                                        <option value="5">주문 완료</option>
                                    </Form.Select>
                                    <Button size='sm' variant='secondary' onClick={() => onClickChange(p.pid, p.str_result)}>변경</Button>
                                </InputGroup>
                            </td>
                            <td><OrderModal purchase={p} sum={p.fmtsum} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage} />
            }
        </div>
    )
}

export default OrderAdmin