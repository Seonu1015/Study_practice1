import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col, Card } from 'react-bootstrap'

import Pagination from 'react-js-pagination';
import '../Pagination.css';
import { useNavigate } from 'react-router-dom';

const ReviewPage = ({ pid }) => {
    const [body, setBody] = useState("");
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const size = 3;
    const [page, setPage] = useState(1);

    const navi = useNavigate();

    const onRegister = async () => {
        if (body === "") {
            alert("내용을 작성해주세요.");
        } else {
            const data = { pid, uid: sessionStorage.getItem("uid"), body }
            // console.log(data);
            await axios.post("/review/insert", data);
            alert("리뷰가 등록되었습니다.");
            setBody("");
            getList();
        }
    }

    const getList = async () => {
        const res = await axios(`/review/list.json?pid=${pid}&page=${page}&size=${size}`);
        // console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
    }

    useEffect(() => {
        getList();
    }, [page])

    return (
        <div className='my-5'>
            {sessionStorage.getItem("uid") ?
                <div>
                    <Row>
                        <Col>
                            <Form.Control onChange={(e) => setBody(e.target.value)} value={body}
                                as="textarea" rows={5} placeholder='내용을 입력하세요.' />
                        </Col>
                        <Col md={1}>
                            <Button onClick={onRegister} className='w-100 h-100'>등록</Button>
                        </Col>
                    </Row>
                </div>
                :
                <div>
                    <Button className='w-100'>로그인</Button>
                </div>
            }
            <div className='my-5'>
                <div>
                    <span>리뷰({total})</span>
                    <hr/>
                </div>
                {list.map(review =>
                    <div key={review.cid}>
                        <Row>
                            <Col md={1}>
                                {review.uid}
                            </Col>
                            <Col>
                                <p><small>{review.regdate}</small></p>
                                <div>{review.body}</div>
                            </Col>
                        </Row>
                        <hr />
                    </div>
                )}
            </div>
            {
                total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => setPage(page)}
                />
            }
        </div>
    )
}

export default ReviewPage