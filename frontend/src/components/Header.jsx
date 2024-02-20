import React from "react";

const Header = () => {
  return (
    <>
      <div id="top" className="top">
        <div className="container">
          <div className="col-md-6 offer">
            <a href="#" className="btn btn-success btn-sm">
              Welcome: Guest
            </a>
            <a href="checkout.php"> Items In Your Cart | Total Price: </a>
          </div>
          <div className="col-md-6">
            <ul className="menu">
              <li>
                <a href="customer_register.php">Register</a>
              </li>
              <li>
                <a href="checkout.php">My Account</a>
              </li>
              <li>
                <a href="cart.php">Go To Cart</a>
              </li>
              <li>
                <a href="checkout.php">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="navbar" className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a href="index.php" className="navbar-brand home">
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
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/shop">Shop</a>
                </li>
                <li>
                  <a href="/account">My Account</a>
                </li>
                <li>
                  <a href="/cart">Shopping Cart</a>
                </li>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
              </ul>
            </div>
            <a href="/cart" className="btn navbar-btn btn-primary right">
              <i className="fa fa-shopping-cart"></i>
              <span>Items In Your Cart</span>
            </a>
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