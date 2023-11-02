import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { BiSolidCommentDetail, BiCommentDetail } from 'react-icons/bi';
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReviewPage from './ReviewPage';

const BookInfo = () => {
    const [book, setBook] = useState('');
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    // console.log('.........', location.pathname)

    const navi = useNavigate();

    const { bid } = useParams();
    // console.log('............', bid);

    const getBook = async () => {
        setLoading(true);
        const res = await axios(`/books/read/${bid}?uid=${sessionStorage.getItem("uid")}`);
        // console.log(res.data);
        setBook(res.data);
        setLoading(false);
    }

    const onClickHeart = async (bid) => {
        if (sessionStorage.getItem("uid")) {
            await axios.post('/books/insert/favorite', { uid: sessionStorage.getItem("uid"), bid: bid });
            getBook();
        } else {
            sessionStorage.setItem("target", location.pathname);
            navi('/users/login');
        }
    }

    const onClickFillHeart = async (bid) => {
        await axios.post('/books/delete/favorite', { uid: sessionStorage.getItem("uid"), bid: bid });
        getBook();
    }

    useEffect(() => {
        getBook();
    }, []);

    if (loading) return <div className='my-5 text-center'><Spinner>로</Spinner></div>

    return (
        <div className='my-5'>
            <Row>
                <Col xs={4} md={4} lg={4} className='align-self-center'>
                    <Card className='p-2'>
                        <img src={book.image} width="100%" style={{ borderRadius: "2%" }} />
                    </Card>
                </Col>
                <Col>
                    <Card className='p-3' style={{ border: "none" }}>
                        <Row>
                            <Col>
                                <h3 className='mb-0'>
                                    {book.title}
                                </h3>
                            </Col>
                            <Col className='text-end'>
                                <span className='mx-3' style={{ fontSize: "1.2rem" }}>
                                    <span>
                                        <span className='message'><BiCommentDetail /></span>
                                        <span className='ms-1 rcnt'>{book.rcnt} </span>
                                    </span>
                                    <span className='ms-1'>
                                        <span className='heart'>
                                            {book.ucnt === 0 ? <TiHeartOutline onClick={() => onClickHeart(book.bid)} />
                                                : <TiHeartFullOutline onClick={() => onClickFillHeart(book.bid)} />}
                                        </span>
                                        <span className='ms-1 fcnt'>{book.fcnt}</span>
                                    </span>
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={{ fontSize: "1.2rem" }}>
                                    <hr />
                                    <div>저자 : {book.authors}</div>
                                    <div>출판사 : {book.publisher}</div>
                                    <div>ISBN : {book.isbn}</div>
                                    <div>등록일 : {book.fmtdate}</div>
                                    <hr />
                                    <div>가격 : {book.fmtprice}원</div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='mt-2 text-center'>
                                    <Button variant='warning'>장바구니</Button>
                                    <Button variant='outline-success' className='ms-2'>바로구매</Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <hr />
            <div className='tap'>
                <Tabs
                    defaultActiveKey="info"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="info" title="책 소개">
                        <div>{book.contents}</div>
                    </Tab>
                    <Tab eventKey="review" title="리뷰">
                        <ReviewPage location={location} setBook={setBook} book={book}/>
                    </Tab>
                </Tabs>
            </div>
        </div >
    )
}

export default BookInfo