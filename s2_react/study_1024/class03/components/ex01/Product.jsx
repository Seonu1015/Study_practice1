import React from 'react'
import { useState } from 'react'
import { Button, Table, Form, InputGroup } from 'react-bootstrap';

const Product = () => {
    const [products, setProducts] = useState([
        {"id":1, "name":"냉장고", "price":100},
        {"id":2, "name":"세탁기", "price":80},
        {"id":3, "name":"건조기", "price":70},
    ]);

    const [form, setForm] = useState({
       id: 4,
       name: "",
       price: 0
    });

    const {id, name, price} = form;
    //비구절(?) : 아래에 form.id 로 써야하는 걸 id만 입력해도 되게 해준다.

    const onInsert = (e) => {
        e.preventDefault();
        setProducts(products.concat(form));
        alert("저장!");
        setForm({
            id : id+1,
            name:"",
            price: 0
        })
    }

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='p-5'>
            <h1 className='text-center'>상품관리</h1>
            <hr/>
            <div>
                <form onSubmit={onInsert} className='mb-3'>
                    <h4>아이디 : {id}</h4>
                    <InputGroup className='mb-1'>
                        <InputGroup.Text>상품명</InputGroup.Text>
                        <Form.Control placeholder='상품명' value={name} name="name" onChange={onChange}/>
                    </InputGroup>

                    <InputGroup className='mb-1'>
                        <InputGroup.Text>상품명</InputGroup.Text>
                        <Form.Control placeholder='가격' value={price} name="price" onChange={onChange}/>
                    </InputGroup>

                    <Button variant='outline-secondary' className='align-item-end'>등록</Button>
                </form>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>상품명</th>
                        <th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p =>
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}만원</td>
                        </tr>    
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Product