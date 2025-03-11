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
import { X } from "lucide-react";

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    inventory: "",
    categoryId: "",
    brandId: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setProductData({
        name: "",
        description: "",
        price: "",
        inventory: "",
        categoryId: null,
        brandId: null,
        image: null,
      });
      setPreviewImage(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          axios.get("http://localhost:8080/tirashop/category"),
          axios.get("http://localhost:8080/tirashop/brand"),
        ]);


        setCategories(
          Array.isArray(categoriesResponse.data.data.elementList) ? categoriesResponse.data.data.elementList : []
        );
        setBrands(
          Array.isArray(brandsResponse.data.data.elementList) ? brandsResponse.data.data.elementList : []
        );

      } catch (err) {
        console.error("Error fetching categories or brands:", err);
        showToast("Failed to load categories or brands.", "error");
      }
    };

    if (isOpen) fetchCategoriesAndBrands();
  }, [isOpen]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({ ...productData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // Đảm bảo khai báo biến trước khi sử dụng
        const productData2 = {
            name: productData.name,
            description: productData.description,
            price: parseFloat(productData.price),
            originalPrice: parseFloat(productData.originalPrice),
            inventory: parseInt(productData.inventory),
            categoryId: Number(productData.categoryId),
            brandId: Number(productData.brandId),
        };

        console.log("🛠️ Sending Product Data:", productData2);

        // Gửi request để tạo sản phẩm
        const productResponse = await axios.post(
            "http://localhost:8080/tirashop/product/add",
            productData2,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );

        const newProductId = productResponse.data.data.id;
        console.log("🎉 Product Created:", newProductId);

        // Nếu có ảnh, upload ảnh sau khi tạo sản phẩm thành công
        if (productData.image) {
            const formData = new FormData();
            formData.append("image", productData.image);

            console.log("📸 Uploading Image...");

            await axios.post(
                `http://localhost:8080/tirashop/product/${newProductId}/images/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log("✅ Image Uploaded Successfully");
        }

        showToast("Product added successfully!", "success");
        onClose();
    } catch (err) {
        console.error("❌ Error:", err.response?.data || err);
        showToast("Failed to add product.", "error");
    }

    setLoading(false);
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium">Product Name</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium">Description</label>
            <textarea name="description" value={productData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium">Price</label>
            <input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium">Original Price</label>
            <input type="number" name="originalPrice" value={productData.originalPrice} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium">Inventory</label>
            <input type="number" name="inventory" value={productData.inventory} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium">Category</label>
            <select name="categoryId" value={productData.categoryId} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium">Brand</label>
            <select name="brandId" value={productData.brandId} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required>
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium">Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-3 py-2 border rounded-lg" />
            {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-lg" />}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded-lg">{loading ? "Adding..." : "Add Product"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;