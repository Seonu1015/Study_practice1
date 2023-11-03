import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Table, Button, Spinner, Row, Col, Card, Alert } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import '../Pagination.css';
import {RiDeleteBin5Line} from 'react-icons/ri';
import {BoxContext} from '../BoxContext';

const CartPage = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const size = 5;
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);
    const {box, setBox} = useContext(BoxContext);
    const [sumqnt, setSumqnt] = useState(0);

    const getCart = async () => {
        setLoading(true)
        const res = await axios.get(`/cart/list.json?uid=${sessionStorage.getItem("uid")}&page=${page}&size=${size}`);
        console.log(res.data);
        setBooks(res.data.list);
        setTotal(res.data.total);
        const res1 = await axios.get(`/cart/sum?uid=${sessionStorage.getItem("uid")}`);
        setSum(res1.data.fmtsum);
        setSumqnt(res1.data.sumqnt);
        setLoading(false);
    }

    const onChangePage = (page) => {
        setPage(page);
    }

    const onClickDelete = (cid) => {
        setBox({
            show:true,
            message: `${cid}번 주문 상품을 삭제하시겠습니까?`,
            action: async () => {
                const res = await axios.post('/cart/delete', {cid});

                if(page === 1) {
                    getCart();
                } else {
                    setPage(1);
                }
            }
        });
    }

    const onChange = (e, cid) => {
        setBooks(books.map(book => book.cid === cid ? {...book, qnt:e.target.value} : book));
    }

    const onClickUpdate = (cid, qnt) => {
        setBox({
            show:true,
            message:`${cid}번 상품 수량을 ${qnt}로 변경하시겠습니까?`,
            action: async () => {
                await axios.post('/cart/update', {qnt, cid});
                getCart();
            }
        });
    }

    useEffect(() => { getCart(); }, [page]);

    if (loading) return <div className='text-center my-5'><Spinner variant='success'>:-P</Spinner></div>
    return (
        <div className='my-5'>
            <h1 className='text-center'> 장바구니 목록 </h1>

            <Table className='text-center align-middle'>
                <thead>
                    <tr>
                        <th>책ID (주문ID)</th>
                        <th colSpan={2}>제목</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>합계</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book =>
                        <tr key={book.cid}>
                            <td>{book.bid} ({book.cid})</td>
                            <td><img src={book.image || "http://via.placeholder.com/100x100"} width={30} /></td>
                            <td className='text-start'>{book.title}</td>
                            <td>{book.fmtprice}원</td>
                            <td>
                                <input value={book.qnt} size={2} className='text-end' onChange={(e)=>onChange(e, book.cid)}/>
                                <Button size='sm ms-1' onClick={()=>onClickUpdate(book.cid, book.qnt)}>변경</Button>
                            </td>
                            <td>{book.fmtsum}원</td>
                            <td><RiDeleteBin5Line onClick={()=> onClickDelete(book.cid)} style={{cursor:"pointer"}}/></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage} />
            }
            <div>
                <Alert>
                    <Row>
                        <Col>주문상품수량 : {total}종 (총 {sumqnt}권)</Col>
                        <Col className='text-end'>총 상품금액:{sum}원</Col>
                    </Row>
                </Alert>
            </div>
        </div>
    )
}

export default CartPage