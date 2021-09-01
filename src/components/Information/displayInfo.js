import React from "react";

const DisplayInfo = ({ posts, loading }) => {
    if (loading) {
        return <h1>Loading</h1>;
    }
    // debugger;
    return (
        <>
            {posts.map((key, index) => {
                return (
                    <tr>
                        <td>{posts[index].email}</td>
                        <td>{posts[index].gender}</td>
                        <td>{posts[index].address}</td>
                        <td>{posts[index].dob}</td>
                        <td>{posts[index].phone}</td>
                        <td>{posts[index].firstshot}</td>
                        <td>{posts[index].firstshotdate}</td>
                        <td>{posts[index].secondshot}</td>
                        <td>{posts[index].secondshotdate}</td>
                    </tr>
                );
            })}
        </>
    );
};

export default DisplayInfo;
