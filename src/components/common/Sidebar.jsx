import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { BiCategory } from "react-icons/bi";

const SIDEBAR_ITEMS = [
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "/",
	},
	{ name: "Product Management", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
	{ name: "User Management", icon: Users, color: "#EC4899", href: "/users" },
	{ name: "Review Management", icon: MdOutlineRateReview, color: "#10B981", href: "/reviews" },
	{ name: "Order Management", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
	{ name: "Brand Management", icon: MdOutlineBrandingWatermark, color: "#3B82F6", href: "/brands" },
	{ name: "Category Management", icon: BiCategory, color: "#8B5CF6", href: "/categories" },
	{ name: "Email Management", icon: MdOutlineMail, color: "#EC4899", href: "/emails" },
	// { name: "Setting", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const location = useLocation();

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"
				}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-gray-800 text-white p-4 flex flex-col border-r border-gray-800'>
				{/* <motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
				
					<Menu size={24} />
				</motion.button> */}

				<div className="flex items-center space-x-[50px]">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
					>

						<Menu size={24} />
					</motion.button>
					{/* <img src={logo} className="w-auto h-8" /> */}
					<Link
						to="/"
						className="text-[30px] font-semibold italic cursor-pointer tracking-wide text-white hover:text-gray-300 transition duration-200"
						style={{ fontFamily: "'Playfair Display', serif" }}
					>
						Tira <span className="text-red-400 font-normal">Shop</span>
					</Link>




				</div>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div
								className={`flex items-center p-4 text-sm font-medium rounded-lg transition-colors mb-2 ${location.pathname === item.href ? "bg-gray-700" : "hover:bg-gray-700"
									}`}
							>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};
export default Sidebar;
