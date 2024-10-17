import React, { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Welcome from "./components/ Welcome";
import About from "./components/About";
import Login from "./components/Login";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </Fragment>
  );
}
export default App;
