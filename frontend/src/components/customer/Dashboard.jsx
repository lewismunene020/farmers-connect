import React from 'react';
import Sidebar from './Sidebar';
import Orders from './Orders';

class CustomerDashboard extends React.Component {
  render() {
    return (
      <div id="content">
        <div className="container">
          <div className="col-md-12">
            <ul className="breadcrumb">
              <li>
                <a href="../index.php">Home</a>
              </li>
              <li>
                My Orders
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <Sidebar />
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

export default CustomerDashboard;
