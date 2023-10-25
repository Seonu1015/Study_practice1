import React from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Posts from '../ex01/Posts'
import Profiles from './Profiles'
import NavPage from './NavPage'

const RouterPage = () => {
    return (
        <div>
            <ul>
                <li><NavLink to="/">HOME</NavLink></li>
                <li><NavLink to="/about?detail=true&query=노트북&page=1">ABOUT</NavLink></li>
                <li><NavLink to="/info">INFO</NavLink></li>
                <li><NavLink to="/posts">POST</NavLink></li>
                <li><NavLink to="/profiles">PROFILES</NavLink></li>
                <li><NavLink to="/navpage">네비게이트</NavLink></li>
            </ul>
            <hr />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/info' element={<About />} />
                <Route path='/posts' element={<Posts />} />
                <Route path='/profiles/*' element={<Profiles />} />
                <Route path='/navpage' element={<NavPage />} />
            </Routes>
        </div>
    )
}

export default RouterPage