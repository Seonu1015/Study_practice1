import React from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const HeaderPage = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <NavLink to="/" className="home">LOGO</NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/books/search">도서검색</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink to="/users/login">로그인</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderPage