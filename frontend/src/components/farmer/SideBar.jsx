import React from 'react';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: ''
    };
  }

  handleMenuClick = (menuName) => {
    this.setState({
      activeMenu: this.state.activeMenu === menuName ? '' : menuName
    });
  };

  render() {
    const farmerName = "Anthony Kamau"; // Example farmer name
    const farmerImage = "/avatar.png"; // Image path

    return (
      <div className="panel panel-default sidebar-menu">
        <div className="panel-heading">
          <center>
            <img src={farmerImage} alt="Profile Image" className="img-responsive" />
          </center>
          <br />
          <h3 className="panel-title" align="center">{farmerName}</h3>
        </div>
        <div className="panel-body">
          <ul className="nav-pills nav-stacked nav">
            <li className={this.state.activeMenu === 'dashboard' ? 'active' : ''}>
              <a href="#" onClick={() => this.handleMenuClick('dashboard')}>
                <i className="fa fa-dashboard"></i> Dashboard
              </a>
            </li>
            <li className={this.state.activeMenu === 'farms' ? 'active' : ''}>
              <a onClick={() => this.handleMenuClick('farms')}>
                <i className="fa fa-building"></i> Farms
              </a>
              <ul className={this.state.activeMenu === 'farms' ? 'nav-pills nav-stacked nav' : 'collapse'}>
                <li><a href="#">- Add Farm</a></li>
                <li><a href="#">- My Farms</a></li>
              </ul>
            </li>
            <li className={this.state.activeMenu === 'orders' ? 'active' : ''}>
              <a onClick={() => this.handleMenuClick('orders')}>
                <i className="fa fa-list"></i> Orders
              </a>
              <ul className={this.state.activeMenu === 'orders' ? 'nav-pills nav-stacked nav' : 'collapse'}>
                <li><a href="#">- My Orders</a></li>
                <li><a href="#">- Customer Orders</a></li>
                <li><a href="#">- Recommended For Me</a></li>
              </ul>
            </li>
            <li className={this.state.activeMenu === 'demand_analysis' ? 'active' : ''}>
              <a onClick={() => this.handleMenuClick('demand_analysis')}>
                <i className="fa fa-line-chart"></i> Demand Analysis
              </a>
              <ul className={this.state.activeMenu === 'demand_analysis' ? 'nav-pills nav-stacked nav' : 'collapse'}>
                <li><a href="#">- Most Sought Products</a></li>
                <li><a href="#">- Demand by Month of Year</a></li>
                <li><a href="#">- Demand by Location</a></li>
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
  }
}

export default SideBar;
