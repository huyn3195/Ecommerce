import { API_URL } from "../../constant.js";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const res = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      const tokenExpirationTime = data.expiresIn; // ISO string from the server
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("tokenExpirationTime", tokenExpirationTime); // Store token expiration ISO string
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: LOGOUT });
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const res = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      const tokenExpirationTime = data.expiresIn; // ISO string from the server
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("tokenExpirationTime", tokenExpirationTime); // Store token expiration ISO string
    } else {
      throw new Error(data.message || "Registration failed");
    }
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

export const checkTokenExpiration = () => (dispatch) => {
  const tokenExpirationTime = localStorage.getItem("tokenExpirationTime");

  if (tokenExpirationTime) {
    const isExpired = Date.now() > Date.parse(tokenExpirationTime);

    if (isExpired) {
      console.log("Token expired. Logging out.");
      dispatch(logout());
    } else {
      console.log("Token is still valid.");
    }
  } else {
    console.log("No token expiration time found.");
  }
};
