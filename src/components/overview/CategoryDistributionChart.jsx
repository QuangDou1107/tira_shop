import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const categoryData = [
	{ name: "Electronics", value: 4500 },
	{ name: "Clothing", value: 3200 },
	{ name: "Home & Garden", value: 2800 },
	{ name: "Books", value: 2100 },
	{ name: "Sports & Outdoors", value: 1900 },
];

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = () => {
	return (
		<motion.div
			className='bg-white shadow-lg rounded-xl p-6 border border-gray-300'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-900'>Category Distribution</h2>
			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<PieChart>
						<Pie
							data={categoryData}
							cx={"50%"}
							cy={"50%"}
							labelLine={false}
							outerRadius={80}
							fill='#8884d8'
							dataKey='value'
							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{categoryData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(255, 255, 255, 0.9)",
								borderColor: "#D1D5DB",
							}}
							itemStyle={{ color: "#111827" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default CategoryDistributionChart;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#FF6384", "#FFCE56"];

// const CategoryDistributionChart = () => {
//     const [categoryData, setCategoryData] = useState([]);

//     useEffect(() => {
//         fetchCategoryData();
//     }, []);

//     const fetchCategoryData = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/tirashop/category");
//             const categories = response.data.data.elementList; 

//             // Định dạng dữ liệu để sử dụng trong PieChart
//             const formattedData = categories.map(category => ({
//                 name: category.name,
//                 value: 1,  // Vì API của bạn không có số lượng sản phẩm theo danh mục, nên mặc định value = 1
//             }));

//             setCategoryData(formattedData);
//         } catch (error) {
//             console.error("Error fetching category data:", error);
//         }
//     };

//     return (
//         <motion.div
//             className='bg-white shadow-lg rounded-xl p-6 border border-gray-300'
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//         >
//             <h2 className='text-lg font-medium mb-4 text-gray-900'>Category Distribution</h2>
//             <div className='h-80'>
//                 <ResponsiveContainer width={"100%"} height={"100%"}>
//                     <PieChart>
//                         <Pie
//                             data={categoryData}
//                             cx={"50%"}
//                             cy={"50%"}
//                             labelLine={false}
//                             outerRadius={90}
//                             fill='#8884d8'
//                             dataKey='value'
//                             label={({ name }) => `${name}`}
//                         >
//                             {categoryData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                         </Pie>
//                         <Tooltip
//                             contentStyle={{
//                                 backgroundColor: "rgba(255, 255, 255, 0.9)",
//                                 borderColor: "#D1D5DB",
//                             }}
//                             itemStyle={{ color: "#111827" }}
//                         />
//                         <Legend />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>
//         </motion.div>
//     );
// };

// export default CategoryDistributionChart;
