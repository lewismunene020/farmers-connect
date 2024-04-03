import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/Auth";
import { Link } from "react-router-dom";

const SideBar = (props) => {
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? "" : menuName);
  };

  const { user } = useAuth();
  const [farmerName, setFarmerName] = useState("");
  const [farmerImage, setFarmerImage] = useState("/avatar.png");

  useEffect(() => {
    if (user) {
      setFarmerName(user.username);
      if (user.profile.image) {
        setFarmerImage(user.profile.image);
      }
    }
  }, [user]);

  return (
    <div className="panel panel-default sidebar-menu">
      <div className="panel-heading">
        <center>
          <img
            src={farmerImage}
            alt="Profile Image"
            className="img-responsive"
          />
        </center>
        <br />
        <h3 className="panel-title" align="center">
          {farmerName}
        </h3>
      </div>
      
      <div className="panel-body">
        <ul className="nav-pills nav-stacked nav">
          <li className={activeMenu === "dashboard" ? "active" : ""}>
            <a href="#" onClick={() => handleMenuClick("dashboard")}>
              <i className="fa fa-dashboard"></i> Dashboard
            </a>
          </li>
          <li className={activeMenu === "farms" ? "active" : ""}>
            <a onClick={() => handleMenuClick("farms")}>
              <i className="fa fa-building"></i> Farms
            </a>
            <ul
              className={
                activeMenu === "farms"
                  ? "nav-pills nav-stacked nav"
                  : "collapse"
              }
            >
              <li>
                <a href="/farmer/addfarm">- Add Farm</a>
              </li>
              <li>
                <a href="/farmer/myfarms">- My Farms</a>
              </li>
            </ul>
          </li>
          <li className={activeMenu === "orders" ? "active" : ""}>
            <a onClick={() => handleMenuClick("orders")}>
              <i className="fa fa-list"></i> Orders
            </a>
            <ul
              className={
                activeMenu === "orders"
                  ? "nav-pills nav-stacked nav"
                  : "collapse"
              }
            >
              <li>
                <a href="/farmer/myorders">- My Orders</a>
              </li>
              <li>
                <a href="/farmer/customerorders">- Customer Orders</a>
              </li>
              <li>
                <a href="/farmer/recommendedorders">- Recommended For Me</a>
              </li>
            </ul>
          </li>
          <li className={activeMenu === "demand_analysis" ? "active" : ""}>
            <a onClick={() => handleMenuClick("demand_analysis")}>
              <i className="fa fa-line-chart"></i> Demand Analysis
            </a>
            <ul
              className={
                activeMenu === "demand_analysis"
                  ? "nav-pills nav-stacked nav"
                  : "collapse"
              }
            >
              <li>
                <Link to="/farmer/most-sought">- Most Sought Products</Link>
              </li>
              <li>
                <Link to="/farmer/orders-with-no-supply">
                  - Orders Without Supply
                </Link>
              </li>
              <li>
                <a href="/farmer/demand-by-month/">- Demand by Month of Year</a>
              </li>
              <li>
                <a href="/farmer/demand-by-location">- Demand by Location</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="logout">
              <i className="fa fa-sign-out"></i> LogOut
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
