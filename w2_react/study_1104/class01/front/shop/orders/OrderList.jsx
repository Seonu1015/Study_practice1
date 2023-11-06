import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Spinner } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { useLocation, useNavigate } from 'react-router-dom'

const OrderList = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const navi = useNavigate();

    const location = useLocation();
    const search = new URLSearchParams(location.search);

    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const size = 3;

    const getPurchase = async () => {
        setLoading(true);
        const res =
            await axios(`/orders/list/purchase.json?uid=${sessionStorage.getItem("uid")}&page=${page}&size=${size}`);
        // console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const onChangePage = (page) => {
        navi(`/orders/list?page=${page}`);
    }

    useEffect(() => {
        getPurchase();
    }, [location]);

    if (loading) return <div className='text-center my-5'><Spinner>:-D</Spinner></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>주문목록</h1>
            <Table hover>
                <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>주문날짜</th>
                        <th>배송정보</th>
                        <th>주문금액</th>
                        <th>주문상태</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p =>
                        <tr key={p.pid}>
                            <td>{p.pid}</td>
                            <td>{p.fmtdate}</td>
                            <td>
                                <p>주소 : {p.raddress1} {p.raddress2}</p>
                                <p>연락처 : {p.rphone}</p>
                            </td>
                            <td>{p.fmtsum}</td>
                            <td>{p.str_result}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
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

export default OrderList