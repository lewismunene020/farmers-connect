import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: BASE_URL,
});

// Set the Authorization header for all requests
api.interceptors.request.use(config => {
    const token = localStorage.getItem("user.token");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

const OrderService = {
    getCategories: () => api.get('categories/'),
    getProductsByCategory: (categoryId) => api.get(`products/category/${categoryId}`),
    getCounties: () => api.get('counties/'),
    getSubCountiesByCounty: (countyId) => api.get(`subcounties/county/${countyId}`),
    // Orders
    getOrderById: (orderId) => api.get(`order/${orderId}/`), // Get order by ID
    getCustomerOrders: (customerId) => api.get(`orders/customer/${customerId}/`), // Get orders by customer ID
    getFarmerOrders: (farmerId) => api.get(`orders/farmer/${farmerId}/`), // Get orders by farmer ID
    updateOrder: (orderId, orderData) => api.put(`order/${orderId}/update/`, orderData), // Update order by ID
    deleteOrder: (orderId) => api.delete(`order/${orderId}/delete/`), // Delete order by ID
    createOrder: (orderData) => api.post('order/create/', orderData), // Create new order
    getAllOrders: () => api.get('orders/'), // Get all orders
    getUnassignedOrders: () => api.get('orders/?status=unassigned'), // Get unassigned orders
    // Bids
    getBidById: (bidId) => api.get(`bid/${bidId}/`), // Get bid by ID
    updateBid: (bidId, bidData) => api.put(`bid/${bidId}/update/`, bidData), // Update bid by ID
    deleteBid: (bidId) => api.delete(`bid/${bidId}/delete/`), // Delete bid by ID
    createBid: (bidData) => api.post('bid/create/', bidData), // Create new bid
    getBids: () => api.get('bids/'), // Get all bids
};

export default OrderService;
