import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProfessorRead = () => {
    const params = useParams();
    // console.log(params);
    const pcode = params.pcode;

    const [data, setData] = useState('');

    const getProfessor = async () => {
        const res = await axios("/pro/read.json?pcode=" + pcode);
        // console.log(res.data);
        setData(res.data);
    }

    useEffect(() => {
        getProfessor();
    }, [])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>교수정보</h1>
        </div>
    )
}

export default ProfessorRead