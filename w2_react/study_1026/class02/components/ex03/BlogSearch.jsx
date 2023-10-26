import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button, InputGroup, Form, Row, Col } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

const BlogSearch = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);
    const [cnt, setCnt] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const search = new URLSearchParams(location.search);
    // console.log(search);
    const page = parseInt(search.get("page"));
    const [query, setQuery] = useState(search.get("query"));
    // console.log(page, query);

    const getBlogs = async () => {
        const url = `https://dapi.kakao.com/v2/search/blog?size=5&page=${page}&query=${query}`;
        const config = {
            headers: {
                "Authorization": "KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"
            }
        }
        setLoading(true);
        const res = await axios(url, config);
        console.log(res.data);
        let data = res.data.documents;
        data = data.map(blog => blog && { ...blog, show: false, checked: false });
        setBlogs(data);
        setEnd(res.data.meta.is_end);
        setTotal(res.data.meta.pageable_count);
        setLoading(false);
    }

    useEffect(() => {
        getBlogs();
    }, [location])

    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/blog?page=1&query=${query}`);
    }

    const onClick = (idx) => {
        let data = blogs.map((blog, index) => index === idx ? { ...blog, show: !blog.show } : blog);
        setBlogs(data);
    }

    useEffect(() => {
        let cnt = 0;
        blogs.forEach(blog => blog.checked && cnt++);
        console.log(cnt);
        setCnt(cnt);
    }, [blogs]);

    const onChangeAll = (e) => {
        let data = blogs.map(blog => blog && {...blog, checked:e.target.checked});
        setBlogs(data);
    }

    const onChangeSingle = (e, url) => {
        let data = blogs.map(blog => blog.url === url ? {...blog, checked:e.target.checked} : blog);
        setBlogs(data);
    }

    return (
        <>
            <div className='m-5'>
                <h1 className='text-center mb-5'>블로그검색</h1>
                {loading ?
                    <div>로딩중....</div>
                    :
                    <>
                        <Row className='mb-3 justify-content-end'>
                            <Col md={4}>
                                <form onSubmit={onSubmit}>
                                    <InputGroup>
                                        <Form.Control value={query} onChange={(e) => setQuery(e.target.value)} />
                                        <Button type='submit'>검색</Button>
                                    </InputGroup>
                                </form>
                            </Col>
                        </Row>
                        <Table>
                            <thead>
                                <tr>
                                    <th><input checked={cnt == blogs.length} onChange={onChangeAll} type='checkbox' /></th>
                                    <th>BLOG</th>
                                    <th>TITLE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog, index) =>
                                    <tr key={blog.url}>
                                        <td width="5%">
                                            <input onChange={(e) => onChangeSingle(e, blog.url)} type='checkbox' checked={blog.checked}/>
                                        </td>
                                        <td width="30%"><a href={blog.url}>{blog.blogname}</a></td>
                                        <td>
                                            <div onClick={() => onClick(index)} dangerouslySetInnerHTML={{ __html: blog.title }}
                                                style={{ cursor: "pointer", color: "brown" }} />
                                            {blog.show &&
                                                <div dangerouslySetInnerHTML={{ __html: blog.contents }} />
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <div className='text-center'>
                            <Button onClick={() => navigate(`/blog?page=${page - 1}&query=${query}`)} disabled={page === 1}>이전</Button>
                            <span> {page} / {Math.ceil(total / 5)} </span>
                            <Button onClick={() => navigate(`/blog?page=${page + 1}&query=${query}`)} disabled={end}>다음</Button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default BlogSearch