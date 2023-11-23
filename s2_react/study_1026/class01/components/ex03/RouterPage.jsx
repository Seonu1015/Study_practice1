import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import BookSearch from './BookSearch'
import LocalSearch from './LocalSearch'
import BlogSearch from './BlogSearch'

const RouterPage = () => {
    return (
        <div>
            <div className='mx-5'>
                <NavLink to="/book" className="me-3">도서검색</NavLink>
                <NavLink to="/local?page=1&query=카카오프렌즈" className="me-3">지역검색</NavLink>
                <NavLink to="/blog?page=1&query=커피">블로그검색</NavLink>
                <hr />
            </div>
            <Routes>
                <Route path="/book" element={<BookSearch />} />
                <Route path="/local" element={<LocalSearch />} />
                <Route path="/blog" element={<BlogSearch />} />
            </Routes>
        </div>
    )
}

export default RouterPage