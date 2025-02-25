import { motion } from "framer-motion";
import BrandsTable from "../components/brands/BrandsTable";
import Header from "../components/common/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BrandPage = () => {
    return (
        <motion.div 
            className='flex-1 overflow-auto relative z-10 bg-gray-100'
            initial={{ opacity: 0 }} // Bắt đầu với opacity = 0
            animate={{ opacity: 1 }} // Chuyển dần thành opacity = 1
            transition={{ duration: 0.8 }} // Hiệu ứng kéo dài 0.8 giây
        >
            {/* Đảm bảo ToastContainer luôn hiển thị */}
            <ToastContainer position="top-right" autoClose={3000} />
            
            <motion.div 
                initial={{ y: -20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Header title={"Brand Management"} />
            </motion.div>

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <BrandsTable />
                </motion.div>
            </main>
        </motion.div>
    );
};

export default BrandPage;
