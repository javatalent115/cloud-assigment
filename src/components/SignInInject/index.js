import React from "react";
import SignInDashboard from "../SignInDashboard";
import { DashBoardContent, DashBoardWrapper } from "./SingInInject.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forms from "../Form";
import "./custom.css";
const SignInInject = ({ handleSignIn }) => {
    return (
        <div className="a">
            <DashBoardWrapper>
                <DashBoardContent>
                    <h3>Đăng ký tiêm cá nhân</h3>
                    <div>
                        <div>
                            <Link to="/">Trang chủ</Link>
                        </div>
                        <span>Đăng ký tiêm</span>
                    </div>
                </DashBoardContent>
            </DashBoardWrapper>
            <SignInDashboard />
            <Forms handleSignIn={handleSignIn}></Forms>
        </div>
    );
};

export default SignInInject;
