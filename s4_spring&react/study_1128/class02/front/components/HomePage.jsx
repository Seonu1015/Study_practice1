import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Row, Col, Card, CardBody, InputGroup, Form, Button, CardFooter, Container } from 'react-bootstrap';

import Pagination from 'react-js-pagination';
import './Pagination.css';
import { useLocation, useNavigate } from 'react-router-dom';

import { TbClick } from "react-icons/tb";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { AiOutlineComment } from "react-icons/ai";

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const size = 12;
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;

    const [query, setQuery] = useState("");

    const navi = useNavigate();

    const getList = async () => {
        setLoading(true);
        const res = await axios(`/shop/list.json?page=${page}&size=${size}&query=${query}`);
        console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`/?page=1&size=${size}&query=${query}`);
    }

    useEffect(() => {
        getList();
    }, [location])

    if (loading) return <div className='text-center my-5'><Spinner>:)</Spinner></div>

    return (
        <>
            <Row className='mt-5'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control placeholder='상품명, 제조사' value={query} onChange={(e) => setQuery(e.target.value)} />
                            <Button type='submit'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='text-end'>
                    <span>상품 수 : {total}개</span>
                </Col>
            </Row>
            <Row className='mt-3'>
                {list.map(shop =>
                    <Col key={shop.pid} xs={6} md={4} lg={2} className='mb-3'>
                        <Card>
                            <CardBody style={{ cursor: "pointer" }} onClick={() => navi(`/shop/info/${shop.pid}`)}>
                                <img src={`/display?file=${shop.image}`} width="100%" className='mb-2'/>
                                <div className='mb-3'>
                                    <div className='ellipsis'>{shop.title}</div>
                                    <div><strong>{shop.fmtprice}원</strong></div>
                                </div>
                                <div style={{fontSize:"0.8rem"}}>
                                    <span><TbClick className='mb-1' /><small> {shop.viewcnt}</small> </span>
                                    {/* <div className='vr' /> */}
                                    <span> <AiOutlineComment className='mb-1' /><small> {shop.rcnt}</small> </span>
                                    {/* <div className='vr' /> */}
                                    <span> <PiHeartFill style={{ color: "#FE2E64" }} className='mb-1' /><small> {shop.fcnt}</small></span>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                )}
            </Row>
            {
                total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => { navi(`/?page=${page}&size=${size}&query=${query}`) }}
                />
            }
        </>
    )
}

export default HomePage