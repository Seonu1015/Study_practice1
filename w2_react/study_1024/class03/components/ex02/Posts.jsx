import React, { useEffect, useState } from 'react'
import {Table, Button, Spinner} from 'react-bootstrap'

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const getPosts = () => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                const start = (page-1) * 10 +1;
                const end = page*10
                const newJson = json.filter(j => j.id>=start && j.id <=end);
                console.log(newJson);
                setPosts(newJson);
                setLoading(false);
            })
    }

    useEffect(() => {
        getPosts();
    }, [page]);

    if(loading)
        return (
            <div className='text-center my-5'>
                <Spinner animation="border" variant="danger" />
            </div>
        )

    return (
        <div className='m-5'>
            <h1 className='text-center mb-5'>Post</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Contents</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post =>
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='text-center'>
                <Button onClick={() => setPage(page-1)} disabled={page===1}>이전</Button>
                <span className='mx-3'>{page}/10</span>
                <Button onClick={() => setPage(page+1)} disabled={page===10}>다음</Button>
            </div>
        </div>
    )
}

export default Posts