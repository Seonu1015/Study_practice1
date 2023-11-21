import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import Pagination from 'react-js-pagination';
import '../Pagination.css';

const ProfessorList = () => {
    const [loading, setLoading] = useState(false);

    const navi = useNavigate();
    const location = useLocation();

    const search = new URLSearchParams(location.search);
    const size = 3;
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const query = search.get("query") ? search.get("query") : "";
    const key = search.get("key") ? search.get("key") : "pcode";

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const getList = async () => {
        setLoading(true);
        const res = await axios(`/pro/slist.json?page=${page}&size=${size}&key=${key}&query=${query}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const onClickRow = (pcode) => {
        navi(`/pro/read/${pcode}`);
    }

    useEffect(() => {
        getList();
    }, [location]);

    if (loading) return <div className='my-5 text-center'><Spinner>:)</Spinner></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>교수목록</h1>
            <Row>
                <Col>

                </Col>
                <Col className='text-end'>
                    검색 수 : {total}명
                </Col>
            </Row>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>교수번호</th>
                        <th>교수이름</th>
                        <th>교수학과</th>
                        <th>임용일자</th>
                        <th>교수급여</th>
                        <th>교수직급</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p =>
                        <tr key={p.pcode} onClick={() => onClickRow(p.pcode)} style={{cursor:"pointer"}}>
                            <td>{p.pcode}</td>
                            <td>{p.pname}</td>
                            <td>{p.dept}</td>
                            <td>{p.fmtdate}</td>
                            <td>{p.fmtsalary}</td>
                            <td>{p.title}</td>
                        </tr>)}
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
                    onChange={(page) => { navi(`/pro/list?page=${page}&key=${key}&query=${query}`) }}
                />
            }
        </div>
    )
}

export default ProfessorList