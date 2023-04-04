import React from 'react'
import './index.css';

function Pagination({ numberOfPages, currentPage, setCurrentPage }) {

    const pageNumbers = []
    for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers.push(i)
    }
    const nextPage = () => {
        if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    var startPage = Math.max(1, currentPage - 5);
    var endPage = Math.min(startPage + 10 -1, numberOfPages);
    startPage = Math.max(1, endPage - 10 + 1);

    return (
        <div>
            {(currentPage !== 1) && (<button onClick={prevPage}>prev </button>)}    
                
            {
                 Array.from({length: numberOfPages}, (element, index) => index ).map((number) => (
                    <button key={number + 1} onClick={() => setCurrentPage(number + 1)}
                    className={currentPage === number + 1 ? "active" : ""}>
                        {number + 1}
                    </button>
                )).slice(startPage - 1, endPage)
            }

            {(currentPage !== numberOfPages) && <button onClick={nextPage}>next </button>}
        </div>
    )
}

export default Pagination;