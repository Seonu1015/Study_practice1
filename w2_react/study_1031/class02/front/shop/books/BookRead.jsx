import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom'

const BookRead = () => {
    const [loading, setLoading] = useState(false);
    const { bid } = useParams();
    // console.log('.................', bid)

    const [book, setBook] = useState({
        bid: "",
        title: "",
        authors: "",
        price: "",
        fmtprice: "",
        contents: "",
        publisher: "",
        image: "",
        isbn: "",
        regdate: "",
        fmtdate: ""
    });

    const { title, authors, price, fmtprice, contents, publisher, image, isbn, regdate, fmtdate } = book;

    const getBook = async () => {
        setLoading(true);
        const res = await axios('/books/read/' + bid);
        // console.log(res.data);
        setBook(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getBook();
    }, []);

    if (loading) return <div className='my-5 text-center'><Spinner variant='secondary'>로딩중</Spinner></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서 정보</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Card className='p-3'>
                        <Row>
                            <Col md={3}>
                                <div className='mt-1'>
                                    <img src={image || "http://via.placeholder.com/170x250"}
                                        width="100%" className='bookPhoto' />
                                </div>
                                <Button size='sm mt-2 w-100'>이미지 수정</Button>
                            </Col>
                            <Col className='px-3'>
                                <h3>{title}<NavLink to={`/books/update/${bid}`}><Button className='ms-3' size='sm'>정보수정</Button></NavLink></h3>
                                <hr/>
                                <div>저자 : {authors}</div>
                                <div>출판사 : {publisher}</div>
                                <div>ISBN : {isbn}</div>
                                <div>가격 : {fmtprice}원</div>
                                <div>등록일 : {fmtdate}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <hr/>
                            <div>{contents}</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BookRead