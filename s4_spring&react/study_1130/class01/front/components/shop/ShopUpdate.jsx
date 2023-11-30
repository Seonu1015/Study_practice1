import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row, Tab, Tabs } from 'react-bootstrap';
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
    const ref_file = useRef(null);
    const [src, setSrc] = useState('http://via.placeholder.com/500x500');
    const [file, setFile] = useState(null);

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm("수정하시겠습니까?")) {
            // console.log(form)
            await axios.post("/shop/update", form);
            alert("수정 완료!");
        }
    }

    const onChangeFile = (e) => {
        setSrc(URL.createObjectURL(e.target.files[0])); // 파일 이름만 변경
        setFile(e.target.files[0]); // 실제 파일이 바이너리로 저장
    }

    const onSaveImage = async () => {
        if(!file) {
            alert("변경할 이미지가 없습니다.");
        } else {
            if(window.confirm("이미지를 수정하시겠습니까?")) {
                // 이미지 저장
                const formData = new FormData();
                formData.append("file", file);
                formData.append("pid", pid);
                await axios(`/deleteFile?file=${image}`);
                await axios.post("/shop/image", formData);
                alert("이미지 수정 완료!");
                getShop();
                setSrc('http://via.placeholder.com/500x500');
                setFile(null);
            }
        }
    }

    useEffect(() => {
        getShop();
    }, [])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품정보수정</h1>

            <Tabs
                defaultActiveKey="update"
                id="fill-tab-example"
                className="mb-5"
                fill
            >
                <Tab eventKey="update" title="정보수정">
                    <Row className='justify-content-center'>
                        <Col>
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
                </Tab>
                <Tab eventKey="image" title="이미지수정">
                    <Row>
                        <Col md={6}>
                            <div className='card p-3'>
                                <div className='text-center mb-3'>수정 전 이미지</div>
                                <img src={`/display?file=${image}`} width="100%" height="500"/>
                            </div>
                        </Col>
                        <Col>
                            <div className='card p-3'>
                                <div className='text-center mb-3'>수정 후 이미지</div>
                                <img src={src} width="100%" onClick={() => ref_file.current.click()} style={{cursor:"pointer"}} height="500"/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input ref={ref_file} type='file' onChange={onChangeFile} style={{display:"none"}}/>
                            <Button className='my-5 w-100' onClick={onSaveImage}>이미지 저장</Button>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </div>
    )
}

export default ShopUpdate