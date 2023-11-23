import axios from 'axios';
import React, { useState } from 'react'
import { Card, InputGroup, Form, Button,Row, Col } from 'react-bootstrap';

const ProfessorUpdate = ({ data, setEdit }) => {
    const [form, setForm] = useState(data);
    const { pcode, pname, dept, fmtdate, fmtsalary, title, hiredate, salary } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(window.confirm("변경된 정보를 저장하시겠습니까?")) {
            await axios.post('/pro/update', form);
            alert("정보가 변경되었습니다.");
            setEdit(false);
        }
    }

    return (
        <Card className='p-3'>
            <form onSubmit={onSubmit}>
                <InputGroup className='mb-2'>
                    <InputGroup.Text>교수번호</InputGroup.Text>
                    <Form.Control value={pcode} name='pcode' readOnly/>
                </InputGroup>
                <InputGroup className='mb-2'>
                    <InputGroup.Text>교수이름</InputGroup.Text>
                    <Form.Control value={pname} name='pname' onChange={onChange}/>
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
                    <Form.Control value={salary} name='salary' onChange={onChange}/>
                </InputGroup>
                <InputGroup className='mb-2'>
                    <InputGroup.Text>임용일</InputGroup.Text>
                    <Form.Control value={hiredate} type='date' name='hiredate' onChange={onChange}/>
                </InputGroup>
                <Row className='mt-4'>
                    <Col>
                        <Button className='w-100' type='submit'>저장</Button>
                    </Col>
                    <Col>
                        <Button className='w-100' variant='secondary' onClick={() => setEdit(false)}>취소</Button>
                    </Col>
                </Row>
            </form>
        </Card>
    )
}

export default ProfessorUpdate