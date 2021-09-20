import React from "react";
import { Content, Wrapper } from "./Form.styles";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import "./custom-bootstrap.css";
import axios from "axios";
import SignUp from "../SignUp";
const Forms = ({ handleSignUp }) => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (
            name.length > 0 &&
            email.length > 0 &&
            gender.length > 0 &&
            dob.length > 0 &&
            phoneNum.length > 0 &&
            address.length > 0 &&
            password.length > 0 &&
            email.includes("@")
        ) {
            const information = {
                username: name,
                email: email,
                gender: gender,
                dob: dob,
                phone: phoneNum,
                address: address,
                password: password,
                avatar: avatar,
            };
            const headers = {
                headers: { "Content-type": "application/json" },
            };
            axios.post("http://Cloud-env.eba-8hk2mpj3.us-west-2.elasticbeanstalk.com/signups", information, headers).then(
                (response) => {
                    if (response.data !== false) {
                        window.location.href = "/signIn";
                    } else {
                        alert("This email has been used");
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
            handleSignUp();
            setValidated(false);
        }
    };

    return (
        <Wrapper>
            <Content>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                aria-label="Floating label select example"
                                defaultValue="Gender"
                                required
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="" selected>
                                    Gender
                                </option>
                                <option value="Male" selected>
                                    Male
                                </option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="dob">
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                placeholder=""
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                placeholder="Enter password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                pattern="^-?[0-9]\d*\.?\d*$"
                                onChange={(e) => setPhoneNum(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            placeholder="1234 Main St"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Avatar link</Form.Label>
                        <Form.Control
                            required
                            placeholder="Avatar source"
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </Content>
        </Wrapper>
    );
};

export default Forms;
