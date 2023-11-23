import React from 'react'
import { useState } from 'react'

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
        <div>
            <h1>상품관리</h1>
            <div>
                <form onSubmit={onInsert}>
                    <h4>아이디 : {id}</h4>
                    <input placeholder='상품명' value={name} name="name" onChange={onChange}/>&nbsp;&nbsp;
                    <input placeholder='가격' value={price} name="price" onChange={onChange}/>&nbsp;&nbsp;
                    <button>등록</button>
                </form>
            </div>
            <hr/>
            <table>
            {products.map(p =>
                <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.price}만원</td>
                </tr>    
            )}
            </table>
        </div>
    )
}

export default Product