import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Route, Routes } from 'react-router-dom'
import StudentList from './student/StudentList'
import ProfessorList from './professor/ProfessorList'
import ProfessorRead from './professor/ProfessorRead'
import ProfessorInsert from './professor/ProfessorInsert'

const NavPage = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" sticky="top">
                <Container fluid>
                    <Navbar.Brand href="/" className="home">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100%' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">HOME</Nav.Link>
                            <Nav.Link href="/pro/list">교수관리</Nav.Link>
                            <Nav.Link href="/stu/list">학생관리</Nav.Link>
                            <Nav.Link href="/cou/list">강좌관리</Nav.Link>
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
                <Route path='/pro/insert' element={<ProfessorInsert />} />
            </Routes>
        </>
    )
}

export default NavPage