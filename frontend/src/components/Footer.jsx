import React, { useState } from "react";
import { useAuth } from "../hooks/Auth";
import { Link } from "react-router-dom";

function Footer() {
  const { user } = useAuth();
  return (
    <>
      <div id="footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <h4>Pages</h4>
              <ul>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  {user ? (
                    user.is_farmer ? (
                      <Link to="/farmer/dashboard"> Dashboard</Link>
                    ) : (
                      <Link to="/customer/dashboard"> Dashboard</Link>
                    )
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </li>
              </ul>
              <hr />
              <h4>User Section</h4>
              <ul>
                <li>
                  {user ? (
                    <Link to="/logout">Logout</Link>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
              <hr className="hidden-md hidden-lg hidden-sm" />
            </div>
            <div className="col-sm-6 col-md-3">
              <h4>Top Product Categories</h4>
              <ul>
                {/* You need to fetch product categories from an API */}
                {/* Replace the static data with dynamic data fetched from the server */}
                <li>
                  <a href="#">Category 1</a>
                </li>
                <li>
                  <a href="#">Category 2</a>
                </li>
              </ul>
              <hr className="hidden-md hidden-lg" />
            </div>
            <div className="col-sm-6 col-md-3">
              <h4>Find Us:</h4>
              <p>
                <strong>Farmers Connect Farmers</strong>
                <br />
                Kenyatta Road,
                <br />
                Juja,
                <br />
                Kiambu,
                <br />
                Kenya.
              </p>
              <a href="contact.php">Contact Page</a>
              <hr className="hidden-md hidden-lg" />
            </div>
            <div className="col-sm-6 col-md-3">
              <h4>Keep In Touch</h4>
              <p className="social">
                <a href="#" className="fa-brands fa-facebook"></a>
                <a href="#" className="fas fa-twitter"></a>
                <a href="#" className="fa-brands fa-instagram"></a>
                <a href="#" className="fa-brands fa-envelope"></a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="copyright">
        <div className="container">
          <div className="col-md-6">
            <p className="pull-left">
              &copy; {new Date().getFullYear()} Farmers Connect Farmers. All
              Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
