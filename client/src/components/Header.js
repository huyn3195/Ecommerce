import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [bgColor, setBgColor] = useState("transparent");

  // Define colors for the animation
  const colors = [
    "rgba(255, 255, 255, 0.9)",
    "rgba(200, 200, 255, 0.9)",
    "rgba(150, 255, 150, 0.9)",
    "rgba(255, 200, 200, 0.9)",
  ];

  // State to keep track of the current color index
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 3000); // Change color every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setBgColor(colors[colorIndex]);
  }, [colorIndex]);

  return (
    <nav
      className="site-header sticky-top py-1"
      style={{ backgroundColor: bgColor, transition: "background-color 0.5s" }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between">
        <Link className="py-2" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="d-block mx-auto"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
            <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
            <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
            <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
            <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
            <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
          </svg>
        </Link>

        <Link className="py-2 d-none d-md-inline-block" to="/about">
          About us
        </Link>
        <Link className="py-2 d-none d-md-inline-block" to="/login">
          Login
        </Link>
        <Link className="py-2 d-none d-md-inline-block" to="/register">
          Join us
        </Link>
      </div>
    </nav>
  );
}

export default Header;
