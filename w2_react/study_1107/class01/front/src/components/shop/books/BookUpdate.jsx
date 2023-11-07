import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { NavLink, useNavigate, useParams } from 'react-router-dom'

const BookUpdate = () => {
    const [loading, setLoading] = useState(false);
    const { bid } = useParams();
    // console.log('.................', bid)

    const navi = useNavigate();

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

    const onChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        // 원래는 유효성 체크 다 해줘야함, 일단 했다치고!
        if(window.confirm("수정된 내용을 저장하실래요?")) {
            // 수정 작업
            const res = await axios.post('/books/update', book);
            if(res.data === 0) {
                alert("수정이 불가능한 상태입니다.");
            } else {
                alert("수정이 완료되었습니다.");
                navi(`/books/read/${bid}`);
            }
        }
    }

    useEffect(() => {
        getBook();
    }, []);

    if (loading) return <div className='my-5 text-center'><Spinner variant='secondary'>로딩중</Spinner></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서 정보 수정</h1>
            <Row className='justify-content-center'>
                <Col md={10}>
                    <form onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>도서코드</InputGroup.Text>
                            <Form.Control name='bid' value={bid} readOnly/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>제목</InputGroup.Text>
                            <Form.Control name='title' value={title} onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>저자</InputGroup.Text>
                            <Form.Control name='authors' value={authors} onChange={onChange} />
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>출판사</InputGroup.Text>
                            <Form.Control name='publisher' value={publisher} onChange={onChange} />
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>가격</InputGroup.Text>
                            <Form.Control name='price' value={price} onChange={onChange} />
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>소개글</InputGroup.Text>
                            <Form.Control as="textarea" rows={7} name='contents' value={contents} onChange={onChange} />
                        </InputGroup>
                        <div className='text-center my-3'>
                            <Button className='me-3' type='submit'>수정</Button>
                            <Button variant='secondary' onClick={()=>getBook()}>취소</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    )
}

export default BookUpdate