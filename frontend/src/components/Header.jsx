import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <div id="top" className="top">
        <div className="container">
          <img src="/logo.jpg" id="logo_image" alt="eCom-Store Logo"></img>
          <div id="web-title">farmers connect</div>
          <div className="col-md-6 offer">
            {user ? (
              <Link to="/dashboard" className="btn btn-success btn-sm">
                Welcome {user.username}
              </Link>
            ) : (
              <Link to="/dashboard" className="btn btn-success btn-sm">
                Karibu: Guest
              </Link>
            )}
          </div>
          <div className="col-md-6">
            <ul className="menu">
              {!user ? (
                <>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    {user && user.is_farmer ? (
                      <Link to="/farmer/dashboard">My Account</Link>
                    ) : (
                      <Link to="/customer/dashboard">My Account</Link>
                    )}
                  </li>
                  <li
                    className="text-white"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div id="navbar" className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a href="/" className="navbar-brand home">
              {/* <img src="images/logo.jpeg" alt="eCom-Store Logo" className="hidden-xs">
                <img src="images/logo.jpeg" alt="eCom-Store Logo Mobile" className="visible-xs"> */}
            </a>
            <button
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navigation"
            >
              <span className="sr-only">Toggle Navigation</span>
              <i className="fa fa-align-justify"></i>
            </button>
            <button
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#search"
            >
              <span className="sr-only">Toggle Search</span>
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="navbar-collapse collapse" id="navigation">
            <div className="padding-nav">
              <ul className="nav navbar-nav left">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/farms">Farms</Link>
                </li>
                <li>
                  {user && user.is_farmer ? (
                    <Link to="/farmer/dashboard">My Account</Link>
                  ) : (
                    <Link to="/customer/dashboard">My Account</Link>
                  )}
                </li>

                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            {user && !user.is_farmer && (
               <Link
              to="/customer/createorder"
              className="btn navbar-btn btn-primary right"
            >
              <span>Create Order</span>
            </Link>
            )}
           
            <div className="navbar-collapse collapse right">
              <button
                className="btn btn-primary navbar-btn"
                type="button"
                data-toggle="collapse"
                data-target="#search"
              >
                <span className="sr-only">Toggle Search</span>
                <i className="fa fa-search"></i>
              </button>
            </div>
            <div className="collapse clearfix" id="search">
              <form method="get" action="results.php" className="navbar-form">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    name="user_query"
                    required
                  />
                  <span className="input-group-btn">
                    <button
                      type="submit"
                      name="search"
                      value="Search"
                      className="btn btn-primary"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
