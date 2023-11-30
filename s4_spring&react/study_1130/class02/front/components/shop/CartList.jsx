import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Table, Button, Row, Col, Alert } from 'react-bootstrap';

import Pagination from 'react-js-pagination';
import '../Pagination.css';

import { RiDeleteBin5Line } from "react-icons/ri";
import OrderPage from './OrderPage';

const CartList = () => {
    const [isOrder, setIsOrder] = useState(false);

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState("");
    const [checkedSum, setCheckedSum] = useState(0);
    const [cnt, setCnt] = useState(0);

    const size = 1000;
    const [page, setPage] = useState(1);
    const uid = sessionStorage.getItem("uid");

    const getList = async () => {
        const res = await axios(`/cart/list.json?page=${page}&size=${size}&uid=${uid}`);
        // console.log(res.data);
        const data = res.data.list.map(c => c && { ...c, checked: false });
        setList(data);
        setTotal(res.data.total);
        setSum(res.data.sum);
    }

    const onDelete = async (cid) => {
        if (window.confirm("해당 상품을 삭제하시겠습니까?")) {
            await axios.post(`/cart/delete/${cid}`);
            getList();
        }
    }

    const onChangeAll = (e) => {
        const data = list.map(c => c && { ...c, checked: e.target.checked });
        setList(data);
    }

    const onChangeSingle = (e, cid) => {
        const data = list.map(c => c.cid === cid ? { ...c, checked: e.target.checked } : c);
        setList(data);
    }

    const onDeleteChecked = async () => {
        if (cnt == 0) {
            alert("삭제할 상품을 선택하세요.");
        } else {
            for (const c of list) {
                if (c.checked) {
                    await axios.post(`/cart/delete/${c.cid}`);
                }
            }
            getList();
        }
    }

    const onChangeQnt = (e, cid) => {
        const data = list.map(c => c.cid === cid ? { ...c, qnt: e.target.value } : c);
        setList(data);
    }

    const onUpdateQnt = async (cid, qnt) => {
        await axios.post("/cart/update/qnt", { cid, qnt });
        alert("수량이 변경되었습니다.");
        getList();
    }

    const onClickOrder = () => {
        if (cnt === 0) {
            alert("주문할 상품을 선택하세요!");
        } else {
            setIsOrder(true);
        }
    }

    useEffect(() => {
        getList();
    }, [page])

    useEffect(() => {
        let count = 0;
        let sum = 0;
        list.forEach(c => { // 여러 줄일 때는 중괄호를 사용해서 묶어주자!
            if (c.checked) {
                count++;
                sum += c.sum;
            }
        });
        setCnt(count);
        setCheckedSum(sum);
    }, [list])

    return (
        <>
            {!isOrder ?
                <div className='my-5'>
                    <h1 className='text-center mb-5'>장바구니</h1>
                    {list.length > 0 ?
                        <>
                            <Table className='text-center justify-content-center align-middle'>
                                <thead>
                                    <tr>
                                        <th>
                                            <input type='checkbox' onClick={onChangeAll} checked={list.length === cnt} />
                                        </th>
                                        <th colSpan={2}>상품명</th>
                                        <th width="12%">가격</th>
                                        <th width="12%">수량</th>
                                        <th width="12%">금액</th>
                                        <th width="10%"><Button variant='danger' size='sm' onClick={onDeleteChecked}>선택삭제</Button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map(c =>
                                        <tr key={c.cid}>
                                            <td>
                                                <input type='checkbox' checked={c.checked} onClick={(e) => onChangeSingle(e, c.cid)} />
                                            </td>
                                            <td><img src={`/display?file=${c.image}`} width="50" /></td>
                                            <td className='text-start'><div className='ellipsis'>(주문번호 : {c.cid}) [{c.pid}] {c.title}</div></td>
                                            <td>{c.fmtprice}원</td>
                                            <td>
                                                <InputGroup size='sm'>
                                                    <Form.Control value={c.qnt} style={{ maxWidth: "40%", marginLeft: "20px" }} onChange={(e) => onChangeQnt(e, c.cid)} />
                                                    <Button variant='outline-primary' onClick={(e) => onUpdateQnt(c.cid, c.qnt)}>변경</Button>
                                                </InputGroup>
                                            </td>
                                            <td>{c.fmtsum}원</td>
                                            <td><RiDeleteBin5Line style={{ color: "red", cursor: "pointer" }} className='mb-1' onClick={() => onDelete(c.cid)} /></td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            {
                                total > size &&
                                <Pagination
                                    activePage={page}
                                    itemsCountPerPage={size}
                                    totalItemsCount={total}
                                    pageRangeDisplayed={5}
                                    prevPageText={"‹"}
                                    nextPageText={"›"}
                                    onChange={(page) => setPage(page)}
                                />
                            }
                            <Row>
                                <Col>
                                    <Alert variant='info'>
                                        <Row>
                                            <Col>
                                                <div>선택 상품 총 금액 : {checkedSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                                            </Col>
                                            <Col className='text-end'>
                                                <div>총 금액 : {sum}원</div>
                                            </Col>
                                        </Row>
                                    </Alert>
                                    <div className='text-center'>
                                        <Button className='px-5' onClick={onClickOrder}>주문하기</Button>

                                    </div>
                                </Col>
                            </Row>
                        </>
                        :
                        <Row className='text-center justify-content-center'>
                            <Col md={8}>
                                <Alert className='p-5' variant='secondary'><h4>장바구니에 상품이 없습니다.</h4></Alert>
                            </Col>
                        </Row>
                    }

                </div>
                :
                <OrderPage list={list} checkedSum={checkedSum} />
            }
        </>
    )
}

export default CartList