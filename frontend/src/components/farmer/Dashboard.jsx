import React from 'react';
import SideBar from './SideBar';

class Dashboard extends React.Component {
  render() {
    return (
      <div id="content">
        <div className="container">
          <div className="col-md-12">
            <ul className="breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                Dashboard
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <div className="box">
              My Farmer Dashboard
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
