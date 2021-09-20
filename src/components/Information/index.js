import React, { useEffect } from "react";
import { DashBoardContent, DashBoardWrapper } from "../SignUp/SignUp.styles";
import { Link } from "react-router-dom";
import { Content, Item, Wrapper } from "./Information.styles";
import { useState } from "react";
import { Row, Col, ProgressBar, Button, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Posts from "../Posts";
import Pagination from "../Pagination";
import DisplayInfo from "./displayInfo";
import "./custom.css";
const Information = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [modalShow, setModalShow] = React.useState(false);
    const [vaccineName, setVaccineName] = useState("");
    const [vaccineDate, setVaccineDate] = useState("");

    const [active, setActive] = useState({
        page: 1,
        isActive: true,
    });
    const headers = {
        headers: { "Content-type": "application/json" },
    };
    let roles = localStorage.getItem("roles");
    const [role, setRole] = useState(roles);
    const [progress, setProgress] = useState(0);
    const [information, setInformation] = useState({});
    const [conclude, setConclude] = useState("Not injection");
    const [buttonText, setButtonText] = useState("First dose confirmation");
    const [tableInfo, setTableInfo] = useState([]);
    let itemRender;
    let buttonRender;

    const indexOfLastPost = currentPage * postsPerPage;
    // console.log("indexOfLastPost: ", indexOfLastPost);

    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // console.log("indexOfFirstPost: ", indexOfFirstPost);

    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    async function fetchData() {
        axios
            .post(
                "http://localhost:3000/getUserData",
                { email: localStorage.getItem("email"), role: localStorage.getItem("roles") },
                headers
            )
            .then(
                (response) => {
                    if (localStorage.getItem("roles") === "user") {
                        let data = response.data[0];
                        console.log(data.secondshot);
                        if (data.firstshot !== null && data.firstshot !== "") {
                            if (data.secondshot !== null && data.secondshot !== "") {
                                setProgress(100);
                                setConclude("Inject 2 dose");
                            } else {
                                setProgress(50);
                                setButtonText("Second dose confirmation");
                                setConclude("Inject 1 dose");
                            }
                        }

                        setInformation({
                            name: data.username,
                            address: data.address,
                            dob: data.dob,
                            email: data.email,
                            gender: data.gender,
                            phoneNum: data.phone,
                            progress: progress,
                            conclude: conclude,
                            firstshotdate: data.firstshotdate,
                            secondshotdate: data.secondshotdate,
                        });
                    } else {
                        setTableInfo(response.data);
                        setPosts(response.data);
                        setLoading(false);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setActive({
            page: pageNumber,
            isActive: true,
        });
    };
    const handleConfirmButton = () => {
        if (vaccineDate.length > 0 && vaccineName.length > 0) {
            let vaccineInfo;
            if (progress == 50) {
                vaccineInfo = {
                    isfirstshot: false,
                    email: localStorage.getItem("email"),
                    vaccineName: vaccineName,
                    date: vaccineDate,
                };
            } else {
                vaccineInfo = {
                    isfirstshot: true,
                    email: localStorage.getItem("email"),
                    vaccineName: vaccineName,
                    date: vaccineDate,
                };
            }
            axios.post("http://localhost:3000/confirmVacination", vaccineInfo, headers).then(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );

            if (progress === 0) {
                setProgress(50);
                setConclude("You have inject 1 dose");
                setButtonText("Second dose confirmation");
            } else {
                setProgress(100);
                setConclude("You have complete injection");
            }
            setModalShow(false);
            console.log(vaccineName);
            console.log(vaccineDate);
            setVaccineName("");
            setVaccineDate("");
        } else {
            alert("Please enter all information");
        }
    };

    if (progress === 0 || progress === 50) {
        buttonRender = (
            <>
                <Button onClick={() => setModalShow(true)}>{buttonText}</Button>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    handleconfirmbutton={handleConfirmButton}
                    name={vaccineName}
                    setVaccineName={setVaccineName}
                    date={vaccineDate}
                    setVaccineDate={setVaccineDate}
                />
            </>
        );
    }

    if (role === "user") {
        itemRender = (
            <Wrapper>
                <Content>
                    <Row className="row">
                        <Col className="text-center">
                            <h6 className="title">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIÊT NAM</h6>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col className="text-center">
                            <h5>Độc lập - Tự do - Hạnh Phúc</h5>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col className="text-center">
                            <h2>Covid 19 Injection Certificate</h2>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col>
                            <Item>
                                <h6>Full Name</h6>
                                <h5>{information.name}</h5>
                            </Item>
                        </Col>
                        <Col>
                            <Item>
                                <h6>Date of birth</h6>
                                <h5>{information.dob}</h5>
                            </Item>
                        </Col>
                        <Col>
                            <Item>
                                <h6>Email</h6>
                                <h5>{information.email}</h5>
                            </Item>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col md={4} xs={12}>
                            <Item>
                                <h6>Gender</h6>
                                <h5>{information.gender}</h5>
                            </Item>
                        </Col>
                        <Col>
                            <Item>
                                <h6>Phone number</h6>
                                <h5>{information.phoneNum}</h5>
                            </Item>
                        </Col>
                        <Col>
                            <Item>
                                <h6>Address</h6>
                                <h5>{information.address}</h5>
                            </Item>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col md={4} xs={12}>
                            <Item>
                                <h6>Conclude</h6>
                                <h5>{conclude}</h5>
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>{buttonRender}</Col>
                    </Row>

                    <ProgressBar now={progress} label={`${progress}%`} />
                </Content>
            </Wrapper>
        );
    } else if (role === "admin") {
        itemRender = (
            <Wrapper>
                <Content>
                    <Table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Date of birth</th>
                                <th>Phone number</th>
                                <th>First Dose</th>
                                <th>1st Date</th>
                                <th>Second Dose</th>
                                <th>2nd Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <DisplayInfo posts={currentPosts} loading={loading} />
                        </tbody>
                    </Table>
                    <Pagination
                        style={{ margin: "20px" }}
                        paginate={paginate}
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        current={active}
                    />
                </Content>
            </Wrapper>
        );
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <DashBoardWrapper>
                <DashBoardContent>
                    <h3>Vaccinated Information</h3>
                    <div>
                        <div>
                            <Link to="/">Home</Link>
                        </div>
                        <span>Information</span>
                    </div>
                </DashBoardContent>
            </DashBoardWrapper>
            {itemRender}
        </>
    );
};
function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            handleconfirmbutton={props.handleConfirmButton}
            name={props.name}
            date={props.date}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter vaccine type and injection date
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Vaccine name</Form.Label>
                    {/* <Form.Control
                        type="text"
                        placeholder="Vaccine name"
                        value={props.name}
                        onChange={(e) => props.setVaccineName(e.target.value)}
                    /> */}
                    <Form.Select
                        aria-label="Floating label select example"
                        onChange={(e) => props.setVaccineName(e.target.value)}
                    >
                        <option value="" selected>
                            Vaccine
                        </option>
                        <option value="AstraZeneca">AstraZeneca</option>
                        <option value="SPUTNIK V">SPUTNIK V</option>
                        <option value="Sinopharm">Sinopharm</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="Moderna">Moderna</option>
                        <option value="Janssen">Janssen</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="dob">
                    <Form.Label>Injection date</Form.Label>
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
                        <Button onClick={props.handleconfirmbutton} className="confirm-button">
                            Confirm
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={props.onHide} className="close-button">
                            Close
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
}
export default Information;
