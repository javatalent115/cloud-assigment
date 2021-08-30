import React from "react";
import { Content, Wrapper } from "./DashBoard.styles";
import { Item } from "./DashBoard.styles";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { numberFormat } from "../../numberFormat";
const DashBoard = () => {
    const [vaccineData, setVaccineData] = useState({});
    async function fetchData() {
        await axios
            .get("https://corona.lmao.ninja/v3/covid-19/vaccine/coverage/countries/vn")
            .then((data) => {
                setVaccineData(data.data.timeline);
            });
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Wrapper>
            <Content>
                <Item>
                    <img src="https://tiemchungcovid19.gov.vn/assets/portal/img/ic_register_people.svg"></img>
                    <div>
                        <h6>Đối tượng đăng ký tiêm</h6>
                        <span>5,873,546</span>
                        <small>(lượt)</small>
                    </div>
                </Item>
                <Item>
                    <img src="https://tiemchungcovid19.gov.vn/assets/portal/img/ic_injection.svg"></img>
                    <div>
                        <h6>Số mũi tiêm hôm qua</h6>
                        <span>
                            {numberFormat(
                                vaccineData[
                                    Object.keys(vaccineData)[Object.keys(vaccineData).length - 1]
                                ] -
                                    vaccineData[
                                        Object.keys(vaccineData)[
                                            Object.keys(vaccineData).length - 2
                                        ]
                                    ]
                            )}
                        </span>
                        <small>(mũi)</small>
                    </div>
                </Item>
                <Item>
                    <img src="https://tiemchungcovid19.gov.vn/assets/portal/img/ic_injected_people.svg"></img>
                    <div>
                        <h6>Số mũi đã tiêm toàn quốc</h6>
                        <span>
                            {" "}
                            {numberFormat(
                                vaccineData[
                                    Object.keys(vaccineData)[Object.keys(vaccineData).length - 1]
                                ]
                            )}
                        </span>
                        <small>(mũi)</small>
                    </div>
                </Item>
            </Content>
        </Wrapper>
    );
};

export default DashBoard;
