import React from "react";
import { Content, Wrapper } from "./Tables.styles";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { numberFormat } from "../../numberFormat";
import "./tableCustom.css";
import Posts from "../Posts";
import Pagination from "../Pagination";
const Tables = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(15);
    const [active, setActive] = useState({
        page: 1,
        isActive: true,
    });

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("https://covid-api.mmediagroup.fr/v1/cases");
            console.log(res.data);
            let obj = [];

            // for (let i = 0; i < res.data.length;i++){
            //     obj = [,{}]
            // }
            obj = Object.keys(res.data).map((key, index) => ({
                name: res.data[Object.keys(res.data)[index]].All.country,
                confirmed: res.data[Object.keys(res.data)[index]].All.confirmed,
                deaths: res.data[Object.keys(res.data)[index]].All.deaths,
                population: res.data[Object.keys(res.data)[index]].All.population,
                abbreviation: res.data[Object.keys(res.data)[index]].All.abbreviation,
                continent: res.data[Object.keys(res.data)[index]].All.continent,
                life_expectancy: res.data[Object.keys(res.data)[index]].All.life_expectancy,
                location: res.data[Object.keys(res.data)[index]].All.location,
                id: index,
            }));
            console.log(obj);
            setPosts(obj);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    // console.log(posts);

    const indexOfLastPost = currentPage * postsPerPage;
    // console.log("indexOfLastPost: ", indexOfLastPost);

    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // console.log("indexOfFirstPost: ", indexOfFirstPost);

    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    console.log(currentPosts);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setActive({
            page: pageNumber,
            isActive: true,
        });
    };

    const [information, setInformation] = useState([]);
    const [page, setPage] = useState([]);

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
                            <Posts posts={currentPosts} loading={loading} />
                        </tbody>
                    </Table>
                </div>
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
};

export default Tables;
