import React, { useEffect, useState, useContext } from 'react'
import OrderPage from './OrderPage'
import { useLocation, useNavigate } from 'react-router-dom'
import { Alert, Table, Button, Spinner, Row, Col } from 'react-bootstrap';
import { RiDeleteBin5Line } from 'react-icons/ri'
import axios from 'axios';
import { BoxContext } from '../BoxContext';

const CartPage = () => {
    const { box, setBox } = useContext(BoxContext);

    const location = useLocation();
    const pathname = location.pathname;
    const search = new URLSearchParams(location.search);
    const show = search.get("show") ? search.get("show") : 'cart';
    // console.log(show);

    const navi = useNavigate();

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sum, setSum] = useState(0);
    const [qnt, setQnt] = useState(0);
    const [chk, setChk] = useState(0);

    const onClickOrder = () => {
        if (chk == 0) {
            setBox({
                show: true,
                message: "주문할 상품을 선택하세요!"
            });
        } else {
            navi(`${pathname}?show=order`);
        }
    }

    const onDelete = (cid) => {
        setBox({
            show: true,
            message: `${cid}번 장바구니 상품을 삭제하시겠습니까?`,
            action: async () => {
                await axios.post('/cart/delete', { cid });
                getCart();
            }
        });
    }

    const getCart = async () => {
        setLoading(true);
        const res = await axios(`/cart/list.json?uid=${sessionStorage.getItem("uid")}`);
        let list = res.data.list;
        list = list.map(book => book && { ...book, checked: false });
        // console.log(list);
        setBooks(list);
        let sum1 = 0;
        let sum2 = 0;
        list.forEach(book => {
            sum1 += book.sum;
            sum2 += book.qnt;
        });
        setSum(sum1);
        setQnt(sum2);
        setLoading(false);
    }

    const onChange = (e, cid) => {
        const list = books.map(book => book.cid === cid ? { ...book, qnt: e.target.value } : book);
        setBooks(list);
    }

    const onUpdate = (cid, qnt) => {
        setBox({
            show: true,
            message: `${cid}번 상품의 수량을 ${qnt}권으로 변경하시겠습니까?`,
            action: async () => {
                await axios.post('/cart/update', { cid, qnt });
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

    useEffect(() => {
        getCart();
    }, [])

    useEffect(() => {
        let cnt = 0;
        books.forEach(book => book.checked && cnt++)
        setChk(cnt);
    }, [books])

    const onDeleteChecked = () => {
        if (chk === 0) {
            setBox({
                show: true,
                message: "삭제할 상품을 선택하세요!"
            });
        } else {
            setBox({
                show: true,
                message: `${chk}권을 삭제하시겠습니까?`,
                action: async (cid) => {
                    for (const book of books) {
                        if (book.checked) {
                            await axios.post('/cart/delete', { cid: book.cid });
                        }
                    }
                    getCart();
                }
            });
        }
    }

    if (loading) return <div className='my-5 text-center'><Spinner>:-D</Spinner></div>

    return (
        <>
            {show === "cart" &&
                <div className='my-5'>
                    <h1 className='text-center mb-5'>장바구니</h1>
                    <Table hover className='text-center justify-center align-middle'>
                        <thead>
                            <tr>
                                <th><input type='checkbox' onChange={onChangeAll} checked={books.length === chk} /></th>
                                <th>제목</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>합계</th>
                                <th>선택삭제<RiDeleteBin5Line className='delete ms-2'
                                    onClick={onDeleteChecked} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book =>
                                <tr key={book.cid}>
                                    <td><input type='checkbox' checked={book.checked} onChange={(e) => onChangeSingle(e, book.cid)} /></td>
                                    <td className='text-start ps-3'><div className='ellipsis'>[{book.bid}] {book.title}</div></td>
                                    <td>{book.fmtprice}원</td>
                                    <td>
                                        <input value={book.qnt} size={3} className='text-end' onChange={(e) => onChange(e, book.cid)} />
                                        <Button size='sm ms-1' onClick={() => onUpdate(book.cid, book.qnt)}>변경</Button>
                                    </td>
                                    <td>{book.fmtsum}원</td>
                                    <td><RiDeleteBin5Line className='delete'
                                        onClick={() => onDelete(book.cid)} /></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Alert key={'info'} variant={'info'}>
                        <Row>
                            <Col>주문상품수량 : {books.length}종 (총 {qnt}권)</Col>
                            <Col className='text-end'>총 상품금액 : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Col>
                        </Row>
                    </Alert>
                    <div className='text-center'>
                        {books.length > 0 &&
                            <Button className='px-4' onClick={onClickOrder}>주문하기</Button>
                        }
                        <Button variant='warning' className='px-2 ms-2' >쇼핑계속하기</Button>
                    </div>
                </div>
            }
            {show === "order" &&
                <OrderPage books={books} />
            }
        </>
    )
}

export default CartPage