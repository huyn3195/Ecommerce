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

const ProductAdmin = () => {
  const dispatch = useDispatch();

  // Local state for form inputs
  const [search, setSearch] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
  });

  // Selectors
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

  const addHandler = () => {
    const productData = {
      ...newProduct,
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
    };
    dispatch(addProduct(productData));
    setNewProduct({
      name: "",
      brand: "",
      description: "",
      price: "",
      category: "",
      quantity: "",
    });
  };

  return (
    <div>
      <h1>Admin Product Management</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <table>
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
                  <button onClick={() => updateHandler(product._id)}>
                    Update
                  </button>
                  <button onClick={() => deleteHandler(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <h2>Add New Product</h2>
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
        <button onClick={addHandler}>Add Product</button>
      </div>
    </div>
  );
};

export default ProductAdmin;
