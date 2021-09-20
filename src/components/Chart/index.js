import React from "react";
import CanvasJSReact from "../../canvasjs-3.4/canvasjs.react";
import { Content, Wrapper } from "./Chart.styles";
import { useState, useEffect } from "react";
import axios from "axios";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Chart = () => {
    const [lineChartData, setLineChartData] = useState({});
    const [done, setDone] = useState(false);

    const containerProps = {
        height: "400px",
    };
    async function fetchData() {
        await axios
            .get("https://corona.lmao.ninja/v3/covid-19/vaccine/coverage/countries/vn")
            .then((res) => {
                let mapData = Object.keys(res.data.timeline).map((key, index) => ({
                    label:
                        Object.keys(res.data.timeline)[index].split("/")[0] +
                        "/".concat(Object.keys(res.data.timeline)[index].split("/")[1]),
                    y:
                        Object.values(res.data.timeline)[index + 1] -
                        Object.values(res.data.timeline)[index],
                    color: "red",
                }));
                let options = {
                    animationEnabled: true,
                    //exportEnabled: true,
                    title: {
                        fontSize: 30,
                    },
                    axisY: {
                        includeZero: false,
                        labelFontSize: 15,
                        gridThickness: 0.2,
                    },
                    axisX: {
                        includeZero: false,
                        labelFontSize: 13,
                        interval: 1,
                        gridThickness: 0.2,
                    },
                    legend: {
                        verticalAlign: "top", // "top" , "bottom"
                    },

                    data: [
                        {
                            legendMarkerType: "square",
                            legendText: "Đã tiêm",
                            lineColor: "#281ca4",
                            showInLegend: true,
                            legendMarkerBorderThickness: 11,
                            legendMarkerBorderColor: "#281ca4",
                            type: "line",
                            lineThickness: 4,
                            markerBorderColor: "white",
                            markerBorderThickness: 1,
                            dataPoints: mapData,
                        },
                    ],
                };
                setDone(true);
                setLineChartData(options);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Wrapper>
            <Content>
                <h5>Daily Vaccine Injection</h5>
                <CanvasJSChart containerProps={containerProps} options={lineChartData} />
            </Content>
        </Wrapper>
    );
};

export default Chart;
