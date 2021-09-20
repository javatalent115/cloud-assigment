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
    const [state, setState] = useState("uncheck");
    const [modalShow, setModalShow] = React.useState(false);
    const [radio, setRadio] = useState(null);
    let content = "";
    const headers = {
        headers: { "Content-type": "application/json" },
    };

    async function fetchData() {
        await axios
            .post(
                "http://Cloud-env.eba-8hk2mpj3.us-west-2.elasticbeanstalk.com/getConfirmStatus",
                { email: localStorage.getItem("email") },
                headers
            )
            .then(
                (response) => {
                    let today = new Date();

                    if (response.data.status === "Unsafe") {
                        if (today.getTime() >= response.data.date) {
                            setState("uncheck");
                        } else {
                            setState("notValid");
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
                (error) => {}
            );
    }
    const handleConfirmButton = () => {
        if (radio !== null) {
            if (Object.keys(radio).length >= 6) {
                let temp;
                if (
                    radio[0] === "no" &&
                    radio[1] === "no" &&
                    radio[2] === "no" &&
                    radio[3] === "no" &&
                    radio[4] === "no" &&
                    radio[5] === "no"
                ) {
                    temp = "Safe";
                } else {
                    temp = "Unsafe";
                }
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                const information = {
                    email: localStorage.getItem("email"),
                    status: temp,
                    date: tomorrow.getTime(),
                };

                axios.post("http://Cloud-env.eba-8hk2mpj3.us-west-2.elasticbeanstalk.com/submitConfirmForm", information, headers).then(
                    (response) => {
                        if (information.status === "Unsafe") {
                            setState("notValid");
                        } else setState("check");
                    },
                    (error) => {
                        setState("");
                    }
                );
            } else {
                alert("Make sur you have checked all options");
            }
        } else {
            alert("Make sur you have checked all options");
        }
    };
    if (state === "check") {
        content = (
            <>
                <Row>
                    <img alt="" src={checkIcon}></img>
                </Row>
                <Row>
                    <h3>You are allow to go outside</h3>
                </Row>
            </>
        );
    } else if (state === "notValid") {
        content = (
            <>
                <Row>
                    <img alt="" src={uncheckIcon}></img>
                </Row>
                <Row>
                    <h3>You are not allow to go outside</h3>
                </Row>
            </>
        );
    } else if (state === "uncheck") {
        content = (
            <>
                <Row>
                    <img src={uncheckIcon} alt=""></img>
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
                        setRadio={setRadio}
                        radio={radio}
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
                            <Link to="/">Home</Link>
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
            setRadio={props.setRadio}
            radio={props.radio}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <Row>
                        <Col sm={3} style={{ alignItems: "center" }}>
                            <img
                                alt=""
                                style={{ width: "120px", textAlign: "center" }}
                                src="https://lists.office.com/Images/d1323671-cdbe-4417-b4d4-bdb24b51316b/25798cb2-491b-44e9-aea4-39b9b2bd69eb/TEUYXD27CB0VTV7XV1LQV0G704/e4936cf8-9dd5-4f82-9e10-5074465f24cf"
                            ></img>
                        </Col>
                        <Col sm={9}>VIETNAM MANDATORY HEALTH DECLARATION</Col>
                    </Row>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-3">
                <Row className="my-3 fw-bold">
                    Have you experienced any of the following symptoms within the past 14 days?
                </Row>
                <Row>
                    <Col></Col>
                    <Col sm={2}>Yes</Col>
                    <Col sm={2}>No</Col>
                </Row>
                {[
                    "Fever",
                    "Cough",
                    "Shortness of breath",
                    "Sore throat",
                    "Pneumonia",
                    "Loss of sense of taste & smell",
                ].map((question, index) => (
                    <Row className="my-3" style={{ alignItems: "center" }}>
                        <Col>
                            <span>{question}</span>
                        </Col>
                        <Col sm={2}>
                            <Form.Check
                                inline
                                name={`question${index}`}
                                type="radio"
                                id={`inline-radio-1`}
                                onClick={() => {
                                    props.setRadio({ ...props.radio, [index]: "yes" });
                                }}
                            />
                        </Col>
                        <Col sm={2}>
                            <Form.Check
                                inline
                                name={`question${index}`}
                                type="radio"
                                id={`inline-radio-2`}
                                onClick={() => {
                                    props.setRadio({ ...props.radio, [index]: "no" });
                                }}
                            />
                        </Col>
                    </Row>
                ))}
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
