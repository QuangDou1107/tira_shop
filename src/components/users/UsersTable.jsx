import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Edit, Trash, Mail, Plus } from 'lucide-react';
import Pagination from '../common/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastProvider, { showToast } from "../ToastProvider";


const UsersTable = () => {
	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const pageSize = 5;

	useEffect(() => {
		fetchUsers();
	}, [currentPage, searchTerm]);

	const handleToast = ()=>{
		showToast("Add user!!!", "success");
	}

	const fetchUsers = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/tirashop/user/list`);
			let fetchedUsers = response.data.data || [];

			if (searchTerm) {
				fetchedUsers = fetchedUsers.filter(user =>
					user.username.toLowerCase().includes(searchTerm.toLowerCase())
				);
			}

			setTotalPages(Math.ceil(fetchedUsers.length / pageSize));
			const paginatedUsers = fetchedUsers.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
			setUsers(paginatedUsers);
		} catch (err) {
			console.error('Error fetching users:', err);
			toast.error("Failed to load user data.");
		}
	};

	const handleStatusChange = async (userId, newStatus) => {
		try {
			await axios.put(`http://localhost:8080/tirashop/user/update/${userId}`, { status: newStatus });
			toast.success("User status updated successfully!");
			fetchUsers();
		} catch (err) {
			console.error("Error updating user status:", err);
			toast.error("Failed to update status.");
		}
	};

	const handleDeleteUser = async (userId) => {
		try {
			await axios.delete(`http://localhost:8080/tirashop/user/delete/${userId}`);
			toast.success("User deleted successfully!");
			fetchUsers();
		} catch (err) {
			console.error("Error deleting user:", err);
			toast.error("Failed to delete user.");
		}
	};

	const handleSendEmail = async (userId) => {
		try {
			await axios.post(`http://localhost:8080/tirashop/user/${userId}/send-email`);
			toast.success("Email sent successfully!");
		} catch (err) {
			console.error("Error sending email:", err);
			toast.error("Failed to send email.");
		}
	};

	return (
		<div className='my-5 p-6 bg-white text-black rounded-xl shadow-lg'>
			<ToastProvider />
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-900'>User List</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search by username...'
						className='bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={(e) => setSearchTerm(e.target.value)}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-500' size={18} />
					
				</div>
				<button onClick={handleToast} className='bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'>
                        <Plus size={18} /> Add New Product
                    </button>
			</div>

			{/* Thêm thanh scroll ngang */}
			<div className='overflow-x-auto w-full'>
				<table className='min-w-max w-full divide-y divide-gray-300'>
					<thead>
						<tr>
							<th className='w-20 py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase '>User ID</th>
							<th className='w-40 py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase '>Username</th>
							<th className='w-32 py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase'>Avatar</th>
							<th className='w-48 py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase'>Password</th>
							<th className='w-36 py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase '>Birthday</th>
							<th className='w-36 py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase '>Phone</th>
							<th className='w-48 py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase '>Address</th>
							<th className='w-28 py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase '>Status</th>
							<th className='w-40 py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase '>Actions</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-300'>
						{users.map((user) => (
							<motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
								<td className='py-3 px-4 text-sm text-gray-700'>{user.id}</td>
								<td className='py-3 px-4 text-sm text-gray-700'>{user.username}</td>
								<td className='py-3 px-4 text-sm text-gray-700'>
									<img src={`http://localhost:8080${user.avatar}`} alt="Avatar" className='w-[65px] h-[65px] rounded-full' />
								</td>
								<td className='py-3 px-4 text-sm text-gray-700'>{user.password}</td>
								<td className='py-3 px-4 text-sm text-gray-700'>{user.birthday}</td>
								<td className='py-3 px-4 text-sm text-gray-700'>{user.phone}</td>
								<td className='py-3 px-4 text-sm text-gray-700'>{user.address}</td>
								<td className='py-3 px-4 text-sm text-gray-700'>
									<select
										value={user.status}
										onChange={(e) => handleStatusChange(user.id, e.target.value)}
										className='border rounded p-1 text-gray-700'
									>
										<option value="Active">Active</option>
										<option value="Deactive">Deactive</option>
									</select>
								</td>
								<td className='pt-9 px-4 text-sm text-gray-700 flex space-x-4'>
									<button className='text-blue-600 hover:text-blue-500' onClick={() => alert("Edit User")}>
										<Edit size={18} />
									</button>
									<button className='text-red-600 hover:text-red-500' onClick={() => handleDeleteUser(user.id)}>
										<Trash size={18} />
									</button>
									<button className='text-green-600 hover:text-green-500' onClick={() => handleSendEmail(user.id)}>
										<Mail size={18} />
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

export default UsersTable;
