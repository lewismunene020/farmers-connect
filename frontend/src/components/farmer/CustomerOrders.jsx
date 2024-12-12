import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import OrderService from '../../services/OrderService';
import SideBar from './SideBar';
import { unpackErrors, notify } from "../../hooks/Notification";
import { useAuth } from '../../hooks/Auth';

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [pricePerUnit, setPricePerUnit] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    useEffect(() => {
        const fetchUnassignedOrders = async () => {
            try {
                if (user) {
                    const userId = user.id;
                    const response = await OrderService.getUnassignedOrders(userId);
                    setOrders(response.data);
                }
            } catch (error) {
                console.error('Error fetching unassigned orders:', error);
            }
        };

        fetchUnassignedOrders();
    }, [user]);

    const handleBidClick = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleBidSubmit = (e) => {
        e.preventDefault();
        if (!selectedOrder) {
            console.error('No order selected.');
            return;
        }

        // Check if required fields are filled out
        if (!pricePerUnit || !deliveryDate) {
            console.error('Please fill out all required fields.');
            notify("error", "Please fill out all required fields.");
            return;
        }

        const bidData = {
            order: selectedOrder.order_id,
            price_per_unit: pricePerUnit,
            delivery_date: deliveryDate
        };
        console.log(bidData);
        OrderService.createBid(bidData)
            .then(() => {
                console.log("Bid submitted successfully");
                notify("success", "Bid submitted successfully");
                setShowModal(false);
            })
            .catch((error) => {
                console.error("Error creating bid:", error);
                notify("error", unpackErrors(error.response.data));
                setShowModal(false);
            });
    };

    return (
        <div id="content">
            <div className="container">
                <div className="col-md-12">
                    <ul className="breadcrumb">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>Customer Orders</li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <SideBar />
                </div>
                <div className="col-md-9">
                    <div className="box">
                        <h3>All Customer Orders</h3>
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
                                            <button className="btn btn-primary" onClick={() => handleBidClick(order)}>Bid</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for submitting bid */}
            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
                <h2>Submit Bid</h2>
                <form>
                    <div className="form-group">
                        <label>Price per {selectedOrder && selectedOrder.product_id.unit}:</label>
                        <input type="text" className="form-control" required value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Delivery Date:</label>
                        <input type="date" className="form-control" required value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleBidSubmit}>Submit Bid</button>
                </form>
            </Modal>
        </div>
    );
};

export default CustomerOrders;
