import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const bgColor = useSelector((state) => state.color.bgColor);
  const userInfo = useSelector((state) => state.auth.userInfo); // Get userInfo from Redux store

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: bgColor }}
    >
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-primary my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        {userInfo && userInfo.isAdmin && (
          <Link to="/admin" className="btn btn-outline-secondary ml-2">
            Admin Dashboard
          </Link>
        )}
        <Link to="/products" className="btn btn-outline-secondary ml-2">
          Product List
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
