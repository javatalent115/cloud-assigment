import React from "react";
import { Wrapper, LeftNavItem, RightNavItem, RightNav, Content } from "./Navbar.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
const Navbar = ({ account, handleSignOut, avatar }) => {
    let item;

    const abc = () => {
        handleSignOut();
        window.location.href = "/";
    };
    console.log(account);
    let image;
    if (localStorage.getItem("avatar") == "null") {
        image = (
            <img
                src="https://static.thenounproject.com/png/3070444-200.png"
                className="image"
                alt=""
            ></img>
        );
    } else {
        image = <img src={localStorage.getItem("avatar")} className="image" alt=""></img>;
    }
    if (account) {
        item = (
            <>
                <Link to="/home">
                    <RightNavItem>Trang chủ</RightNavItem>
                </Link>

                <Link to="/information">
                    <RightNavItem>Tra cứu</RightNavItem>
                </Link>
                <Link to="/validationPage">
                    <RightNavItem>Validation</RightNavItem>
                </Link>
                <div className="account">
                    {image}
                    <DropdownButton align="end" id="dropdown-menu-align-end" title="">
                        <li>
                            <RightNavItem onClick={abc}>Đăng xuất</RightNavItem>
                        </li>
                    </DropdownButton>
                </div>
            </>
        );
    } else {
        item = (
            <>
                <Link to="/home">
                    <RightNavItem>Trang chủ</RightNavItem>
                </Link>
                <Link to="/signUp">
                    <RightNavItem>Đăng ký tiêm</RightNavItem>
                </Link>
                <Link to="/signIn">
                    <RightNavItem>Đăng nhập</RightNavItem>
                </Link>
            </>
        );
    }

    return (
        <Wrapper>
            <Content>
                <LeftNavItem content="Cổng thông tin tiêm chủng COVID-19">
                    <img src="https://tiemchungcovid19.gov.vn/assets/portal/img/u7.png"></img>
                </LeftNavItem>
                <RightNav>{item}</RightNav>
            </Content>
        </Wrapper>
    );
};
export default Navbar;
