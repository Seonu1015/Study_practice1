import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner, Row, Col, Table, Button, InputGroup, Form } from 'react-bootstrap';

import Pagination from 'react-js-pagination';
import '../Pagination.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ShopList = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [query, setQuery] = useState("");

    const size = 5;
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;

    const navi = useNavigate();

    const getList = async () => {
        setLoading(true);
        const res = await axios(`/shop/list.json?page=${page}&size=${size}&query=${query}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`/shop/list?page=1&size=${size}&query=${query}`);
    }

    const onDelete = async (shop) => {
        if(window.confirm(`${shop.pid}번 상품을 삭제하시겠습니까?`)) {
            await axios(`/shop/delete?pid=${shop.pid}`);
            await axios(`/deleteFile?file=${shop.image}`);
            alert("해당 상품을 삭제하였습니다.");
            navi(`/shop/list?page=1&size=${size}&query=${query}`);
        }
    }

    useEffect(() => {
        getList();
    }, [location]);

    if (loading) return <div className='text-center my-5'><Spinner>:)</Spinner></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품목록</h1>
            <Row className='mb-3 justify-content-center align-middle'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control value={query} placeholder='상품명, 제조사' onChange={(e) => setQuery(e.target.value)}/>
                            <Button type='submit' variant='secondary'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='text-end'>
                    <span>상품 수 : {total}개</span>
                </Col>
            </Row>
            <Table hover>
                <thead>
                    <tr className='text-center'>
                        <th colSpan={2}>ID</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>제조사</th>
                        <th>등록일</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody className='justify-content-center align-middle'>
                    {list.map(s =>
                        <tr key={s.pid} className='text-center' onClick={() => navi(`/shop/update/${s.pid}`)} style={{cursor:"pointer"}}>
                            <td>{s.pid}</td>
                            <td><img src={`/display?file=${s.image}`} width="50"/></td>
                            <td className='text-start'><div className='ellipsis'>{s.title}</div></td>
                            <td>{s.fmtprice}원</td>
                            <td>{s.maker}</td>
                            <td>{s.fmtdate}</td>
                            <td><Button variant='danger' size='sm' onClick={() => onDelete(s)}>삭제</Button></td>
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
                    onChange={(page) => {navi(`/shop/list?page=${page}&size=${size}&query=${query}`)}}
                />
            }
        </div>
    );
}

export default ShopList