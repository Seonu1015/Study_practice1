import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ReviewPage = ({location}) => {    
    const [page, setPage] = useState(1);
    const size = 3;

    const {bid} = useParams();
    console.log('...................', bid);

    const onClickWrite = () => {
        sessionStorage.setItem("target", location.pathname);
        window.location.href = "/users/login";
    }

    const getReviews = async () => {
        const url = `/review/list.json?page=${page}&size=${size}&bid=${bid}`;
        const res = await axios(url);
        console.log(res.data);
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
                    <Form.Control as="textarea" rows={5} placeholder='내용을 입력해주세요.' />
                    <div className='text-end mt-2'>
                        <Button>등록</Button>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default ReviewPage