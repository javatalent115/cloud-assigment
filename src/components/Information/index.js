import React, { useEffect } from "react";
import { DashBoardContent, DashBoardWrapper } from "../SignUp/SignUp.styles";
import { Link } from "react-router-dom";
import { Content, Item, Wrapper } from "./Information.styles";
import { useState } from "react";
import { Row, Col, ProgressBar, Button, Table } from "react-bootstrap";
import axios from "axios";
import Posts from "../Posts";
import Pagination from "../Pagination";
import DisplayInfo from "./displayInfo";

const Information = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [active, setActive] = useState({
        page: 1,
        isActive: true,
    });

    let roles = localStorage.getItem("roles");
    const [role, setRole] = useState(roles);
    const [progress, setProgress] = useState(0);
    const [information, setInformation] = useState({});
    const [conclude, setConclude] = useState("Chưa tiêm");
    const [buttonText, setButtonText] = useState("Xác nhận đã tiêm mũi 1");
    const [tableInfo, setTableInfo] = useState([]);
    let itemRender;
    let buttonRender;

    const indexOfLastPost = currentPage * postsPerPage;
    // console.log("indexOfLastPost: ", indexOfLastPost);

    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // console.log("indexOfFirstPost: ", indexOfFirstPost);

    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    async function fetchData() {
        const headers = {
            headers: { "Content-type": "application/json" },
        };
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
                        if (data.firstshot !== null) {
                            if (data.secondshot !== null) {
                                setProgress(100);
                                setConclude("Đã tiêm 2 mũi");
                            } else {
                                setProgress(50);
                                setButtonText("Xác nhận đã tiêm mũi 2");
                                setConclude("Đã tiêm 1 mũi");
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
                        });
                    } else {
                        console.log(response);
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
        if (progress === 0) {
            setProgress(50);
            setConclude("Bạn đã tiêm 1 liều");
            setButtonText("Xác nhận đã tiêm mũi 2");
        } else {
            setProgress(100);
            setConclude("Bạn đã tiêm đủ");
        }
    };
    if (progress === 0 || progress === 50) {
        buttonRender = <Button onClick={handleConfirmButton}>{buttonText}</Button>;
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
                            <h2>Chứng nhận tiêm chủng Covid-19</h2>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col>
                            <Item>
                                <h6>Họ và tên</h6>
                                <h5>{information.name}</h5>
                            </Item>
                        </Col>
                        <Col>
                            <Item>
                                <h6>Ngày sinh</h6>
                                <h5>{information.dob}</h5>
                            </Item>
                        </Col>
                        <Col>
                            <Item>
                                <h6>Số cmnd/cccd</h6>
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
                                <h6>Số điện thoại</h6>
                                <h5>{information.phoneNum}</h5>
                            </Item>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col md={4} xs={12}>
                            <Item>
                                <h6>Địa chỉ</h6>
                                <h5>{information.address}</h5>
                            </Item>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col md={4} xs={12}>
                            <Item>
                                <h6>Kết luận</h6>
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
                                <th>User Name</th>
                                <th>Email</th>
                                <th>password</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Date of birth</th>
                                <th>Phone number</th>
                                <th>First Dose</th>
                                <th>Second Dose</th>
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
                            <Link to="/">Trang chủ</Link>
                        </div>
                        <span>Information</span>
                    </div>
                </DashBoardContent>
            </DashBoardWrapper>
            {itemRender}
        </>
    );
};

export default Information;
