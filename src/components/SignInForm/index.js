import React from "react";
import { Content, Wrapper } from "./SignInForm.styles";
import { Form, Button } from "react-bootstrap";
import "./SignInForm-custom.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./custom.css";
const SignInForm = ({ handleSignIn, setAvatar, handleAvatar }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inValidMessage, setInvalidMessage] = useState("");
    const handleSubmit = () => {
        if (email.length > 0 && password.length > 0) {
            const information = {
                email: email,
                password: password,
            };
            const headers = {
                headers: { "Content-type": "application/json" },
            };
            axios.post("http://localhost:3000/validateAccount", information, headers).then(
                (response) => {
                    if (response.data.email.length > 0) {
                        localStorage.setItem("roles", response.data.role);
                        localStorage.setItem("email", response.data.email);
                        localStorage.setItem("avatar", response.data.avatar);
                        // setAvatar(response.data.avatar);
                        // handleAvatar(response.data.avatar);
                        handleSignIn();
                        window.location.href = "/home";
                    } else {
                        setInvalidMessage("Wrong username or password!!");
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        if (email.length === 0 && password.length === 0) {
            alert("You need to place your email and password!!");
        } else if (password.length === 0) {
            alert("You need to place your password");
        } else if (email.length === 0) {
            alert("You need to place your email");
        }
    };

    const handleKeypress = (e) => {
        if (e.key === "Enter") {
            console.log("ehlo");
            handleSubmit();
        }
    };

    return (
        <Wrapper>
            <Content>
                <Form>
                    <nav>
                        <img src="https://tiemchungcovid19.gov.vn/assets/portal/img/logoboyte.png"></img>
                    </nav>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail"
                        onKeyPress={handleKeypress}
                    >
                        <Form.Label>Email address</Form.Label>

                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeypress}
                        />
                    </Form.Group>
                    <div className="invalid-message">{inValidMessage}</div>
                    <h6>Forgot password?</h6>
                    <Button variant="primary" style={{ width: "100%" }} onClick={handleSubmit}>
                        Sign In
                    </Button>
                    <span>Or Sign Up!</span>
                    <Link to="/signUp">
                        <Button variant="primary" className="btn-2">
                            Sign Up
                        </Button>
                    </Link>
                </Form>
            </Content>
        </Wrapper>
    );
};

export default SignInForm;
