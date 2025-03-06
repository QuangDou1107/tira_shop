import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Check, Search } from 'lucide-react';
import Pagination from '../common/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiConfirmed } from "react-icons/gi";
import ToastProvider, { showToast } from "../ToastProvider";

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        fetchOrders();
    }, [currentPage, searchTerm]);

    const handleToast = () =>{
        showToast("Confirm successfully", "success");
    }

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/tirashop/orders/pending`);
            let fetchedOrders = response.data.data || [];

            if (searchTerm) {
                fetchedOrders = fetchedOrders.filter(order =>
                    order.shipping_address.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setTotalPages(Math.ceil(fetchedOrders.length / pageSize));
            const paginatedOrders = fetchedOrders.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
            setOrders(paginatedOrders);
        } catch (err) {
            console.error('Error fetching orders:', err);
            toast.error("Failed to load order data.");
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/tirashop/orders/${orderId}/status`, { status: newStatus });
            toast.success("Order status updated successfully!");
            fetchOrders();
        } catch (err) {
            console.error("Error updating order status:", err);
            toast.error("Failed to update status.");
        }
    };

    const handleConfirmDelivery = async (shipmentId) => {
        try {
            await axios.put(`http://localhost:8080/tirashop/orders/shipments/${shipmentId}/confirm`);
            toast.success("Order confirmed successfully!");
            fetchOrders();
        } catch (err) {
            console.error("Error confirming order:", err);
            toast.error("Failed to confirm order.");
        }
    };

    return (
        <div className='m-5 p-6 bg-white text-black rounded-xl'>
        <ToastProvider/>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-900'>Order List</h2>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search by shipping address...'
                        className='bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <Search className='absolute left-3 top-2.5 text-gray-500' size={18} />
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-300'>
                    <thead>
                        <tr>
                            {/* <th className='pl-4 py-3 text-left text-xs font-medium text-gray-700 uppercase'>ID</th> */}
                            {/* <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase'>UserName</th> */}
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase'>Product</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase'>Total Price</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase'>Status</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase'>Date</th>
                            <th className='py-3 text-left text-xs font-medium text-gray-700 uppercase'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-300'>
                        {orders.map((order) => (
                            <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                {/* <td className='pl-4 py-3 text-sm text-gray-700'>{order.orderId || order.id}</td> */}

                                {/* <td className='py-3 text-sm text-gray-700'>{order.userName}</td> */}
                                <td className='py-3 text-sm text-gray-700'>{order.productName}</td>
                                <td className='py-3 text-sm text-gray-700'>${order.price}</td>
                                <td className='py-3 text-sm text-gray-700'>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className='border rounded p-1 text-gray-700'
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Canceled">Canceled</option>
                                    </select>
                                </td>
                                <td className='py-3 text-sm text-gray-700'>{order.createdAt}</td>
                                <td className='py-3 text-sm text-gray-700'>
                                    <button className='text-green-600 hover:text-green-500 ml-4' onClick={handleToast}>
                                        <GiConfirmed size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <ToastContainer />
        </div>
    );
};

export default OrdersTable;
