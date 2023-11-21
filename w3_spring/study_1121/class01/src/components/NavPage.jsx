import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Route, Routes } from 'react-router-dom'
import StudentList from './student/StudentList'
import ProfessorList from './professor/ProfessorList'
import ProfessorRead from './professor/ProfessorRead'

const NavPage = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" sticky="top">
                <Container fluid>
                    <NavLink to="/" className="home">LOGO</NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100%' }}
                            navbarScroll
                        >
                            <NavLink href="/">HOME</NavLink>
                            <NavLink to="/pro/list">교수관리</NavLink>
                            <NavLink to="/stu/list">학생관리</NavLink>
                            <NavLink to="/cou/list">강좌관리</NavLink>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path='/stu/list' element={<StudentList />} />
                <Route path='/pro/list' element={<ProfessorList />} />
                <Route path='/pro/read/:pcode' element={<ProfessorRead />} />
            </Routes>
        </>
    )
}

export default NavPage