import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Spinner, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LocalModal from './LocalModal';

const LocalSearch = () => {
    const [locals, setLocals] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigator = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    let page = parseInt(search.get("page"));

    const [query, setQuery] = useState(search.get("query"));
    // let query = search.get("query");

    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);

    // console.log('....................', page);

    const getLocal = async() => {
        const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=5&page=${page}`;
        const config = {
            headers: {
                "Authorization":"KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"
            }
        }
        setLoading(true);
        const res = await axios.get(url, config);
        // console.log(res.data);
        setLocals(res.data.documents);
        setTotal(res.data.meta.pageable_count);
        setEnd(res.data.meta.is_end);
        setLoading(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navigator(`/local?page=1&query=${query}`);
    }

    useEffect(() => {
        getLocal();
    }, [location]);

    return (
        <div className='m-5'>
            <h1 className='text-center mb-5'>지역검색</h1>
            {loading ?
                <div className='text-center m-5'><Spinner animation="border" variant="danger" /><h5>로딩중.....</h5></div>
                :
                <>
                    <Row className='justify-content-end mb-3'>
                        <Col md={4}>
                            <form onSubmit={onSubmit}>
                            <InputGroup>
                                <Form.Control onChange={(e) => setQuery(e.target.value)} value={query}/>
                                <Button type='submit'>검색</Button>
                            </InputGroup>
                            </form>
                        </Col>
                    </Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>매장</th>
                                <th>전화번호</th>
                                <th>주소</th>
                                <th>위치</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locals.map(local =>
                                <tr key={local.id}>
                                    <td>{local.place_name}</td>
                                    <td>{local.phone}</td>
                                    <td>{local.address_name}</td>
                                    <td><LocalModal local={local}/></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className='text-center'>
                        <Button onClick={()=>navigator(`/local?page=${page-1}&query=${query}`)} disabled={page===1}>이전</Button>
                        <span>  {page} / {Math.ceil(total/5)}  </span>
                        <Button onClick={()=>navigator(`/local?page=${page+1}&query=${query}`)} disabled={end}>다음</Button>
                    </div>
                </>
            }
        </div>
    )
}

export default LocalSearch