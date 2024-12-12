import React from "react";
import SideBar from "./SideBar"; // Assuming SideBar.js is in the same directory
import Orders from "./Orders"; // Assuming Orders.js is in the same directory

class Dashboard extends React.Component {
  render() {
    return (
      <div id="content">
        <div className="container">
          <div className="col-md-12">
            <ul className="breadcrumb">
              <li>
                <a href="..//">Home</a>
              </li>
              <li>My Orders</li>
            </ul>
          </div>
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <div className="box">
              <Orders />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
