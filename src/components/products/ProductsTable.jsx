import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import AddProductModal from './AddProductModal'; // Assuming you have this modal
import EditProductModal from './EditProductModal'; // Assuming you have this modal
import Pagination from '../common/Pagination';
import ToastProvider, { showToast } from "../ToastProvider";
import 'react-toastify/dist/ReactToastify.css';
import { IoEyeSharp } from "react-icons/io5";
import ReviewModal from './ReviewModal';


const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;
    const handleToast = () => {
        showToast("Test thoi???", "success");
    }

    useEffect(() => {
        fetchProducts();
    }, [currentPage, searchTerm]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/tirashop/product');
            let fetchedProducts = response.data.data.elementList || [];

            if (searchTerm) {
                fetchedProducts = fetchedProducts.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            const productsWithImages = await Promise.all(
                fetchedProducts.map(async (product) => {
                    try {
                        const imageRes = await axios.get(`http://localhost:8080/tirashop/product/${product.id}/images`);

                        // console.log(`Image response for product ${product.id}:`, imageRes.data);

                        const images = imageRes.data.data || []; // Kiểm tra API có trả về mảng data không
                        return {
                            ...product,
                            image: images.length > 0 ? `http://localhost:8080${encodeURI(images[0].url)}` : null,
                        };
                    } catch (error) {
                        console.error(`Error fetching images for product ${product.id}:`, error);
                        return { ...product, image: null };
                    }
                })
            );

            setTotalPages(Math.ceil(productsWithImages.length / pageSize));
            const paginatedProducts = productsWithImages.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
            setProducts(paginatedProducts);
        } catch (err) {
            console.error('Error fetching products:', err);
            toast.error("Failed to load product data.");
        }
    };



    const handleProductAdded = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setTimeout(() => {
            setCurrentPage((prevPage) => Math.ceil((products.length + 1) / pageSize) - 1);
        }, 100);
        setIsAddModalOpen(false);
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleProductUpdated = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
        );
        setIsEditModalOpen(false);
        setSelectedProduct(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0);
    };


    const handleStatusChange = async (productId, newStatus) => {
        try {
            await axios.put(
                `http://localhost:8080/tirashop/product/update/${productId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId ? { ...product, status: newStatus } : product
                )
            );

            showToast("Status updated successfully!", "success");
        } catch (err) {
            console.error("Error updating status:", err);
            showToast("Failed to update status.", "error");
        }
    };
    const handleDeleteClick = (product) => {
        setProductToDelete(product); // Lưu lại sản phẩm cần xóa
        setIsDeleteModalOpen(true);  // Mở modal xác nhận xóa
    };

    // Hàm xử lý khi người dùng xác nhận xóa
    const handleDeleteProduct = async () => {
        if (!productToDelete) return; // Kiểm tra nếu không có sản phẩm cần xóa

        try {
            // Gửi yêu cầu xóa sản phẩm từ API
            await axios.delete(`http://localhost:8080/tirashop/product/delete/${productToDelete.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            // Cập nhật lại danh sách sản phẩm sau khi xóa
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productToDelete.id));

            // Hiển thị thông báo thành công
            showToast("Product deleted successfully!", "success");
        } catch (err) {
            console.error("Error deleting product:", err);
            showToast("Failed to delete product. Please try again.", "error");
        }

        // Đóng modal và reset sản phẩm cần xóa
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
    };


    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    //Review modal
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedProductForReview, setSelectedProductForReview] = useState(null);

    const handleReviewClick = (product) => {
        setSelectedProductForReview(product);
        setIsReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setIsReviewModalOpen(false);
        setSelectedProductForReview(null);
    };



    return (
        <div className='my-8 p-6 bg-white text-black rounded-xl'>
            <ToastProvider />
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-900'>Product List</h2>
                <div className='flex items-center gap-4'>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Search products name...'
                            className='bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={handleSearchChange}
                            value={searchTerm}
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-500' size={18} />
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} className='bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'>
                        <Plus size={18} /> Add New Product
                    </button>
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-300 table-fixed'>
                    <thead>
                        <tr>
                            <th className='pl-16 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>ID</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Image</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Name</th>
                            <th className='px-0 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Description</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Price</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Original Price</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Inventory</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Status</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Brand</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Category</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-300'>
                        {products.map((product) => (
                            <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                <td className='pl-16 py-9 text-left text-xs font-medium text-gray-700 uppercase tracking-wider min-w-[200px]'>{product.id}</td>
                                <td className='py-4 text-sm text-gray-700 min-w-[200px]'>
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td className='py-4 text-sm text-gray-700 min-w-[200px]'>{product.name}</td>
                                <td className='pr-3 py-4 text-sm text-gray-700 min-w-[200px]'>{product.description}</td>
                                <td className='py-4 text-sm text-gray-700 min-w-[200px]'>${product.price}</td>
                                <td className='py-4 text-sm text-gray-700 min-w-[200px]'>${product.originalPrice}</td>
                                <td className='py-4 text-sm text-gray-700 min-w-[200px]'>{product.inventory}</td>

                                <td className='py-4 text-sm text-gray-700 min-w-[200px]'>{product.status}</td>
                                <td className='py-4 text-sm text-gray-700 min-w-[200px]'>{product.brandName}</td>
                                <td className='py-4 text-sm text-gray-700 min-w-[200px]'>{product.categoryName}</td>
                                <td className='py-4 text-sm text-gray-700 min-w-[200px]'>
                                    <button className='text-indigo-600 hover:text-indigo-500 mr-2' onClick={() => handleEditClick(product)}>
                                        <Edit size={18} />
                                    </button>
                                    <button className='text-red-600 hover:text-red-500 mr-2' onClick={() => handleDeleteClick(product)}>
                                        <Trash2 size={18} />
                                    </button>

                                    <button className='text-blue-400 hover:text-red-500' onClick={() => handleReviewClick(product)}>
                                        <IoEyeSharp size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onProductAdded={handleProductAdded} />
            {isEditModalOpen && <EditProductModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} product={selectedProduct} onProductUpdated={handleProductUpdated} />}
            {isReviewModalOpen && (
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={handleCloseReviewModal}
                    product={selectedProductForReview}
                />
            )}
            {isDeleteModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-96 text-center'>
                        <h2 className='text-lg font-semibold text-red-500'>Confirm Delete</h2>
                        <p className='text-gray-700 mt-2'>
                            Are you sure you want to delete
                            <span className='font-bold text-red-500'>{productToDelete?.name}</span>?
                        </p>
                        <div className='flex justify-center gap-4 mt-4'>
                            <button
                                className='px-4 py-2 bg-gray-500 text-white rounded-lg'
                                onClick={() => setIsDeleteModalOpen(false)} // Đóng modal nếu người dùng nhấn "Cancel"
                            >
                                Cancel
                            </button>
                            <button
                                className='px-4 py-2 bg-red-500 text-white rounded-lg'
                                onClick={handleDeleteProduct}  // Gọi hàm xóa sản phẩm khi xác nhận
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductsTable;
