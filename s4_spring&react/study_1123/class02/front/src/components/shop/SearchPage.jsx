import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';

const SearchPage = () => {
    const [list, setList] = useState([]);
    const [query, setQuery] = useState("맥북");
    const [page, setPage] = useState(1);

    const getList = async () => {
        const res = await axios(`/search/list.json?page=${page}&size=5&query=${query}`);
        // console.log(res.data);
        //let data = res.data.items;
        //data = data.map(s=> s && {...s, title:s.title.innerHTML.replace(/\r?\n|\r/g, "")});
        setList(res.data.items);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(query=="") {
            alert("검색어를 입력하세요!");
        } else {
            getList();
        }
    }

    const onSave = async (shop) => {
        if(window.confirm("해당 상품을 등록하시겠습니까?")) {
            await axios.post('/shop/insert', shop);
            alert("상품 등록 완료!");
        }
    }

    useEffect(() => {
        getList();
    }, [page])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품검색</h1>
            <Row className='mb-3'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control onChange={(e) => setQuery(e.target.value)}
                                placeholder='Search' value={query}/>
                            <Button type='submit'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>

            <Table hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이미지</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>제조사</th>
                        <th>상품등록</th>
                    </tr>
                </thead>
                <tbody className='justify-content-center align-middle'>
                    {list.map(s =>
                        <tr key={s.productId}>
                            <td>{s.productId}</td>
                            <td><img src={s.image} width="50" /></td>
                            <td width="40%"><div className='ellipsis'>{s.title}</div></td>
                            <td>{s.lprice}</td>
                            <td>{s.maker}</td>
                            <td><Button size='sm' onClick={() => onSave(s)}>등록</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='text-center'>
                <Button onClick={() => setPage(page-1)} disabled={page===1}>이전</Button>
                <span className='mx-2'>{page}</span>
                <Button onClick={() => setPage(page+1)} disabled={page===10}>다음</Button>
            </div>
        </div>
    )
}

export default SearchPage