import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/Auth";

const SideBar = (props) => {
  // const customerName = "John Doe";
  // const customerImage = "/avatar.png";
  const { user } = useAuth();
 
  const [customerName, setCustomerName] = useState("");
  const [customerImage, setCustomerImage] = useState("/avatar.png");

  useEffect(() => {
    if (user) {
      setCustomerName(user.username);
      if (user.profile.image) {
        setCustomerImage(user.profile.image);
      }
    }
  }, [user]);

  return (
    <div className="panel panel-default sidebar-menu">
      <div className="panel-heading">
        <center>
          <img
            src={customerImage}
            alt="Profile Image"
            className="img-responsive"
          />
        </center>
        <br />
        <h3 className="panel-title" align="center">
          {customerName}
        </h3>
      </div>
      <div className="panel-body">
        <ul className="nav-pills nav-stacked nav">
          <li className={props.activeTab === "my_orders" ? "active" : ""}>
            <a href="dashboard">
              <i className="fa fa-list"></i> My Orders
            </a>
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
