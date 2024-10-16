import React, { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Welcome from "./components/ Welcome";
import About from "./components/About";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </Router>
    </Fragment>
  );
}
export default App;
