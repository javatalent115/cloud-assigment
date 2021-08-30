import React from "react";
import SignInDashboard from "../SignInDashboard";
import { Content, Wrapper } from "./SingInInject.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forms from "../Form";

const SignInInject = () => {
    return (
        <div>
            <Wrapper>
                <Content>
                    <h3>Đăng ký tiêm cá nhân</h3>
                    <div>
                        <div>
                            <Link to="/">Trang chủ</Link>
                        </div>
                        <span>Đăng ký tiêm</span>
                    </div>
                </Content>
            </Wrapper>
            <SignInDashboard />
            <Forms />
        </div>
    );
};

export default SignInInject;
