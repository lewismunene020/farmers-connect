import React, { useState } from 'react';
import OrderService from '../../services/OrderService';

const SuggestFarms = ({ order }) => {
  // State to store the order data
  const [selectedOrder, setSelectedOrder] = useState(order);

  return (
    <div>
      <h3>Suggested Farms</h3>
      {/* Display order details */}
      <p>Order ID: {selectedOrder.order_id}</p>
      <p>Product Name: {selectedOrder.product_id.product_name}</p>
      <p>Quantity Requested: {selectedOrder.quantity_requested}</p>
      <p>Delivery Date: {selectedOrder.delivery_date}</p>
      {/* Add more order details as needed */}
    </div>
  );
};

export default SuggestFarms;
