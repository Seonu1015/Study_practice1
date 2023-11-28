import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

import Pagination from 'react-js-pagination';
import '../Pagination.css';

const CartList = () => {
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const size = 3;
    const [page, setPage] = useState(1);
    const uid = sessionStorage.getItem("uid");

    const getList = async () => {
        const res = await axios(`/cart/list.json?page=${page}&size=${size}&uid=${uid}`);
        // console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
    }

    useEffect(() => {
        getList();
    }, [page])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>장바구니</h1>
            <Table className='text-center justify-content-center align-middle'>
                <thead>
                    <tr>
                        <th colSpan={2}>상품명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>금액</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(c => 
                        <tr key={c.cid}>
                            <td><img src={`/display?file=${c.image}`} width="50" /></td>
                            <td className='text-start'>{c.title}</td>
                            <td>{c.fmtprice}원</td>
                            <td>{c.qnt}</td>
                            <td>{(c.lprice * c.qnt).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                        </tr>    
                    )}
                </tbody>
            </Table>
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

export default CartList