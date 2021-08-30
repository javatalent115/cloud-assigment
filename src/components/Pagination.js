import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, current }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <nav>
                <ul className="pagination">
                    {pageNumbers.map((number) => {
                        if (current.page === number) {
                            return (
                                <li className="page-item active" key={number}>
                                    <a onClick={() => paginate(number)} className="page-link">
                                        {number}
                                    </a>
                                </li>
                            );
                        } else {
                            return (
                                <li className="page-item" key={number}>
                                    <a onClick={() => paginate(number)} className="page-link">
                                        {number}
                                    </a>
                                </li>
                            );
                        }
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
