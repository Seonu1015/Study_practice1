import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const OrderComplete = () => {
    const { oid } = useParams();
    return (
        <div className='my-5 text-center'>
            <h1 className='mb-5'>주문완료</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Card className='p-3'>
                        <h3>주문번호 : {oid}</h3>

                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderComplete