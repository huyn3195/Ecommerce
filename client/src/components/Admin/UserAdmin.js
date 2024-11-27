import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  editUser,
  deleteUser,
  searchUser,
} from "../../redux/actions/userAction.js";

function UserAdmin() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(""); // Manage user ID input
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    isAdmin: false,
  }); // Manage user data for edit

  // Get user data from Redux state
  const { user, users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    // If a user is logged in, fetch their profile
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
    <div>
      <h2>User Administration</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h3>Search User</h3>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleSearchUser}>Search</button>

        {user && (
          <div>
            <h4>User Profile</h4>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Admin: {user.isAdmin ? "Yes" : "No"}</p>
          </div>
        )}
      </div>

      <div>
        <h3>Edit User</h3>
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
        <label>
          Admin:
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
        </label>
        <button onClick={handleEditUser}>Update User</button>
      </div>
    </div>
  );
}

export default UserAdmin;
