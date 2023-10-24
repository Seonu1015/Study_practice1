import React, {useState} from 'react';
import '../../App.css';

const Count = () => {
    const [count, setCount] = useState(100);
    return (
        <div className='count'>
            <h1>Count</h1>
            <button className='button'>감소</button>
            <span className='text'> {count} </span>
            <button className='button'>증가</button>
        </div>
    )
}

export default Count