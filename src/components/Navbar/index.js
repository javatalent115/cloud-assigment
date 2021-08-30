import React from "react";
import { Wrapper, LeftNavItem, RightNavItem, RightNav, Content } from "./Navbar.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Wrapper>
            <Content>
                <LeftNavItem content="Cổng thông tin tiêm chủng COVID-19">
                    <img src="https://tiemchungcovid19.gov.vn/assets/portal/img/u7.png"></img>
                </LeftNavItem>
                <RightNav>
                    <Link to="/">
                        <RightNavItem>Trang chủ</RightNavItem>
                    </Link>
                    <Link to="/signInInject">
                        <RightNavItem>Đăng ký tiêm</RightNavItem>
                    </Link>
                    <Link to="/">
                        <RightNavItem>Tra cứu</RightNavItem>
                    </Link>
                    <Link to="/">
                        <RightNavItem>Tài liệu</RightNavItem>
                    </Link>
                    <Link to="/">
                        <RightNavItem>Đăng nhập</RightNavItem>
                    </Link>
                    <RightNavItem></RightNavItem>
                </RightNav>
            </Content>
        </Wrapper>
    );
};
export default Navbar;
