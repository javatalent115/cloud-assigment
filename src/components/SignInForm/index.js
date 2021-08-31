import React from "react";
import { Content, Wrapper } from "./SignInForm.styles";
import { Form, Button } from "react-bootstrap";
import "./SignInForm-custom.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const SignInForm = ({ handleSignIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        if (email.length > 0 && password.length > 0) {
            const information = {
                email: email,
                password: password,
            };
            const headers = {
                headers: { "Content-type": "application/json" },
            };
            axios
                .post(
                    "http://localhost:3000/getUserData",
                    { email: "Admin@gmail.com", role: "Admin" },
                    headers
                )
                .then(
                    (response) => {
                        console.log(response);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            // axios.post("http://localhost:3000/validateAccount", information, headers).then(
            //     (response) => {
            //         console.log(response);
            //         if (response.data.email.length > 0) {
            //             handleSignIn();
            //             window.location.href = "/home";
            //         }
            //     },
            //     (error) => {
            //         console.log(error);
            //     }
            // );
        }
        if (email.length === 0 && password.length === 0) {
            alert("You need to place your email and password!!");
        } else if (password.length === 0) {
            alert("You need to place your password");
        } else if (email.length === 0) {
            alert("You need to place your email");
        }
    };

    return (
        <Wrapper>
            <Content>
                <Form>
                    <nav>
                        <img src="https://tiemchungcovid19.gov.vn/assets/portal/img/logoboyte.png"></img>
                    </nav>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
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
                        />
                    </Form.Group>
                    <h6>Quên mật khẩu?</h6>
                    <Button variant="primary" style={{ width: "100%;" }} onClick={handleSubmit}>
                        Sign In
                    </Button>
                    <span>Or Sign Up!</span>
                    <Link to="/signUp">
                        <Button variant="primary" type="submit" className="btn-2">
                            Sign Up
                        </Button>
                    </Link>
                </Form>
            </Content>
        </Wrapper>
    );
};

export default SignInForm;
