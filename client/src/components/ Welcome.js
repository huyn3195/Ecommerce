import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColor } from "../redux/actions/colorActions"; // Adjust the path as necessary
import Header from "./Header";
import Footer from "./Footer";

function Welcome() {
  const dispatch = useDispatch();
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

  return (
    <div
      style={{ backgroundColor: bgColor, transition: "background-color 0.5s" }}
    >
      <Header />
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 font-weight-normal">Lazada Clonee</h1>
          <p className="lead font-weight-normal">
            Shop everything you need with Catpee. Made by Nguyen Cat Huynh
          </p>
          <a className="btn btn-outline-secondary" href="#">
            Coming soon
          </a>
        </div>
        <div className="product-device box-shadow d-none d-md-block"></div>
        <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
      </div>
      <Footer />
    </div>
  );
}

export default Welcome;
