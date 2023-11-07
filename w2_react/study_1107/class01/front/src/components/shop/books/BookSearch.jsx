import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, InputGroup, Form, Row, Col, Spinner } from 'react-bootstrap';
import { BoxContext } from '../BoxContext';

const BookSearch = () => {
    const {box, setBox} = useContext(BoxContext);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);
    const [ckcnt, setCkcnt] = useState(0);

    const navi = useNavigate();

    const location = useLocation();
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const page = parseInt(search.get("page") ? search.get("page") : 1);
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "소설");

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
        let docs = res.data.documents;
        docs = docs.map(doc => doc && { ...doc, checked: false })
        setBooks(docs);
        setTotal(res.data.meta.pageable_count);
        setEnd(res.data.meta.is_end);
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, [location]);

    const onSearch = (e) => {
        e.preventDefault();
        if (query === "") {
            // alert("검색어를 입력하세요!");
            setBox({show:true, message:'검색어 입력'});
        } else {
            navi(`${path}?query=${query}&page=1`);
        }
    }

    const onInsert = async (book) => {
        // if (window.confirm("새로운 도서를 등록하시겠습니까?")) {
        //     const url = "/books/insert";
        //     const res = await axios.post(url, { ...book, authors: book.authors.join() });
        //     // console.log(res.data);
        //     if (res.data == 0) {
        //         alert("도서가 등록되었습니다.");
        //     } else {
        //         alert("이미 등록된 도서입니다.");
        //     }
        // }
        setBox({
            show:true,
            message:"새로운 도서 등록?",
            action:async()=>{
                const url="/books/insert";
                const res=await axios.post(url, {...book, authors:book.authors.join()});
                if(res.data==0){
                    setBox({show:true, message:"도서 등록"});
                }else{
                    setBox({show:true, message:"이미 등록된 도서"});
                }
            }
        });
    }

    const onChangeAll = (e) => {
        const docs = books.map(book => book && { ...book, checked: e.target.checked });
        setBooks(docs);
    }

    const onChangeSingle = (e, isbn) => {
        const docs = books.map(book => book.isbn === isbn ? { ...book, checked: e.target.checked } : book);
        setBooks(docs);
    }

    useEffect(() => {
        let cnt = 0;
        books.forEach(book => book.checked && cnt++);
        console.log(cnt);
        setCkcnt(cnt);
    }, [books])

    const onClickSave = async () => {
        if (ckcnt === 0) {
            alert("저장할 도서를 선택해주세요!");
        } else {
            if (window.confirm(`${ckcnt}권 도서를 저장하실래요?`)) {
                let count = 0;
                for (const book of books) {
                    if (book.checked) { // 도서 저장
                        const url = "/books/insert";
                        const res = await axios.post(url, { ...book, authors: book.authors.join() });
                        if (res.data == 0) count++;
                    }
                }
                alert(`${count}권이 저장되었습니다.`);
                setBooks(books.map(book => book && { ...book, checked: false }));
            }
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
                            <Form.Control value={query} onChange={(e) => setQuery(e.target.value)} />
                            <Button type="submit" variant='secondary'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th width="5%">이미지</th>
                        <th width="40%">제목</th>
                        <th width="15%">저자</th>
                        <th width="10%">가격</th>
                        <th width="5%"><input type='checkbox' onChange={onChangeAll} checked={books.length == ckcnt} /></th>
                        <th width="8%"><div className='text-center'><Button size="sm" onClick={onClickSave}>선택저장</Button></div></th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {books.map(book =>
                        <tr key={book.isbn}>
                            <td>
                                <img src={book.thumbnail || "http://via.placeholder.com/170x250"} width="100%" />
                            </td>
                            <td>{book.title}</td>
                            <td>{book.authors}</td>
                            <td>￦{book.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td width="5%"><input type='checkbox' checked={book.checked} onChange={(e) => onChangeSingle(e, book.isbn)} /></td>
                            <td><div className='text-center'><Button variant="outline-secondary" size="sm" onClick={() => onInsert(book)}>저장</Button></div></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > 5 &&
                <div className='text-center'>
                    <Button onClick={() => navi(`${path}?query=${query}&page=${page - 1}`)} variant='secondary' size="sm" disabled={page === 1}>이전</Button>
                    <span className='mx-3'>{page} / {Math.ceil(total / 5)}</span>
                    <Button onClick={() => navi(`${path}?query=${query}&page=${page + 1}`)} variant='secondary' size="sm" disabled={end}>다음</Button>
                </div>
            }
        </div>
    )
}

export default BookSearch