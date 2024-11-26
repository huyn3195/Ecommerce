import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import { changeColor } from "../redux/actions/colorActions";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For confirming password
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.auth);
  const bgColor = useSelector((state) => state.color.bgColor); // Getting the bgColor from Redux state

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
  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    dispatch(register(username, email, password));
  }
  function handleLoginRedirect() {
    navigate("/login");
  }

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example1cg">
                        Username
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Repeat your password
                      </label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example3cg"
                      >
                        I agree all statements in{" "}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <a
                        href="#!"
                        className="fw-bold text-body"
                        onClick={handleLoginRedirect}
                      >
                        <u>Login here</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
