import React from "react";
import Header from "./Header";

function Welcome() {
  return (
    <div>
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
    </div>
  );
}

export default Welcome;
