import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  editUser,
  deleteUser,
  searchUser,
} from "../../redux/actions/userAction.js";
import "../../styles/UserAdmin.css";
import { changeColor } from "../../redux/actions/colorActions.js";
import Navbar from "../Navbar.js";

function UserAdmin() {
  const dispatch = useDispatch();
  const bgColor = useSelector((state) => state.color.bgColor); // Access bgColor from Redux state
  const [userId, setUserId] = useState("");

  // Set dynamic background colors
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
      dispatch(changeColor(colors[index % colors.length])); // Dispatch color change
      index++;
    }, 2000); // Change color every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [dispatch]);

  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    isAdmin: false,
  });

  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleSearchUser = () => {
    if (userId) {
      dispatch(searchUser(userId));
    }
  };

  const handleEditUser = () => {
    if (user) {
      dispatch(editUser(user._id, newUserData));
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="user-admin" style={{ backgroundColor: bgColor }}>
      <Navbar /> {/* Apply dynamic background */}
      <h1 className="user-admin__header">User Administration</h1>
      {loading && <p className="user-admin__loading">Loading...</p>}
      {error && <p className="user-admin__error">{error}</p>}
      {/* Search User Section */}
      <div className="user-admin__section">
        <h2>Search User</h2>
        <div className="user-admin__form">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={handleSearchUser}>Search</button>
        </div>

        {user && (
          <div className="user-admin__profile">
            <h3>User Profile</h3>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
            </p>
            <button
              className="user-admin__delete-btn"
              onClick={() => handleDeleteUser(user._id)}
            >
              Delete User
            </button>
          </div>
        )}
      </div>
      {/* Edit User Section */}
      <div className="user-admin__section">
        <h2>Edit User</h2>
        <div className="user-admin__form">
          <input
            type="text"
            name="username"
            placeholder="New Username"
            value={newUserData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="New Email"
            value={newUserData.email}
            onChange={handleChange}
          />
          <div className="user-admin__checkbox">
            <label>
              <input
                type="checkbox"
                name="isAdmin"
                checked={newUserData.isAdmin}
                onChange={() =>
                  setNewUserData((prevData) => ({
                    ...prevData,
                    isAdmin: !prevData.isAdmin,
                  }))
                }
              />
              Admin
            </label>
          </div>
          <button onClick={handleEditUser}>Update User</button>
        </div>
      </div>
    </div>
  );
}

export default UserAdmin;
