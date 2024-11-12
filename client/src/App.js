import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkTokenExpiration, logout } from "./redux/actions/authAction";
import Welcome from "./components/ Welcome";
import About from "./components/About.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Home from "./components/Home.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check token expiration on app load
    dispatch(checkTokenExpiration());

    const tokenExpirationTime = localStorage.getItem("tokenExpirationTime");
    if (tokenExpirationTime) {
      const remainingTime = Date.parse(tokenExpirationTime) - Date.now();

      if (remainingTime > 0) {
        // Set a timeout to log the user out when the token expires
        const logoutTimer = setTimeout(() => {
          dispatch(logout());
        }, remainingTime);

        return () => clearTimeout(logoutTimer);
      } else {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
