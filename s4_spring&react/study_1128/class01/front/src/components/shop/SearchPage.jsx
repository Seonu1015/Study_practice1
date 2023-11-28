import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Spinner, Table } from 'react-bootstrap';

const SearchPage = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [query, setQuery] = useState("키보드");
    const [page, setPage] = useState(1);
    const [cnt, setCnt] = useState(0);

    const getList = async () => {
        setLoading(true);
        const res = await axios(`/search/list.json?page=${page}&size=5&query=${query}`);
        // console.log(res.data);
        let data = res.data.items.map(s => s && { ...s, title: stripHtmlTags(s.title) });
        data = data.map(s => s && { ...s, checked: false });
        setList(data);
        setLoading(false);
    }

    // HTML 태그를 제거하는 함수
    const stripHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (query == "") {
            alert("검색어를 입력하세요!");
        } else {
            getList();
        }
    }

    const onSave = async (shop) => {
        if (window.confirm("해당 상품을 등록하시겠습니까?")) {
            await axios.post('/shop/insert', shop);
            alert("상품 등록 완료!");
        }
    }

    const onCheckedSave = async () => {
        if(cnt == 0) {
            alert("저장할 상품을 선택해주세요");
        } else {
            if(window.confirm(`${cnt}개 상품을 등록하시겠습니까?`)) {
                setLoading(true);
                for(const item of list) {
                    if(item.checked) {
                        // console.log(item.productId);
                        await axios.post("/shop/insert", item);
                    }
                }
                setLoading(false);
                alert("상품이 등록되었습니다.");
                getList();
            }
        }
    }

    const onChangeAll = (e) => {
        //console.log(e.target.checked);
        const data = list.map(item => item && { ...item, checked: e.target.checked });
        setList(data);
    }

    const onChangeSingle = (e, productId) => {
        const data = list.map(item => item.productId === productId ? {...item, checked:e.target.checked} : item);
        setList(data);
    }

    useEffect(() => {
        getList();
    }, [page]);

    useEffect(() => {
        let chk=0;
        list.forEach(item => {
            if(item.checked) chk++;
        });
        // console.log(chk);
        setCnt(chk);
    }, [list]);

    if (loading) return <div className='text-center my-5'><Spinner>:)</Spinner></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품검색</h1>
            <Row className='mb-3'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control onChange={(e) => setQuery(e.target.value)}
                                placeholder='Search' value={query} />
                            <Button type='submit'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='text-end me-3'>
                    <Button onClick={onCheckedSave}>선택저장</Button>
                </Col>
            </Row>

            <Table hover>
                <thead>
                    <tr className='text-center'>
                        <th><input type='checkbox' onChange={onChangeAll} checked={list.length === cnt}/></th>
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
                        <tr key={s.productId} className='text-center'>
                            <td><input type='checkbox' checked={s.checked} onChange={(e) => onChangeSingle(e, s.productId)}/></td>
                            <td>{s.productId}</td>
                            <td><img src={s.image} width="50" /></td>
                            <td width="40%"><div className='ellipsis text-start'>{s.title}</div></td>
                            <td>{s.lprice}원</td>
                            <td>{s.maker}</td>
                            <td ><Button size='sm' onClick={() => onSave(s)}>등록</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='text-center'>
                <Button onClick={() => setPage(1)} disabled={page === 1} className='mx-1'>처음으로</Button>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1} className='mx-1'>이전</Button>
                <span className='mx-2'>{page}</span>
                <Button onClick={() => setPage(page + 1)} disabled={page === 10} className='mx-1'>다음</Button>
                <Button onClick={() => setPage(10)} disabled={page === 10} className='mx-1'>끝으로</Button>
            </div>
        </div>
    )
}

export default SearchPage