import React from 'react';
import { useNavigate } from "react-router-dom";
import "./pagination.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
    const navigate = useNavigate();

    const handlePageChange = (page: number) => {
        navigate(`/?page=${page}`);
    };

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={page === currentPage}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;