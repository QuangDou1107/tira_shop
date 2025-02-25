import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null; // Không hiển thị nếu chỉ có 1 trang

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            {/* Nút Previous */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-3 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
                Previous
            </button>

            {/* Hiển thị số trang */}
            {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-2 border rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-300'}`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Nút Next */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 border rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
