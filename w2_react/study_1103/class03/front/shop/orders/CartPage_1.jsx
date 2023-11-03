import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Table, Button, Spinner, Row, Col, Card, Alert } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import '../Pagination.css';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BoxContext } from '../BoxContext';
import OrderPage from './OrderPage_1';
import { useLocation, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [sum, setSum] = useState(0);
    const { box, setBox } = useContext(BoxContext);
    const [sumqnt, setSumqnt] = useState(0);
    const [chk, setChk] = useState(0);

    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const show = search.get("show") ? search.get("show") : 'cart';
    const pathname = location.pathname;
    const navi = useNavigate();

    const getCart = async () => {
        setLoading(true)
        const res = await axios.get(`/cart/list.json?uid=${sessionStorage.getItem("uid")}`);
        // console.log(res.data);
        let list = res.data.list;
        list = list.map(book => book && { ...book, checked: false });
        setBooks(list);
        const res1 = await axios.get(`/cart/sum?uid=${sessionStorage.getItem("uid")}`);
        setSum(res1.data.fmtsum);
        setSumqnt(res1.data.sumqnt);
        setLoading(false);
    }

    const onClickDelete = (cid) => {
        setBox({
            show: true,
            message: `${cid}번 주문 상품을 삭제하시겠습니까?`,
            action: async () => {
                const res = await axios.post('/cart/delete', { cid });
                getCart();
            }
        });
    }

    const onChange = (e, cid) => {
        setBooks(books.map(book => book.cid === cid ? { ...book, qnt: e.target.value } : book));
    }

    const onClickUpdate = (cid, qnt) => {
        setBox({
            show: true,
            message: `${cid}번 상품 수량을 ${qnt}로 변경하시겠습니까?`,
            action: async () => {
                await axios.post('/cart/update', { qnt, cid });
                getCart();
            }
        });
    }

    const onChangeAll = (e) => {
        const list = books.map(book => book && { ...book, checked: e.target.checked });
        setBooks(list);
    }

    const onChangeSingle = (e, cid) => {
        const list = books.map(book => book.cid === cid ? { ...book, checked: e.target.checked } : book);
        setBooks(list);
    }

    const onDeleteChecked = () => {
        if (chk === 0) {
            setBox({
                show: true,
                message: "삭제할 도서들을 선택하세요!"
            });
        } else {
            setBox({
                show: true,
                message: `${chk}권 도서를 삭제하시겠습니까?`,
                action: async () => {
                    for (const book of books) {
                        if (book.checked) {
                            const cid = book.cid;
                            // console.log(cid);
                            await axios.post('/cart/delete', { cid });
                        }
                    }
                    setBox({ show: true, message: `${chk}권 도서가 삭제되었습니다.` })
                    getCart();
                }
            });
        }
    }

    const onClickOrder = () => {
        if (chk === 0) {
            setBox({
                show: true,
                message: "주문할 상품을 선택하세요!"
            });
        } else {
            navi(`${pathname}?show=order`);
        }
    }

    useEffect(() => {
        getCart();
    }, []);

    useEffect(() => {
        let cnt = 0;
        books.forEach(book => book.checked && cnt++);
        // console.log(cnt);
        setChk(cnt);
    }, [books]);

    if (loading) return <div className='text-center my-5'><Spinner variant='success'>:-P</Spinner></div>
    return (
        <>
            {show === 'cart' ?
                <div className='my-5'>
                    <h1 className='text-center mb-5'> 장바구니 목록 </h1>

                    <Table className='text-center align-middle'>
                        <thead>
                            <tr>
                                <th>
                                    <input type='checkbox' onChange={onChangeAll} checked={books.length === chk} />
                                </th>
                                <th width="7%">ID</th>
                                <th colSpan={2}>제목</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>합계</th>
                                <th><Button size='sm' variant='outline-secondary' onClick={onDeleteChecked}>선택삭제</Button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book =>
                                <tr key={book.cid}>
                                    <td>
                                        <input type='checkbox' checked={book.checked} onChange={(e) => onChangeSingle(e, book.cid)} />
                                    </td>
                                    <td>{book.bid}</td>
                                    <td><img src={book.image || "http://via.placeholder.com/100x100"} width={30} /></td>
                                    <td className='text-start'>{book.title}</td>
                                    <td>{book.fmtprice}원</td>
                                    <td>
                                        <input value={book.qnt} size={2} className='text-end' onChange={(e) => onChange(e, book.cid)} />
                                        <Button size='sm ms-1' onClick={() => onClickUpdate(book.cid, book.qnt)}>변경</Button>
                                    </td>
                                    <td>{book.fmtsum}원</td>
                                    <td><RiDeleteBin5Line onClick={() => onClickDelete(book.cid)} style={{ cursor: "pointer" }} /></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div>
                        <Alert>
                            <Row>
                                <Col>주문상품수량 : {books.length}종 (총 {sumqnt}권)</Col>
                                <Col className='text-end'>총 상품금액 : {sum}원</Col>
                            </Row>
                        </Alert>
                    </div>
                    {books.length > 0 &&
                        <div className='text-center my-5'>
                            <Button className='me-3 px-4' onClick={onClickOrder}>주문하기</Button>
                            <Button>쇼핑계속하기</Button>
                        </div>
                    }
                </div>
                :
                <OrderPage books={books} />
            }
        </>
    )
}

export default CartPage