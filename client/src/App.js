import React, { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Welcome from "./components/ Welcome";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
        </Routes>
      </Router>
    </Fragment>
  );
}
export default App;
