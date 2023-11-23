import React, { useState } from 'react'
import Insert from './Insert';

const Address = () => {
    const [array, setArray] = useState([
        {"id": 1, "name":"Adam", "address":"서울 노원구"},
        {"id": 2, "name":"Bobby", "address":"서울 용산구"},
        {"id": 3, "name":"Chris", "address":"서울 동대문구"},
        {"id": 4, "name":"Danny", "address":"서울 구로구"},
    ]);

    const onInsert = (form) => {
        setArray(array.concat(form))
        alert("주소 추가!")
    }

    return (
        <div>
            <Insert onInsert={onInsert}/>
            <hr/>
            <h1>주소목록</h1>
            {array.map(person =>
                <h3 key={person.id}>{person.id} : {person.name} : {person.address}</h3>
            )}
            
        </div>
    )
}

export default Address