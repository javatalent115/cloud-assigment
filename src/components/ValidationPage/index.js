import React from "react";
import { DashBoardContent, DashBoardWrapper } from "../SignUp/SignUp.styles";
import { Content, Wrapper } from "./ValidationPage.styles";
import { Link } from "react-router-dom";
import checkIcon from "../../check-icon.jpeg";
import uncheckIcon from "../../uncheck-icon.jpeg";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
const ValidationPage = () => {
    const [state, setState] = useState();
    const [modalShow, setModalShow] = React.useState(false);
    const [time, setTime] = useState();
    let content = "";
    const headers = {
        headers: { "Content-type": "application/json" },
    };
    async function fetchData() {
        await axios
            .post(
                "http://localhost:3000/getConfirmStatus",
                { email: localStorage.getItem("email") },
                headers
            )
            .then(
                (response) => {
                    console.log(response);
                    let today = new Date();

                    if (response.data.status === "Unsafe") {
                        if (today.getTime() >= response.data.date) {
                            setState("uncheck");
                        } else {
                            setState("abc");
                        }
                    } else {
                        if (today.getTime() < response.data.date) {
                            setState("check");
                        } else {
                            setState("uncheck");
                        }
                    }

                    // setTime(response.data.)
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    const handleConfirmButton = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const information = {
            email: localStorage.getItem("email"),
            status: "Unsafe",
            date: tomorrow.getTime(),
        };
        axios.post("http://localhost:3000/submitConfirmForm", information, headers).then(
            (response) => {
                if (information.status === "Unsafe") {
                    setState("abc");
                } else setState("check");
            },
            (error) => {
                console.log(error);
                setState("");
            }
        );
    };
    if (state === "check") {
        content = (
            <>
                <Row>
                    <img src={checkIcon}></img>
                </Row>
                <Row>
                    <h3>You are allow to go outside</h3>
                </Row>
            </>
        );
    } else if (state == "abc") {
        content = (
            <>
                <Row>
                    <img src={uncheckIcon}></img>
                </Row>
                <Row>
                    <h3>You are not allow to go outside</h3>
                </Row>
            </>
        );
    } else if (state == "uncheck") {
        content = (
            <>
                <Row>
                    <img src={uncheckIcon}></img>
                </Row>
                <Row>
                    <h3>Please submit the form!</h3>
                </Row>
                <Row>
                    <>
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Validation Form
                        </Button>
                    </>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        handleconfirmbutton={handleConfirmButton}
                    />
                </Row>
            </>
        );
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <DashBoardWrapper>
                <DashBoardContent>
                    <h3>Form validation</h3>
                    <div>
                        <div>
                            <Link to="/">Trang chủ</Link>
                        </div>
                        <span>Validation</span>
                    </div>
                </DashBoardContent>
            </DashBoardWrapper>
            <Wrapper>
                <Content>{content}</Content>
            </Wrapper>
        </>
    );
};
function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            handleconfirmbutton={props.handleConfirmButton}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nhập loại thuốc và ngày mà bạn đã tiêm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Tên thuốc</Form.Label>
                    {/* <Form.Control
                        type="text"
                        placeholder="Vaccine name"
                        value={props.name}
                        onChange={(e) => props.setVaccineName(e.target.value)}
                    /> */}
                </Form.Group>
                <Form.Group as={Col} controlId="dob">
                    <Form.Label>Ngày chích</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder=""
                        onChange={(e) => props.setVaccineDate(e.target.value)}
                    />
                </Form.Group>
                <p></p>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col>
                        <Button className="confirm-button" onClick={props.handleconfirmbutton}>
                            Confirm
                        </Button>
                    </Col>
                    <Col>
                        <Button className="close-button" onClick={props.onHide}>
                            Close
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
}
export default ValidationPage;
