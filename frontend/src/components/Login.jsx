import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../hooks/Notification";
import { useAuth } from "../hooks/Auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const passwordRef = useRef(null);

  const { user, login } = useAuth();

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    let data = await login(email, password);
    if (data) {
      console.log(data);
      notify("success", "Login successful");
      if (data.is_farmer) {
        navigate("/farmer/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <div className="box container">
      <div className="box-header">
        <center>
          <h1>Login</h1>
          <p className="text-muted">Login if you already have an account</p>
        </center>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              name="email"
              type="text"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Password:
              <span
                onClick={() => {
                  if (passwordRef.current.type === "password") {
                    passwordRef.current.type = "text";
                  } else {
                    passwordRef.current.type = "password";
                  }
                }}
                className="bg-primary text-white px-1 rounded"
              >
                Show Password
              </span>
            </label>
            <input
              ref={passwordRef}
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              {loading ? (
                <span>
                  <i className="fa fa-spinner fa-pulse"></i> Loading......
                </span>
              ) : (
                <span>
                  <i className="fa fa-sign-in"></i> Login
                </span>
              )}
            </button>
          </div>
        </form>
        <center>
          <Link to="/register">
            <h3>Don't have an account? Register here</h3>
          </Link>
        </center>
      </div>
    </div>
  );
}

export default Login;
