import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../../redux/actions/categoryAction.js";
import "../../styles/CategoryAdmin.css";
import { changeColor } from "../../redux/actions/colorActions.js";

function CategoryAdmin() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

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
  const {
    categories,
    loading: loadingCategories,
    error: listError,
  } = useSelector((state) => state.categoryList);

  const { success: createSuccess, error: createError } = useSelector(
    (state) => state.categoryCreate
  );

  const { success: updateSuccess, error: updateError } = useSelector(
    (state) => state.categoryUpdate
  );

  const { success: deleteSuccess, error: deleteError } = useSelector(
    (state) => state.categoryDelete
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, createSuccess, updateSuccess, deleteSuccess]);

  const handleCreateOrUpdate = (e) => {
    e.preventDefault();
    if (editingCategory) {
      dispatch(updateCategory(editingCategory._id, { name }));
    } else {
      dispatch(createCategory({ name }));
    }
    setName("");
    setEditingCategory(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setName(category.name);
  };

  return (
    <div className="category-admin">
      <div
        style={{
          backgroundColor: bgColor,
          transition: "background-color 0.5s",
        }}
      ></div>
      <h1 className="heading">Category Management</h1>

      {/* Error and success messages */}
      <div className="alerts">
        {createError && <p className="alert error">Error: {createError}</p>}
        {updateError && <p className="alert error">Error: {updateError}</p>}
        {deleteError && <p className="alert error">Error: {deleteError}</p>}
        {listError && <p className="alert error">Error: {listError}</p>}
      </div>

      {/* Form for creating or updating a category */}
      <form onSubmit={handleCreateOrUpdate} className="form">
        <div className="form-group">
          <label htmlFor="category-name">Category Name:</label>
          <input
            type="text"
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          {editingCategory ? "Update Category" : "Create Category"}
        </button>
      </form>

      {/* Category list */}
      <h2 className="subheading">Existing Categories</h2>
      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : listError ? (
        <p className="alert error">{listError}</p>
      ) : categories.length === 0 ? (
        <p className="alert info">No categories found.</p>
      ) : (
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category._id} className="category-item">
              <span>{category.name}</span>
              <div className="actions">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(category)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryAdmin;
