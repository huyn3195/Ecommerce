import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js";

function Admin() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  if (!userInfo || !userInfo.isAdmin) {
    return null;
  }

  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <Navbar />

      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <div className="text-center mb-4">
          <h1 className="display-4">Admin Dashboard</h1>
          <p className="lead">Manage all aspects of your platform</p>
        </div>

        <div className="d-flex flex-column gap-3">
          <button className="btn btn-success btn-lg rounded-pill shadow-sm">
            User Management
          </button>
          <button className="btn btn-primary btn-lg rounded-pill shadow-sm">
            Product Management
          </button>
          <button className="btn btn-warning btn-lg rounded-pill shadow-sm">
            Order Management
          </button>
          <button className="btn btn-info btn-lg rounded-pill shadow-sm">
            Category Management
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
