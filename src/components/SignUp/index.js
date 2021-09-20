import React from "react";
import SignUpDashboard from "../SignUpDashboard";
import { DashBoardContent, DashBoardWrapper } from "./SignUp.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forms from "../Form";
import "./custom.css";
const SignUp = ({ handleSignUp }) => {
    return (
        <div className="a">
            <DashBoardWrapper>
                <DashBoardContent>
                    <h3>Personal Registration</h3>
                    <div>
                        <div>
                            <Link to="/">Home</Link>
                        </div>
                        <span>Registration</span>
                    </div>
                </DashBoardContent>
            </DashBoardWrapper>
            <SignUpDashboard />
            <Forms handleSignUp={handleSignUp}></Forms>
        </div>
    );
};

export default SignUp;
