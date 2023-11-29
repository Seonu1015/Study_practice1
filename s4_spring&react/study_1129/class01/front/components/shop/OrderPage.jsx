import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Table, Button, Row, Col, Alert } from 'react-bootstrap';
import ModalPost from '../user/ModalPost';


const OrderPage = ({ list, checkedSum }) => {

    const [form, setForm] = useState("");
    const { uid, uname, phone, address1, address2 } = form;

    const getUser = async () => {
        const res = await axios(`/user/read?uid=${sessionStorage.getItem("uid")}`);
        setForm(res.data);
    }

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onPostCode = (address) => {
        setForm({
            ...form,
            address1: address
        })
    }

    const onReset = (e) => {
        e.preventDefault();
        getUser();

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm("수정사항을 저장하시겠습니까?")) {
            await axios.post("/user/update", form);
            alert("수정완료!");
            window.location.href = "/";
        }
    }

    const onOrder = async () => {
        if(window.confirm("주문하시겠습니까?")) {
            const orders = list.filter(s=> s.checked);
            const res = await axios.post("/purchase/insert", {...form, sum:checkedSum, orders});
            alert(res.data);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>주문하기</h1>
            <Table className='text-center justify-content-center align-middle mb-4'>
                <thead>
                    <tr>
                        <th colSpan={2}>상품명</th>
                        <th width="12%">가격</th>
                        <th width="12%">수량</th>
                        <th width="12%">금액</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s => s.checked &&
                        <tr key={s.cid}>
                            <td><img src={`/display?file=${s.image}`} width="50" /></td>
                            <td className='text-start'><div className='ellipsis'>(주문번호 : {s.cid}) [{s.pid}] {s.title}</div></td>
                            <td>{s.fmtprice}원</td>
                            <td>{s.qnt}</td>
                            <td>{s.fmtsum}원</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Alert variant='secondary' className='text-end'>총 주문 금액 : {checkedSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Alert>

            <h1 className='text-center my-5'>주문자 정보</h1>
            <div className='mb-5'>
                <form onReset={onReset} onSubmit={onSubmit}>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>아이디</InputGroup.Text>
                        <Form.Control name='uid' value={uid} readOnly />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>회원명</InputGroup.Text>
                        <Form.Control name='uname' value={uname} onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>전화번호</InputGroup.Text>
                        <Form.Control name='phone' value={phone} onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>주소</InputGroup.Text>
                        <Form.Control name='address1' value={address1} readOnly />
                        <ModalPost onPostCode={onPostCode} />
                    </InputGroup>
                    <Form.Control name='address2' value={address2} placeholder='상세주소' onChange={onChangeForm} />
                </form>
            </div>
            <div className='text-center'>
                <Button className='px-5 me-2' onClick={onOrder}>주문하기</Button>
                <Button className='px-5' variant='secondary'>돌아가기</Button>
            </div>


        </div>
    )
}

export default OrderPage