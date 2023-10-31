import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const [loading, setLoading] = useState(false);
    const ref_file = useRef(null);

    const [user, setUser] = useState({
        uid: '',
        upass: '',
        uname: '',
        phone: '',
        address1: '',
        address2: '',
        fmtdate: '',
        fmtmodi: '',
        photo: '',
        file: null
    });

    const { uid, upass, uname, phone, address1, address2, fmtdate, fmtmodi, photo, file } = user; // 비구조할당

    const getUser = async () => {
        setLoading(true);
        const res = await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        setUser(res.data);
        setLoading(false);
    }
    
    const onChangeFile = (e) => {
        setUser({
            ...user,
            photo: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        });
    }

    const onUpdatePhoto = async () => {
        if(!file) {
            alert("수정할 이미지가 없습니다.");
        } else {
            if(window.confirm("이미지를 수정하시겠습니까?")) {
                // 사진 저장 - 업로드할 때는 form data를 사용해서 넘겨줘야 한다.
                const formData = new FormData();
                formData.append("file", file);
                formData.append("uid", uid);
                await axios.post('/users/update/photo', formData);
                alert("이미지가 변경되었습니다.");
            }
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const navi = useNavigate();

    if (loading) return <div className='text-center my-5'><Spinner /></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>마이페이지</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Card className='p-3'>
                        <Row>
                            <Col md={3}>
                                <div className='mt-1'>
                                    <img src={photo || "http://via.placeholder.com/200x200"} onClick={()=>ref_file.current.click()} width="100%" className='photo' />
                                    <input type="file" ref={ref_file} onChange={onChangeFile} style={{display: "none"}} />
                                </div>
                                <Button size='sm mt-2 w-100' onClick={onUpdatePhoto}>이미지 수정</Button>
                            </Col>
                            <Col className='px-3'>
                                <h3>이름 : {uname}
                                    <span className='text-end ps-3'>
                                        <Button onClick={() => navi('/users/update')} size='sm'>정보수정</Button>
                                    </span>
                                </h3>
                                <hr />
                                <div>전화 : {phone}</div>
                                <div>주소 : {address1} {address2}</div>
                                <div>가입일 : {fmtdate}</div>
                                <div>수정일 : {fmtmodi}</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyPage