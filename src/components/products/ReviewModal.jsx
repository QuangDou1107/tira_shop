import React from 'react';

const ReviewModal = ({ isOpen, onClose, product }) => {
    if (!isOpen) return null; // Không hiển thị nếu modal không mở

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96 text-center'>
                <h2 className='text-lg font-semibold text-gray-900'>Review for {product?.name}</h2>
                <div className='mt-4'>
                    <p><strong>Description:</strong> {product?.description}</p>
                    <p><strong>Price:</strong> ${product?.price}</p>
                    {/* Form review hoặc các thông tin khác */}
                </div>
                <div className='flex justify-center gap-4 mt-4'>
                    <button
                        className='px-4 py-2 bg-gray-500 text-white rounded-lg'
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ReviewModal;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReviewModal = ({ isOpen, onClose, productId }) => {
//     const [review, setReview] = useState(null);

//     useEffect(() => {
//         if (isOpen && productId) {
//             // Gọi API để lấy review của sản phẩm cụ thể
//             axios.get(`http://localhost:8080/tirashop/reviews/product/${productId}`)
//                 .then(response => {
//                     // Giả sử API trả về dữ liệu review
//                     const fetchedReview = response.data.data?.elementList?.[0]; // Lấy review đầu tiên của sản phẩm
//                     setReview(fetchedReview);
//                 })
//                 .catch(err => {
//                     console.error("Error fetching review:", err);
//                 });
//         }
//     }, [isOpen, productId]);

//     if (!isOpen || !review) return null;

//     return (
//         <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
//             <div className='bg-white p-6 rounded-lg shadow-lg w-96 text-center'>
//                 <h2 className='text-lg font-semibold text-gray-900'>Review for Product {productId}</h2>
//                 <div className='mt-4'>
//                     <p><strong>Username:</strong> {review.username}</p>
//                     <p><strong>Rating:</strong> {review.rating}</p>
//                     <p><strong>Review:</strong> {review.reviewText}</p>
//                     {review.image && (
//                         <div>
//                             <strong>Review Image:</strong>
//                             <img src={`http://localhost:8080${review.image}`} alt="Review" className="w-24 h-24 object-cover mt-2 rounded-lg" />
//                         </div>
//                     )}
//                 </div>
//                 <div className='flex justify-center gap-4 mt-4'>
//                     <button
//                         className='px-4 py-2 bg-gray-500 text-white rounded-lg'
//                         onClick={onClose}
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ReviewModal;
