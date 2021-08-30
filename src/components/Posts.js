import React from "react";
import { numberFormat } from "../numberFormat";
const Posts = ({ posts, loading }) => {
    if (loading) {
        return <h1>Loading</h1>;
    }
    // debugger;
    return (
        <>
            {posts.map((post) => (
                <tr>
                    <td>{post.name}</td>
                    <td>{numberFormat(post.confirmed)}</td>
                    <td>{numberFormat(post.deaths)}</td>
                    <td>{numberFormat(post.population)}</td>
                    <td>{numberFormat(post.life_expectancy)}</td>
                    <td>{post.continent}</td>
                    <td>{post.abbreviation}</td>
                    <td>{post.location}</td>
                </tr>
            ))}
        </>
    );
};

export default Posts;
