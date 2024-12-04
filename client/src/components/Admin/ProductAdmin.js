import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} from "../../redux/actions/productAction.js";
import { getCategories } from "../../redux/actions/categoryAction.js";
import Loader from "../../components/Loader.js";
import Message from "../../components/Message.js";
import "../../styles/ProductAdmin.css";
import Navbar from "../Navbar.js";
import { changeColor } from "../../redux/actions/colorActions.js";

import axiosInstance from "../../axiosConfig.js";

const ProductAdmin = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const bgColor = useSelector((state) => state.color.bgColor);
  useEffect(() => {
    const colors = [
      "rgba(255, 99, 132, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 206, 86, 0.8)",
      "rgba(75, 192, 192, 0.8)",
      "rgba(153, 102, 255, 0.8)",
    ];
    let index = 0;

    const interval = setInterval(() => {
      dispatch(changeColor(colors[index % colors.length]));
      index++;
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: "", // Add image field
  });

  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = useSelector((state) => state.categoryList);
  const { success: deleteSuccess } = useSelector(
    (state) => state.productDelete
  );
  const { success: addSuccess } = useSelector((state) => state.productAdd);

  useEffect(() => {
    dispatch(listProducts(search));
    dispatch(getCategories());
  }, [dispatch, search, deleteSuccess, addSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const updateHandler = (id) => {
    const updatedProduct = products.find((p) => p._id === id);
    const name = prompt("Update Name", updatedProduct.name);
    if (name) {
      dispatch(updateProduct(id, { ...updatedProduct, name }));
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Please select an image first");
      return null;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const { data } = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.image; // Returns the path of the uploaded image
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Image upload failed");
      return null;
    }
  };

  const addHandler = async () => {
    // Upload image first if present
    let imagePath = "";
    if (imageFile) {
      imagePath = await handleImageUpload();
      if (!imagePath) return; // Stop if image upload fails
    }

    const productData = {
      ...newProduct,
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
      image: imagePath, // Add image path to product data
    };

    dispatch(addProduct(productData));

    // Reset form
    setNewProduct({
      name: "",
      brand: "",
      description: "",
      price: "",
      category: "",
      quantity: "",
      image: "",
    });
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="product-admin">
      <Navbar />
      <div
        style={{
          backgroundColor: bgColor,
          transition: "background-color 0.5s",
        }}
      ></div>
      <h1 className="title">Admin Product Management</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products Table */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category?.name || "No Category"}</td>
                <td>${product.price}</td>
                <td>
                  <button
                    className="btn update"
                    onClick={() => updateHandler(product._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => deleteHandler(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Product Form */}
      <div className="add-product-form">
        <h2>Add New Product</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
          />
          {/* Image Upload Input */}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="image-upload"
          />
          {imageFile && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}
          {loadingCategories ? (
            <Loader />
          ) : errorCategories ? (
            <Message variant="danger">{errorCategories}</Message>
          ) : (
            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <button className="btn add" onClick={addHandler}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductAdmin;
