import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const OrderPage = ({ books }) => {


    return (
        <>
            <div className='my-5'>
                <h1 className='text-center mb-5'>주문하기</h1>
                <Table className='text-center align-middle'>
                    <thead>
                        <tr>
                            <th colSpan={2}>제목</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>합계</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => book.checked &&
                            <tr key={book.cid}>
                                <td><img src={book.image || "http://via.placeholder.com/100x100"} width={30} /></td>
                                <td className='text-start'>{book.title}</td>
                                <td>{book.fmtprice}원</td>
                                <td>{book.qnt}권</td>
                                <td>{book.fmtsum}원</td>
                            </tr>

                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default OrderPage