import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Table, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import '../Pagination.css';

const BookList = () => {


    const navi = useNavigate();

    const size = 10;
    const location = useLocation();
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const page = parseInt(search.get("page") ? search.get("page") : 1);
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");
    // console.log(path, query, page, size);

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [ckcnt, setCkcnt] = useState(0);

    const getBooks = async () => {
        const url = `/books/list.json?query=${query}&page=${page}&size=${size}`;
        setLoading(true);
        const res = await axios(url)
        // console.log(res.data.list, total);
        let list = res.data.list;
        list = list.map(book => book && { ...book, checked: false });
        setBooks(list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const onChangePage = (page) => {
        navi(`${path}?page=${page}&query=${query}&size=${size}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?page=1&query=${query}&size=${size}`);
    }

    const onDelete = async (bid) => {
        if (!window.confirm(`${bid}번 도서를 삭제하시겠습니까?`)) return;
        const res = await axios.post("/books/delete", { bid });
        if (res.data === 0) {
            alert("삭제 실패!");
        } else {
            alert("삭제 성공!");
            getBooks();
        }
    }

    useEffect(() => {
        getBooks();
    }, [location]);

    const onChangeAll = (e) => {
        const list = books.map(book => book && { ...book, checked: e.target.checked });
        setBooks(list);
    }

    const onChangeSingle = (e, bid) => {
        const list = books.map(book => book.bid === bid ? { ...book, checked: e.target.checked } : book);
        setBooks(list);
    }

    useEffect(() => {
        let cnt = 0;
        books.forEach(book => book.checked && cnt++);
        console.log(cnt);
        setCkcnt(cnt);
    }, [books]);

    const onClickDelete = async () => {
        if(ckcnt === 0) {
            alert("삭제할 도서를 선택해주세요!");
        } else {
            if(window.confirm(`${ckcnt}권 도서를 삭제하시겠습니까?`)) {
                let count = 0;
                for(const book of books) {
                    if(book.checked) {
                        const res = await axios.post("/books/delete", {bid : book.bid});
                        if(res.data === 1) count++;
                    }
                }
                alert(`${count}권 도서가 삭제되었습니다.`);
                navi(`${path}?page=1&query=${query}&size=${size}`);
            }
        }
    }

    if (loading) return <div className='my-5 text-center'><Spinner /></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서목록</h1>
            <Row className='mb-3'>
                <Col>
                    <div className='mb-3'>검색수 : {total}권</div>
                </Col>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control value={query} onChange={(e) => setQuery(e.target.value)} />
                            <Button type='submit'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>

            <Table>
                <thead>
                    <tr className='text-center'>
                        <th width="7%">이미지</th>
                        <th width="40%">제목</th>
                        <th width="15%">저자</th>
                        <th width="10%">가격</th>
                        <th width="15%">등록일자</th>
                        <th><input type='checkbox' onChange={onChangeAll} checked={books.length === ckcnt}/></th>
                        <th width="10%"><Button size="sm" onClick={onClickDelete}>선택삭제</Button></th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {books.map(book =>
                        <tr key={book.bid}>
                            <td><img src={book.image || "http://via.placeholder.com/170x250"} width="100%" /></td>
                            <td className='px-5'>
                                <div className='ellipsis'>
                                    <NavLink to={`/books/read/${book.bid}`}>{book.title}</NavLink>
                                </div>
                            </td>
                            <td className='text-center'><div className='ellipsis'>{book.authors}</div></td>
                            <td className='text-center'>￦{book.fmtprice}</td>
                            <td className='text-center'>{book.fmtdate}</td>
                            <td className='text-center'><input type='checkbox' checked={book.checked} onChange={(e) => onChangeSingle(e, book.bid)} /></td>
                            <td className='text-center'><Button size="sm" variant='danger' onClick={() => onDelete(book.bid)}>삭제</Button></td>
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
    );
}

export default BookList