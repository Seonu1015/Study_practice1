import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

const ShopUpdate = () => {
    const [form, setForm] = useState("");
    const { pid } = useParams();
    // console.log(pid);

    const getShop = async () => {
        const res = await axios(`/shop/read/${pid}`);
        // console.log(res.data);
        setForm(res.data);
    }

    const { title, lprice, maker, image, fmtdate } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(window.confirm("수정하시겠습니까?")) {
            // console.log(form)
            await axios.post("/shop/update", form);
            alert("수정 완료!");
        }
    }

    useEffect(() => {
        getShop();
    }, [])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품정보수정</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <form className='card p-3' onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>상품번호</InputGroup.Text>
                            <Form.Control value={pid} readOnly />
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>상품명</InputGroup.Text>
                            <Form.Control name="title" value={title} onChange={onChange} />
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>상품가격</InputGroup.Text>
                            <Form.Control name="lprice" value={lprice} onChange={onChange} />
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>제조사</InputGroup.Text>
                            <Form.Control name="maker" value={maker} onChange={onChange} />
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>등록일</InputGroup.Text>
                            <Form.Control value={fmtdate} readOnly />
                        </InputGroup>
                        <Row className='mt-3'>
                            <Col>
                                <Button className='w-100' type='submit'>수정</Button>
                            </Col>
                            <Col>
                                <Button className='w-100' variant='secondary' type='reset'>취소</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </div>
    )
}

export default ShopUpdate