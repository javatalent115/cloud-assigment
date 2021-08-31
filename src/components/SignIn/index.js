import React from "react";
import { Content, Wrapper } from "../SignInDashboard/SignInDashboard.styles";
import { DashBoardContent, DashBoardWrapper } from "../SignInInject/SingInInject.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignInForm from "../SignInForm";

const SignUp = () => {
    return (
        <>
            <DashBoardWrapper>
                <DashBoardContent>
                    <h3>Sign Up</h3>
                    <div>
                        <div>
                            <Link to="/">Trang chủ</Link>
                        </div>
                        <span>Sign Up</span>
                    </div>
                </DashBoardContent>
            </DashBoardWrapper>
            <SignInForm />
        </>
    );
};

export default SignUp;
