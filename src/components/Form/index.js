import React from "react";
import { Content, Wrapper } from "./Form.styles";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import "./custom-bootstrap.css";
import axios from "axios";
const Forms = () => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (name.length > 0 && email.length > 0) {
            console.log("hello");
            setValidated(false);
            const headers = {
                "Access-Control-Allow-Origin": "https://localhost:3000",
                "Access-Control-Allow-Credentials": true,
            };
            const article = { title: "Axios POST Request Example" };
            axios
                .get("http://localhost:3000/getUserData", article, { headers })
                .then((response) => console.log(response.data))
                .catch((error) => {
                    console.error("There was an error!", error);
                });
            setName("");
            setEmail("");
        }
    };
    return (
        <Wrapper>
            <Content>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Họ và Tên</Form.Label>
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
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Select
                                aria-label="Floating label select example"
                                defaultValue="Gender"
                                custom
                            >
                                <option value="1">Nam</option>
                                <option value="2">Nũ</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="dob">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control required type="date" placeholder="" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control required type="number" pattern="^-?[0-9]\d*\.?\d*$" />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Content>
        </Wrapper>
    );
};

export default Forms;
