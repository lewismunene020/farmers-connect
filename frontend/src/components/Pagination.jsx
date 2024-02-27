import React, { useState } from "react";

const Pagination = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePaginationClick = (page) => {
        setCurrentPage(page);
      };

    return (
        <div className="col-md-3"> 
            <cemter>
                <p>Pagination</p>
                <ul className="pagination">
                    <li>
                        <a href="#" onClick={() => handlePaginationClick(1)}>First Page</a>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index}>
                            <a href="#" onClick={handlePaginationClick(index+1)}>{index+1}</a>
                        </li>
                    ))}
                    <li>
                    <a   a href="#" onClick={() => handlePaginationClick(totalPages)}>Last Page</a>

                    </li>
                </ul>
            </cemter>
        </div>
  );
};

export default Pagination;
