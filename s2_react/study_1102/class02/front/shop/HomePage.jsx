import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Spinner, Card, CardFooter, CardBody, Form, InputGroup, Button } from 'react-bootstrap';
import { BiSolidCommentDetail, BiCommentDetail } from 'react-icons/bi';
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import Pagination from "react-js-pagination";
import './Pagination.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const navi = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = parseInt(search.get("page") ? search.get("page") : 1);
    const path = location.pathname;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");
    const size = 12;

    const getBooks = async () => {
        setLoading(true);
        const url = `/books/list.json?query=${query}&page=${page}&size=${size}&uid=${sessionStorage.getItem("uid")}`;
        const res = await axios(url)
        // console.log(res.data);
        setBooks(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const onChangePage = (page) => {
        navi(`${path}?query=${query}&page=${page}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?query=${query}&page=${page}`);
    }

    const onClickHeart = async (bid) => {
        if (sessionStorage.getItem("uid")) {
            await axios.post('/books/insert/favorite', { uid: sessionStorage.getItem("uid"), bid: bid });
            getBooks();
        } else {
            navi('/users/login');
        }
    }

    const onClickFillHeart = async (bid) => {
        await axios.post('/books/delete/favorite', { uid: sessionStorage.getItem("uid"), bid: bid });
        getBooks();
    }

    useEffect(() => {
        getBooks();
    }, [location]);

    if (loading) return <div className='my-5 text-center'><Spinner>로</Spinner></div>

    return (
        <div className='my-5'>
            <Row className='mb-3 justify-content-end'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control placeholder='제목 or 내용 or 저자' value={query} onChange={(e) => setQuery(e.target.value)} />
                            <Button type='submit'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Row>
                {books.map(book =>
                    <Col xs={6} md={4} lg={2} className='mb-3' key={book.bid}>
                        <Card>
                            <CardBody className='p-2'>
                                <NavLink to={`/books/info/${book.bid}`}>
                                    <img src={book.image || "http://via.placeholder.com/170x245"} width="100%" />
                                </NavLink>
                                
                                <div className='ellipsis'>{book.title}</div>
                            </CardBody>
                            <CardFooter>
                                <div className='text-end'>
                                    {book.rcnt === 0 ||
                                        <span>
                                            <span className='message'><BiCommentDetail /></span>
                                            <span className='ms-1 rcnt'>{book.rcnt} </span>
                                        </span>
                                    }
                                    <span className='ms-1'>
                                        <span className='heart'>
                                            {book.ucnt === 0 ? <TiHeartOutline onClick={() => onClickHeart(book.bid)} />
                                                : <TiHeartFullOutline onClick={() => onClickFillHeart(book.bid)} />}
                                        </span>
                                        <span className='ms-1 fcnt'>{book.fcnt}</span>
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                )}
            </Row>
            {total > 6 &&
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
    );
}

export default HomePage