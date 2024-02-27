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

const FarmService = {
    getCategories: () => api.get('categories/'),
    getProductsByCategory: (categoryId) => api.get(`products/category/${categoryId}`),
    getCounties: () => api.get('counties/'),
    getSubCountiesByCounty: (countyId) => api.get(`subcounties/county/${countyId}`),
    createFarm: (farmData) => api.post('farm/create/', farmData),
    getFarmsByFarmerId: (farmerId) => api.get(`farms/farmer/${farmerId}/`),
};

export default FarmService;
