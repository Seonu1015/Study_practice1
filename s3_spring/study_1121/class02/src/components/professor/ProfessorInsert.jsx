import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, InputGroup, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfessorInsert = () => {
    const [form, setForm] = useState({
        pcode:"P001",
        pname:"이몽룡",
        dept:"전산",
        title:"정교수",
        hiredate:"2023-11-21",
        salary:10000000
    });
    const { pcode, pname, dept, fmtdate, fmtsalary, title, hiredate, salary } = form;

    const navi = useNavigate();

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(window.confirm("새로운 교수를 등록하시겠습니까?")) {
            // 교수 등록 작업
            await axios.post('/pro/insert', form);
            navi(`/pro/list`)
        }
    }

    const getCode = async () => {
        const res = await axios("/pro/code");
        // console.log(res.data);
        setForm({
            ...form,
            pcode: res.data
        })
    }

    useEffect(() => {
        getCode();
    }, [])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>교수등록</h1>
            <Card className='p-3'>
                <form onSubmit={onSubmit}>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>교수번호</InputGroup.Text>
                        <Form.Control value={pcode} name='pcode' readOnly />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>교수이름</InputGroup.Text>
                        <Form.Control value={pname} name='pname' onChange={onChange} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>전공</InputGroup.Text>
                        <Form.Select value={dept} name='dept' onChange={onChange}>
                            <option value="전산">전산공학과</option>
                            <option value="전자">전자공학과</option>
                            <option value="건축">건축공학과</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>직급</InputGroup.Text>
                        <Form.Select value={title} name='title' onChange={onChange}>
                            <option value="정교수">정교수</option>
                            <option value="부교수">부교수</option>
                            <option value="조교수">조교수</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>급여</InputGroup.Text>
                        <Form.Control value={salary} name='salary' onChange={onChange} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>임용일</InputGroup.Text>
                        <Form.Control value={hiredate} type='date' name='hiredate' onChange={onChange} />
                    </InputGroup>
                    <Row className='mt-4'>
                        <Col>
                            <Button className='w-100' type='submit'>저장</Button>
                        </Col>
                        <Col>
                            <Button className='w-100' variant='secondary' type='reset'>취소</Button>
                        </Col>
                    </Row>
                </form>
            </Card>
        </div>
    )
}

export default ProfessorInsert