import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js";
function Home() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo); // Retrieve user info from Redux store

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}

export default Home;
