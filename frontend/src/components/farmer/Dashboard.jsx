import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MyOrders from "./MyOrders";
import { useAuth } from "../../hooks/Auth";
import OrderService from "../../services/OrderService";

const FarmerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAssignedOrders = async () => {
      try {
        if (user) {
          const userId = user.id;
          const response = await OrderService.getFarmerOrders(userId);
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching farmer orders:", error);
      }
    };

    fetchAssignedOrders();
  }, [user]);

  const handleChatClick = (order) => {
    setSelectedOrder(order);
    // setShowModal(true);
  };

  return (
    <div id="content">
      <div className="container">
        <div className="col-md-12">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Dashboard</li>
          </ul>
        </div>
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="col-md-9">
          <div className="box">My Farmer Dashboard</div>
          <div className="box">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Quantity Requested</th>
                  <th>Delivery Date</th>
                  <th>Customer</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.product_id.product_name}</td>
                    <td>
                      {order.quantity_requested} {order.product_id.unit}
                    </td>
                    <td>{order.delivery_date}</td>
                    <td>{`${order.customer.first_name} ${order.customer.last_name}`}</td>
                    <td>{`${order.subcounty_id.subcounty_name}, ${order.county_id.county_name}`}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleChatClick(order)}
                      >
                        Chat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
