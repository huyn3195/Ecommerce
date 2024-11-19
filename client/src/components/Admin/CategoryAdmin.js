import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../../redux/actions/categoryAction.js";

function CategoryAdmin() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
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
    setName(category.name); // Populate the form with the category's name
  };
  return (
    <div className="category-admin">
      <h1>Category Management</h1>

      {/* Error and success messages */}
      {createError && <p className="error">{createError}</p>}
      {updateError && <p className="error">{updateError}</p>}
      {deleteError && <p className="error">{deleteError}</p>}
      {listError && <p className="error">{listError}</p>}

      {/* Form for creating or updating a category */}
      <form onSubmit={handleCreateOrUpdate}>
        <div>
          <label htmlFor="category-name">Category Name:</label>
          <input
            type="text"
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {editingCategory ? "Update Category" : "Create Category"}
        </button>
      </form>

      {/* Category list */}
      <h2>Existing Categories</h2>
      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : listError ? (
        <p className="error">{listError}</p>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category._id}>
              {category.name}{" "}
              <button onClick={() => handleEdit(category)}>Edit</button>
              <button onClick={() => handleDelete(category._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryAdmin;
