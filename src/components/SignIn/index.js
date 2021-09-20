import React from "react";
import { Content, Wrapper } from "../SignUpDashboard/SignInDashboard.styles";
import { DashBoardContent, DashBoardWrapper } from "../SignUp/SignUp.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignInForm from "../SignInForm";

const SignIn = ({ handleSignIn, setAvatar, handleAvatar }) => {
    return (
        <>
            <DashBoardWrapper>
                <DashBoardContent>
                    <h3>Sign Up</h3>
                    <div>
                        <div>
                            <Link to="/">Home</Link>
                        </div>
                        <span>Sign Up</span>
                    </div>
                </DashBoardContent>
            </DashBoardWrapper>
            <SignInForm
                handleSignIn={handleSignIn}
                setAvatar={setAvatar}
                handleAvatar={handleAvatar}
            />
        </>
    );
};

export default SignIn;
