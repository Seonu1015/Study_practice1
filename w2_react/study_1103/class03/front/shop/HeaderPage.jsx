import React, { useContext } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { BoxContext } from './BoxContext';

const HeaderPage = () => {
    const navi = useNavigate();
    const {box, setBox} = useContext(BoxContext);
    
    const onLogout = (e) => {
        e.preventDefault();
        // if(window.confirm("로그아웃하실래요?")) {
        //     sessionStorage.clear();
        //     navi('/');
        // }
        setBox({
            show:true,
            message: "로그아웃하실래요?",
            action: ()=> {
                sessionStorage.clear();
                navi('/');
            }
        });
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <NavLink to="/" className="home">LOGO</NavLink>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll autoclose">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/books/search">도서검색</NavLink>
                        <NavLink to="/books/list">도서목록</NavLink>
                    </Nav>
                    <Nav>
                        {sessionStorage.getItem("uid") ?
                        <>
                            <NavLink to="/users/mypage">{sessionStorage.getItem("uid")}</NavLink>
                            <NavLink to="/orders/cart">장바구니</NavLink>
                            <NavLink to="/users/login" onClick={onLogout}>로그아웃</NavLink>
                        </>
                            :
                            <NavLink to="/users/login">로그인</NavLink>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderPage