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
        let data = res.data.list.map(r => r && { ...r, ellipsis: true, view: true, text: r.body });
        setList(data);
        setTotal(res.data.total);
    }

    const onClickLogin = () => {
        sessionStorage.setItem("target", `/shop/info/${pid}`);
        window.location.href = "/login";
    }

    const onClickBody = (cid) => {
        const data = list.map(r => r.cid === cid ? { ...r, ellipsis: !r.ellipsis } : r);
        setList(data);
    }

    const onDelete = async (cid) => {
        if (window.confirm(`${cid}번 리뷰를 삭제하시겠습니까?`)) {
            await axios.post(`/review/delete/${cid}`);
            alert("해당 리뷰가 삭제되었습니다.");
            getList();
        }
    }

    const onClickUpdate = (cid) => {
        const data = list.map(r => r.cid === cid ? { ...r, view: !r.view } : r);
        setList(data);
    }

    const onClickCancle = (cid) => {
        const data = list.map(r => r.cid === cid ? { ...r, view: !r.view, body:r.text } : r);
        setList(data);
    }

    const onChangeBody = (e, cid) => {
        const data = list.map(r => r.cid === cid ? { ...r, body: e.target.value } : r);
        setList(data);
    }

    const onClickSave = async (cid, body, text) => {
        if(body === text) {
            onClickCancle(cid);
        } else {
            if(window.confirm(`${cid}번 리뷰를 수정하시겠습니까?`)) {
                //리뷰수정
                await axios.post("/review/update", {cid, body});
                alert("리뷰가 수정되었습니다.");
                getList();
            }
        }
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
                    <Button className='w-100' onClick={onClickLogin}>로그인</Button>
                </div>
            }
            <div className='my-5'>
                <div>
                    <span>리뷰({total})</span>
                    <hr />
                </div>
                {list.map(review =>
                    <div key={review.cid}>
                        <Row>
                            <Col md={1}>
                                {review.uid}
                            </Col>

                            {review.view ?
                                <>
                                    <Col>
                                        <div className='mb-1'><small>{review.regdate}</small></div>
                                        <div className={review.ellipsis && 'ellipsis2'} style={{ cursor: "pointer" }}
                                            onClick={() => onClickBody(review.cid)}>[{review.cid}] {review.text}</div>
                                    </Col>
                                    {sessionStorage.getItem("uid") === review.uid &&
                                        <Col md={1}>
                                            <div className='mb-2'>
                                                <Button className='w-100' variant='outline-primary' size='sm'
                                                    onClick={() => onClickUpdate(review.cid)}>수정</Button>
                                            </div>
                                            <div>
                                                <Button className='w-100' variant='danger' size='sm'
                                                    onClick={() => onDelete(review.cid)}>삭제</Button>
                                            </div>
                                        </Col>
                                    }
                                </>
                                :
                                <>
                                    <Col>
                                        <div>
                                            <Form.Control value={review.body}
                                                as="textarea" rows={3} placeholder='내용을 입력하세요.' onChange={(e) => onChangeBody(e, review.cid)} />
                                        </div>
                                    </Col>
                                    <Col md={1}>
                                        <div className='mb-2'>
                                            <Button className='w-100' variant='outline-primary' size='sm' onClick={() => onClickSave(review.cid, review.body, review.text)}>등록</Button>
                                        </div>
                                        <div>
                                            <Button className='w-100' variant='secondary' size='sm' onClick={() => onClickCancle(review.cid)}>취소</Button>
                                        </div>
                                    </Col>
                                </>
                            }
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