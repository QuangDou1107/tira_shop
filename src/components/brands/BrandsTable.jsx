import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import AddBrandModal from './AddBrandModal';
import EditBrandModal from './EditBrandModal'; // Import modal edit
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const BrandsTable = () => {
    const [brands, setBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    useEffect(() => {
        fetchBrands();
    }, []);

    
    const fetchBrands = () => {
        axios.get('http://localhost:8080/tirashop/brand/list')
            .then(response => {
                setBrands(response.data.data || []);
            })
            .catch(err => {
                console.error('Error fetching brands:', err);
            });
    };

    const handleBrandAdded = (newBrand) => {
        setBrands(prevBrands => [...prevBrands, newBrand]);
        setIsAddModalOpen(false);
        // console.log("Brand added, showing toast...");
    };

    const handleEditClick = (brand) => {
        setSelectedBrand(brand);
        setIsEditModalOpen(true);
    };
    const handleBrandUpdated = (updatedBrand) => {
        setBrands(prevBrands =>
            prevBrands.map(brand => (brand.id === updatedBrand.id ? updatedBrand : brand))
        );
        setIsEditModalOpen(false);

        // Hiển thị thông báo thành công
        // toast.success('Brand updated successfully!', { autoClose: 2000 });
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState(null);


    const handleDeleteClick = (brand) => {
        setBrandToDelete(brand);
        setIsDeleteModalOpen(true);
    };
    const handleDeleteBrand = async () => {
        if (!brandToDelete) return;

        try {
            await axios.delete(`http://localhost:8080/tirashop/brand/delete/${brandToDelete.id}`);

            // Xóa brand khỏi danh sách
            setBrands(prevBrands => prevBrands.filter(brand => brand.id !== brandToDelete.id));

            // Hiển thị thông báo thành công
            toast.success("Brand deleted successfully!", { autoClose: 2000 });

        } catch (err) {
            console.error("Error deleting brand:", err);
            toast.error("Failed to delete brand. Please try again.");
        }

        // Đóng modal
        setIsDeleteModalOpen(false);
        setBrandToDelete(null);
    };


    return (
        <div className='m-5 p-6 bg-white text-black rounded-xl'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-900'>Brand List</h2>
                <div className='flex items-center gap-4'>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Search brands name...'
                            className='bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-500' size={18} />
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} className='bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'>
                        <Plus size={18} /> Add New Brand
                    </button>
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-300'>
                    <thead>
                        <tr>
                            <th className='pl-16 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>ID</th>
                            <th className='pl-9 pr-14 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Logo</th>
                            <th className='pl-12  py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Name</th>
                            <th className='pl-0 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Description</th>
                            <th className='pl-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-300'>
                        {brands.filter(brand => brand.name.toLowerCase().includes(searchTerm.toLowerCase())).map((brand) => (
                            <motion.tr key={brand.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                <td className='pl-16 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{brand.id}</td>
                                <td className='pl-8 pr-14 py-4 whitespace-nowrap text-sm text-gray-700 w-10 h-10'>
                                    <img
                                        src={`http://localhost:8080${brand.logo}`}
                                        alt={brand.name}
                                        className='w-10 h-10 rounded-full'
                                    />
                                </td>
                                <td className='pl-12 py-4 whitespace-nowrap text-sm text-gray-700'>{brand.name}</td>
                                <td className='px-0 py-4 whitespace-nowrap text-sm text-gray-700'>{brand.description}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                                    <button
                                        className='text-indigo-600 hover:text-indigo-500 mr-2'
                                        onClick={() => handleEditClick(brand)}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        className='text-red-600 hover:text-red-500'
                                        onClick={() => handleDeleteClick(brand)}
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* Hiển thị AddBrandModal */}
            <AddBrandModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onBrandAdded={handleBrandAdded}
            />

            {/* Hiển thị EditBrandModal */}
            {isEditModalOpen && (

                <EditBrandModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    brand={selectedBrand}
                    onBrandUpdated={handleBrandUpdated} // Truyền hàm cập nhật vào modal
                />
            )}

            {isDeleteModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-96 text-center'>
                        <h2 className='text-lg font-semibold text-gray-900'>Confirm Delete</h2>
                        <p className='text-gray-700 mt-2'>
                            Are you sure you want to delete <span className='font-bold'>{brandToDelete?.name}</span>?
                            This action cannot be undone.
                        </p>
                        <div className='flex justify-center gap-4 mt-4'>
                            <button
                                className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
                                onClick={handleDeleteBrand}
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

export default BrandsTable;



