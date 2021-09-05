import React from "react";
import { DashBoardContent, DashBoardWrapper } from "../SignUp/SignUp.styles";
import { Content, Wrapper } from "./ValidationPage.styles";
import { Link } from "react-router-dom";
import checkIcon from "../../check-icon.jpeg";
import uncheckIcon from "../../uncheck-icon.jpeg";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
const ValidationPage = () => {
    const [state, setState] = useState("uncheck");
    const [modalShow, setModalShow] = React.useState(false);
    let content = "";
    const handleConfirmButton = () => {
        setState("check");
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
    } else {
        content = (
            <>
                <Row>
                    <img src={uncheckIcon}></img>
                </Row>
                <Row>
                    <h3>You are not allow to go outside until you validate this form</h3>
                </Row>
                <Row>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Validation Form
                    </Button>

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        handleconfirmbutton={handleConfirmButton}
                    />
                </Row>
            </>
        );
    }
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
