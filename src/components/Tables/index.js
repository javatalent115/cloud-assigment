import React from "react";
import { Content, Wrapper } from "./Tables.styles";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { numberFormat } from "../../numberFormat";
import "./tableCustom.css";
const Tables = () => {
    const [information, setInformation] = useState({});
    async function fetchData() {
        await axios.get("https://covid-api.mmediagroup.fr/v1/cases").then((res) => {
            console.log(Object.values(res.data)[1].All.confirmed);
            setInformation(res.data);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Wrapper>
            <Content>
                <h5>World covid information</h5>
                <div>
                    <Table
                        striped
                        bordered
                        hover
                        style={{ borderCollapse: "none", borderSpacing: "0px" }}
                    >
                        <thead>
                            <tr>
                                <th>Country Name</th>
                                <th>Confirmed</th>
                                <th>Deaths</th>
                                <th>Population</th>
                                <th>Life expectancy</th>
                                <th>Continent</th>
                                <th>Abbreviation</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(information).map((key, index) => (
                                <tr key={Object.keys(key)[index]}>
                                    <td> {Object.keys(information)[index]}</td>

                                    <td>
                                        {numberFormat(
                                            Object.values(information)[index].All.confirmed
                                        )}
                                    </td>
                                    <td>
                                        {" "}
                                        {numberFormat(Object.values(information)[index].All.deaths)}
                                    </td>
                                    <td>
                                        {" "}
                                        {numberFormat(
                                            Object.values(information)[index].All.population
                                        )}
                                    </td>
                                    <td>
                                        {" "}
                                        {numberFormat(
                                            Object.values(information)[index].All.life_expectancy
                                        )}
                                    </td>
                                    <td> {Object.values(information)[index].All.continent}</td>
                                    <td> {Object.values(information)[index].All.abbreviation}</td>
                                    <td> {Object.values(information)[index].All.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Content>
        </Wrapper>
    );
};

export default Tables;
