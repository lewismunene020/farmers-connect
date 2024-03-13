import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import OrderService from '../../services/OrderService';
import SideBar from './SideBar';
import { unpackErrors, notify } from "../../hooks/Notification";
import { useAuth } from '../../hooks/Auth';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [pricePerUnit, setPricePerUnit] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    useEffect(() => {
        const fetchAssignedOrders = async () => {
            try {
                if (user) {
                    const userId = user.id;
                    const response = await OrderService.getFarmerOrders(userId);
                    setOrders(response.data);
                }
            } catch (error) {
                console.error('Error fetching farmer orders:', error);
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
                        <li>My Orders</li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <SideBar />
                </div>
                <div className="col-md-9">
                    <div className="box">
                        <h3>My Orders</h3>
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
                                        <td>{order.quantity_requested} {order.product_id.unit}</td>
                                        <td>{order.delivery_date}</td>
                                        <td>{`${order.customer.first_name} ${order.customer.last_name}`}</td>
                                        <td>{`${order.subcounty_id.subcounty_name}, ${order.county_id.county_name}`}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleChatClick(order)}>Chat</button>
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

export default MyOrders;
