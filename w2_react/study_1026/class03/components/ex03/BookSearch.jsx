import React, { useRef } from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Button, InputGroup, Form, Row, Col } from 'react-bootstrap';
import Book from './Book';


const BookSearch = () => {
    const [books, setBooks] = useState([]); // 배열
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // 페이지 초기값 1
    const [last, setLast] = useState(1); 
    const [end, setEnd] = useState(false);
    const [query, setQuery] = useState("노드");
    const ref_txt = useRef(null);

    const getBooks = async() =>{
        const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=5&page=${page}`;
        const config={
            headers:{
                "Authorization" : "KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"
            }
        }
        setLoading(true);
        const res =await axios.get(url, config);
        // console.log(res);
        setLast(Math.ceil(res.data.meta.pageable_count/5));// 마지막 페이지
        setBooks(res.data.documents);
        setEnd(res.data.meta.is_end); // 마지막페이지면 True
        setLoading(false);
    }

    useEffect(()=>{
        getBooks();
    }, [page]);

    const onChange = (e) =>{
        setQuery(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        getBooks();
        ref_txt.current.focus();
    }

    //if(loading) return <h1 className='text-center my-5'>잠시만 기다리세요</h1>

    return (
        <div className='m-5'>
            <h1 className='text-center m-5'>도서검색</h1>
            <Row className='mb-3 justify-content-end'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control ref={ref_txt} value={query} onChange={onChange}/>
                            <Button type="submit">검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <hr/>
            <Table striped>
                <thead>
                    <tr><td>이미지</td><td>제목</td><td>가격</td><td>저자</td><td>상세보기</td></tr>
                </thead>
                <tbody>
                    {loading ? 
                        <tr><td colSpan={5}><div>로딩중</div></td></tr>
                        :
                        books.map(book=> <Book key={book.isbn} book={book}/> //자식컴포넌트를 만듦
                    )}
                </tbody>
            </Table>
            {(last > 1 && !loading) &&
                <div className='text-center'>
                    <Button onClick={()=> setPage(page-1)} disabled={page===1}>이전</Button>
                    <span className='mx-3'>{page} / {last}</span>
                    <Button onClick={()=>setPage(page+1)} disabled={end}>다음</Button>
                </div>
            }
        </div>
    )
}

export default BookSearch