import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, InputGroup, Form, Row, Col, Spinner } from 'react-bootstrap';

const BookSearch = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);

    const navi = useNavigate();

    const location = useLocation();
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const page = parseInt(search.get("page") ? search.get("page") : 1);
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "리액트");
    
    const getBooks = async () => {
        const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=5&page=${page}`;
        const config = {
            headers: {
                "Authorization": "KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"
            }
        }
        setLoading(true);
        const res = await axios.get(url, config);
        // console.log(res.data);
        setBooks(res.data.documents);
        setTotal(res.data.meta.pageable_count);
        setEnd(res.data.meta.is_end);
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, [location]);

    const onSearch = (e)  => {
        e.preventDefault();
        if(query==="") {
            alert("검색어를 입력하세요!");
        } else {
            navi(`${path}?query=${query}&page=1`);
        }
    }

    if (loading) return <div className='text-center my-5'><Spinner animation="border" /></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서검색</h1>
            <Row className='mb-3'>
                <Col>
                    검색수 : {total}권
                </Col>
                <Col md={4}>
                    <form onSubmit={onSearch}>
                        <InputGroup>
                            <Form.Control value={query} onChange={(e) => setQuery(e.target.value)}/>
                            <Button type="submit" variant='secondary'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th width="7%">이미지</th>
                        <th width="40%">제목</th>
                        <th width="15%">저자</th>
                        <th width="15%">가격</th>
                        <th width="5%">저장</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {books.map(book =>
                        <tr key={book.isbn}>
                            <td>
                                <img src={book.thumbnail || "http://via.placeholder.com/170x250"} width={30} />
                            </td>
                            <td>{book.title}</td>
                            <td>{book.authors}</td>
                            <td>￦{book.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td><Button variant="outline-secondary" size="sm">저장</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > 5 &&
                <div className='text-center'>
                    <Button onClick={() => navi(`${path}?query=${query}&page=${page-1}`)} variant='secondary' size="sm" disabled={page===1}>이전</Button>
                    <span className='mx-3'>{page} / {Math.ceil(total / 5)}</span>
                    <Button onClick={() => navi(`${path}?query=${query}&page=${page+1}`)} variant='secondary' size="sm" disabled={end}>다음</Button>
                </div>
            }
        </div>
    )
}

export default BookSearch