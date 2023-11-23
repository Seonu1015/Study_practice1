import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavPage = () => {
    const navigator = useNavigate();

    return (
        <div>
            <button onClick={() => navigator(-1)}>뒤로가기</button>
            <button onClick={() => navigator('/')}>홈으로 이동</button>
            <button onClick={() => navigator('/profiles')}>프로파일</button>
        </div>
    )
}

export default NavPage