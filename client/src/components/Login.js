import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authAction.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.auth);
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(email, password));
  }
  if (userInfo) {
    return <div> You are logged in as {userInfo.username}</div>;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}
export default Login;
