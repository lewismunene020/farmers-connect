import React from 'react';

class SideBar extends React.Component {
  render() {
    // Assuming you have access to customer name and image via props or state
    const customerName = "John Doe"; // Example customer name
    const customerImage = "/avatar.png"; // Example image path

    return (
      <div className="panel panel-default sidebar-menu">
        <div className="panel-heading">
          <center>
            <img src={customerImage} alt="Profile Image" className="img-responsive" />
          </center>
          <br />
          <h3 className="panel-title" align="center">{customerName}</h3>
        </div>
        <div className="panel-body">
          <ul className="nav-pills nav-stacked nav">
            <li className={this.props.activeTab === 'my_orders' ? 'active' : ''}>
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
  }
}

export default SideBar;
