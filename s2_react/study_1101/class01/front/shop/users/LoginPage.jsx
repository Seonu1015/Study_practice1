import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Row, Col, InputGroup, Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const ref_uid = useRef(null); // 해당 form으로 위치를 이동하게끔
    const navi = useNavigate();

    const [form, setForm] = useState({
        uid: 'red',
        upass: 'pass'
    });

    const {uid, upass} = form; // 오브젝스 변수를 각각 오브젝트에 할당했기 때문에 form.uid form.upass 로 쓰지 않고 uid, upass로 입력하면 된다.

    const onChange = (e) => {
        setForm ({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(uid ==="") {
            alert("아이디를 입력하세요!");
            ref_uid.current.focus();
        } else if(upass === "") {
            alert("비밀번호를 입력하세요!");
        } else {
            const res = await axios.post("/users/login", form);
            console.log(res);
            if (res.data === 0) {
                alert("아이디가 존재하지 않습니다.");
                ref_uid.current.focus();
            } else if (res.data === 2) {
                alert("비밀번호가 일치하지 않습니다.")
            } else {
                if(sessionStorage.getItem("target")) {
                    sessionStorage.setItem("uid", uid);
                    navi(sessionStorage.getItem("target"));
                } else {
                    sessionStorage.setItem("uid", uid);
                    navi('/');
                }
            }
        }
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>로그인</h1>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className='p-3'>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>아이디</InputGroup.Text>
                                <Form.Control onChange={onChange} name='uid' value={uid} ref={ref_uid}/>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>비밀번호</InputGroup.Text>
                                <Form.Control onChange={onChange} name='upass' type='password' value={upass}/>
                            </InputGroup>
                            <Button type="submit" className='w-100'>로그인</Button>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage