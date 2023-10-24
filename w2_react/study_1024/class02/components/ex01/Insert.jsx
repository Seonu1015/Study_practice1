import React, { useState } from 'react'

const Insert = ({onInsert}) => {
    // const [cnt, setCnt] = useState(5);
    const [form, setform] = useState({
        id: 5, name:"Frank", address:"서울 금천구"
    });

    const {id, name, address} = form;

    const onSubmit = (e) => {
        e.preventDefault();
        if(window.confirm("등록하시겠습니까?")) {
            console.log(form);
            onInsert(form);
            setform({
                id:id+1,
                name:"",
                address:""
            })
        }
    }

    const onChange = (e) => {
        setform({...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <h1>주소등록</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <span>id : {id}</span><br/>
                <input value={name} name="name" onChange={(e) => onChange(e)}/>
                {name}
                <br />
                <input value={address} name="address" onChange={(e) => onChange(e)}/>
                {address}
                <br />
                <button>등록</button>
                <button type='reset'>취소</button>
            </form>
        </div>
    )
}

export default Insert