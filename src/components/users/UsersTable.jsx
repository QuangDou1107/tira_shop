import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const userData = [
	{ id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active" },
	{ id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Customer", status: "Inactive" },
	{ id: 4, name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "Active" },
	{ id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Moderator", status: "Active" },
];

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(userData);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
	};

	return (
		<motion.div
			className='bg-white shadow-lg rounded-xl p-6 border border-gray-300'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-900'>Users</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search users...'
						className='bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-500' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-300'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
								Role
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
								Status
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-300'>
						{filteredUsers.map((user) => (
							<motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
								<td className='px-6 py-4 whitespace-nowrap text-gray-900'>{user.name}</td>
								<td className='px-6 py-4 whitespace-nowrap text-gray-700'>{user.email}</td>
								<td className='px-6 py-4 whitespace-nowrap text-gray-700'>{user.role}</td>
								<td className='px-6 py-4 whitespace-nowrap text-gray-700'>{user.status}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
									<button className='text-indigo-600 hover:text-indigo-500 mr-2'>Edit</button>
									<button className='text-red-600 hover:text-red-500'>Delete</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default UsersTable;