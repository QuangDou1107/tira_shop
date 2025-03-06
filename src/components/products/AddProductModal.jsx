// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { X } from "lucide-react";
// import { showToast } from "../ToastProvider";

// const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
//   const [productData, setProductData] = useState({ name: "", description: "", price: "", inventory: "", category: "", brand: "" });
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);

//   // Khi modal được mở, reset form và lấy dữ liệu từ API
//   useEffect(() => {
//     if (!isOpen) {
//       setProductData({ name: "", description: "", price: "", inventory: "", category: "", brand: "" });
//     }
//   }, [isOpen]);

//   // Fetch categories và brands khi modal được mở
//   useEffect(() => {
//     const fetchCategoriesAndBrands = async () => {
//       try {
//         // Fetch categories và brands từ API
//         const [categoriesResponse, brandsResponse] = await Promise.all([
//           axios.get("http://localhost:8080/tirashop/categories"),
//           axios.get("http://localhost:8080/tirashop/brands"),
//         ]);

//         setCategories(categoriesResponse.data.data); // assuming response structure
//         setBrands(brandsResponse.data.data); // assuming response structure
//       } catch (err) {
//         console.error("Error fetching categories or brands:", err);
//         showToast("Failed to load categories or brands.", "error");
//       }
//     };

//     fetchCategoriesAndBrands();
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     setProductData({ ...productData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Lấy danh sách sản phẩm để kiểm tra trùng tên
//       const existingProductsResponse = await axios.get("http://localhost:8080/tirashop/product");
//       const existingProducts = existingProductsResponse.data.data.elementList || [];

//       // Kiểm tra nếu tên sản phẩm đã tồn tại
//       if (existingProducts.some(product => product.name.toLowerCase() === productData.name.toLowerCase())) {
//         showToast("Product name already exists!", "error");
//         setLoading(false);
//         return;
//       }

//       // Nếu không trùng, gửi request tạo sản phẩm
//       const response = await axios.post(
//         "http://localhost:8080/tirashop/product/add",
//         productData
//       );

//       if (response.data && response.data.data) {
//         const newProduct = response.data.data;
//         onProductAdded(newProduct);
//         setProductData({ name: "", description: "", price: "", inventory: "", category: "", brand: "" });

//         onClose();
//         setTimeout(() => {
//           showToast("Product added successfully!", "success");
//         }, 300);
//       } else {
//         throw new Error(response.data.message || "Invalid response from server");
//       }
//     } catch (err) {
//       console.error("Error:", err);

//       const errorMessage = err.response?.data?.message || "Failed to add product. Please try again.";
//       showToast(errorMessage, "error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-900">Add New Product</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="block text-gray-700 text-sm font-medium mb-1">
//               Product Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={productData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="block text-gray-700 text-sm font-medium mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={productData.description}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-3">
//             <label className="block text-gray-700 text-sm font-medium mb-1">
//               Price
//             </label>
//             <input
//               type="number"
//               name="price"
//               value={productData.price}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="block text-gray-700 text-sm font-medium mb-1">
//               Inventory
//             </label>
//             <input
//               type="number"
//               name="inventory"
//               value={productData.inventory}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="block text-gray-700 text-sm font-medium mb-1">
//               Category
//             </label>
//             <select
//               name="category"
//               value={productData.categoryName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-3">
//             <label className="block text-gray-700 text-sm font-medium mb-1">
//               Brand
//             </label>
//             <select
//               name="brand"
//               value={productData.brandName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Brand</option>
//               {brands.map((brand) => (
//                 <option key={brand.id} value={brand.id}>
//                   {brand.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex justify-end gap-2 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               {loading ? "Adding..." : "Add Product"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProductModal;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { showToast } from "../ToastProvider";
import { X } from "lucide-react"; // Add this import


const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    inventory: "",
    category: "",
    brand: "",
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Khi modal được mở, reset form và lấy dữ liệu từ API
  useEffect(() => {
    if (!isOpen) {
      setProductData({
        name: "",
        description: "",
        price: "",
        inventory: "",
        category: "",
        brand: "",
      });
    }
  }, [isOpen]);

  // Fetch categories và brands khi modal được mở
  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        // Fetch categories and brands from API
        const [categoriesResponse, brandsResponse] = await Promise.all([
          axios.get("http://localhost:8080/tirashop/category"),
          axios.get("http://localhost:8080/tirashop/brand"),
        ]);
  
        // Check if the response data is valid and is an array
        if (Array.isArray(categoriesResponse.data.data)) {
          setCategories(categoriesResponse.data.data); // assuming response structure
        } else {
          setCategories([]); // Set an empty array if data is not valid
        }
  
        if (Array.isArray(brandsResponse.data.data)) {
          setBrands(brandsResponse.data.data); // assuming response structure
        } else {
          setBrands([]); // Set an empty array if data is not valid
        }
      } catch (err) {
        console.error("Error fetching categories or brands:", err);
        showToast("Failed to load categories or brands.", "error");
      }
    };
  
    fetchCategoriesAndBrands();
  }, [isOpen]);
  
  
  

  if (!isOpen) return null;

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Lấy danh sách sản phẩm để kiểm tra trùng tên
      const existingProductsResponse = await axios.get("http://localhost:8080/tirashop/product");
      const existingProducts = existingProductsResponse.data.data.elementList || [];

      // Kiểm tra nếu tên sản phẩm đã tồn tại
      if (existingProducts.some((product) => product.name.toLowerCase() === productData.name.toLowerCase())) {
        showToast("Product name already exists!", "error");
        setLoading(false);
        return;
      }

      // Nếu không trùng, gửi request tạo sản phẩm
      const response = await axios.post("http://localhost:8080/tirashop/product/add", productData);

      if (response.data && response.data.data) {
        const newProduct = response.data.data;
        onProductAdded(newProduct);
        setProductData({
          name: "",
          description: "",
          price: "",
          inventory: "",
          category: "",
          brand: "",
        });

        onClose();
        setTimeout(() => {
          showToast("Product added successfully!", "success");
        }, 300);
      } else {
        throw new Error(response.data.message || "Invalid response from server");
      }
    } catch (err) {
      console.error("Error:", err);

      const errorMessage = err.response?.data?.message || "Failed to add product. Please try again.";
      showToast(errorMessage, "error");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1">Inventory</label>
            <input
              type="number"
              name="inventory"
              value={productData.inventory}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1">Brand</label>
            <select
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
