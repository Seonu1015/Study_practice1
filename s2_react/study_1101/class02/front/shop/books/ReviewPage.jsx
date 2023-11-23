import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import '../Pagination.css';

const ReviewPage = ({ location, setBook, book }) => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const size = 5;
    const [total, setTotal] = useState(0);
    const [contents, setContents] = useState("");

    const { bid } = useParams();
    // console.log('...................', bid);

    const onClickWrite = () => {
        sessionStorage.setItem("target", location.pathname);
        window.location.href = "/users/login";
    }

    const getReviews = async () => {
        const url = `/review/list.json?page=${page}&size=${size}&bid=${bid}`;
        const res = await axios(url);
        // console.log(res.data);
        let list = res.data.list;
        list = list.map(r => r && { ...r, ellipsis: true, edit: false, text: r.contents });
        setReviews(list);
        setTotal(res.data.total);
        setBook({ ...book, rcnt: res.data.total });
    }

    const onChangePage = (page) => {
        setPage(page);
    }

    const onChangeEllipsis = (rid) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, ellipsis: !r.ellipsis } : r);
        setReviews(list);
    }

    const onClickRegister = async () => {
        if (contents === "") {
            alert("리뷰 내용을 입력해주세요!");
        } else {
            const res = await axios.post('/review/insert', {
                uid: sessionStorage.getItem("uid"),
                bid,
                contents
            });
            if (res.data === 1) {
                getReviews();
                setContents("");
            }
        }
    }

    const onClickDelete = async (rid) => {
        if (window.confirm(`${rid}번 리뷰를 삭제하시겠습니까?`)) {
            const res = await axios.post('/review/delete', { rid });
            if (res.data === 1) {
                getReviews();
            }
        }
    }

    const onClickUpdate = (rid) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, edit: true } : r);
        setReviews(list);
    }

    const onClickCancle = (rid) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, edit: false, text: r.contents } : r);
        setReviews(list);
    }

    const onChange = (e, rid) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, text: e.target.value } : r);
        setReviews(list);
    }

    const onClickSave = async (rid, text, contents) => {
        if (text === contents) return;
        if (window.confirm("수정된 내용을 저장하시겠습니까?")) {
            const res = await axios.post("/review/update", { rid, contents: text });
            if (res.data === 1) {
                getReviews();
            }
        }
    }

    useEffect(() => {
        getReviews();
    }, [page]);

    return (
        <div>
            {!sessionStorage.getItem("uid") ?
                <div>
                    <Button className='w-100' variant='secondary' onClick={onClickWrite}>리뷰작성</Button>
                </div>
                :
                <div>
                    <Form.Control as="textarea" rows={5} placeholder='내용을 입력해주세요.'
                        onChange={(e) => setContents(e.target.value)} value={contents} />
                    <div className='text-end mt-2'>
                        <Button type="submit" className='px-5' onClick={onClickRegister}>등록</Button>
                    </div>
                </div>
            }
            {reviews.map(review =>
                <div>
                    <Row key={review.rid} className='mt-5'>
                        <Col xs={2} lg={1} className='align-self-center'>
                            <img className='photo' src={review.photo || "http://via.placeholder.com/56x62"} width="100%" />
                            <div className='text-center'>{review.uname}</div>
                        </Col>
                        <Col>
                            <div className='small'>{review.fmtdate}</div>
                            {!review.edit ?
                                <>
                                    <div className={review.ellipsis && 'ellipsis2'}
                                        onClick={() => onChangeEllipsis(review.rid)} style={{ cursor: "pointer" }}>
                                        [{review.rid}] {review.contents}
                                    </div>
                                    {review.uid === sessionStorage.getItem("uid") &&
                                        <div className='text-end mt-2'>
                                            <Button variant='danger' size='sm me-2' onClick={() => onClickDelete(review.rid)}>삭제</Button>
                                            <Button variant='primary' size='sm' onClick={() => onClickUpdate(review.rid)}>수정</Button>
                                        </div>
                                    }
                                </>
                                :
                                <>
                                    <Form.Control onChange={(e) => onChange(e, review.rid)} value={review.text} rows={5} as="textarea" />
                                    <div className='text-end mt-2'>
                                        <Button variant='primary' size='sm me-2' onClick={() => onClickSave(review.rid, review.text, review.contents)}>저장</Button>
                                        <Button variant='secondary' size='sm' onClick={() => onClickCancle(review.rid)}>취소</Button>
                                    </div>
                                </>
                            }
                        </Col>
                    </Row>
                </div>
            )}
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage} />
            }
        </div>
    )
}

export default ReviewPage