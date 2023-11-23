import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import ProfessorUpdate from './ProfessorUpdate';

const ProfessorRead = () => {
    const params = useParams();
    // console.log(params);
    const pcode = params.pcode;

    const [data, setData] = useState('');
    const [edit, setEdit] = useState(false);

    const getProfessor = async () => {
        const res = await axios("/pro/read.json?pcode=" + pcode);
        // console.log(res.data);
        setData(res.data);
    }

    const { pname, dept, fmtdate, fmtsalary, title } = data;

    useEffect(() => {
        getProfessor();
    }, [edit])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>교수정보</h1>
            <Row className='text-center justify-content-center'>
                <Col md={6}>
                    {edit ?
                        <ProfessorUpdate data={data} setEdit={setEdit}/>
                        :
                        <Card>
                            <CardHeader className='pt-4'>
                                <h3>이름 : {pname} ({pcode})</h3>
                            </CardHeader>
                            <CardBody>
                                <div>전공 : {dept} ({title})</div><hr />
                                <div>임용일 : {fmtdate}</div><hr />
                                <div>급여 : {fmtsalary}</div><hr />
                                <Button onClick={() => setEdit(true)} className='px-5' size='sm'>정보수정</Button>
                            </CardBody>
                        </Card>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default ProfessorRead