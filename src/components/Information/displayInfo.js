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
                        <td>{posts[index].username}</td>
                        <td>{posts[index].email}</td>
                        <td>{posts[index].password}</td>
                        <td>{posts[index].gender}</td>
                        <td>{posts[index].address}</td>
                        <td>{posts[index].dob}</td>
                        <td>{posts[index].phone}</td>
                        <td>{posts[index].firstshot}</td>
                        <td>{posts[index].secondshot}</td>
                    </tr>
                );
            })}
        </>
    );
};

export default DisplayInfo;
