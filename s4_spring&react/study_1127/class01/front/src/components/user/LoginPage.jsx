import axios from 'axios';
import React, { useState } from 'react'
import { Form, Card, Row, Col, Button, InputGroup } from 'react-bootstrap';

import {setCookie} from '../../common.js';

const LoginPage = () => {
    const [checked, setChecked] = useState(false);
    const [form, setForm] = useState({
        uid: "",
        upass: ""
    });
    const { uid, upass } = form

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/user/login", form);
        if (res.data == 0) {
            alert("아이디가 존재하지 않습니다.");
        } else if (res.data == 2) {
            alert("비밀번호가 일치하지 않습니다.");
        } else {
            if (checked) {
                setCookie("uid", uid, 7); // 쿠키에 일주일 보관
            }
            sessionStorage.setItem("uid", uid);
            alert("로그인 성공!")
            if(sessionStorage.getItem("target")) {
                window.location.href = sessionStorage.getItem("target");
            } else {
                window.location.href = "/";
            }
        }
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>로그인</h1>
            <Row className='justify-content-center'>
                <Col md={5}>
                    <Card className='p-3'>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>아이디</InputGroup.Text>
                                <Form.Control name="uid" value={uid} onChange={onChange} />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>비밀번호</InputGroup.Text>
                                <Form.Control name='upass' value={upass} type='password' onChange={onChange} />
                            </InputGroup>
                            <Button className='w-100 mt-2' type='submit'>로그인</Button>
                            {/* <Button className='w-100' variant='secondary'>회원가입</Button> */}
                        </form>
                        <div className='mt-2'>
                            <input type='checkbox' checked={checked} onChange={(e) => setChecked(e.target.checked)}/> <span>로그인 상태 유지</span>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage