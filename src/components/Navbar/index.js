import React from "react";
import { Wrapper, LeftNavItem, RightNavItem, RightNav, Content } from "./Navbar.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navbar = ({ account, handleSignOut }) => {
    let item;

    const abc = () => {
        handleSignOut();
        window.location.href = "/";
    };
    console.log(account);
    if (account) {
        item = (
            <>
                <Link to="/home">
                    <RightNavItem>Trang chủ</RightNavItem>
                </Link>

                <Link to="/information">
                    <RightNavItem>Tra cứu</RightNavItem>
                </Link>
                <li>
                    <RightNavItem onClick={abc}>Đăng xuất</RightNavItem>
                </li>
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
