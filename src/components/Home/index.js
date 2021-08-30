import React from "react";
import Chart from "../Chart";
import DashBoard from "../DashBoard";
import Tables from "../Tables";
import { Container } from "./Home.styles";

const Home = () => {
    return (
        <Container>
            <DashBoard />
            <Chart />
            <Tables />
        </Container>
    );
};

export default Home;
