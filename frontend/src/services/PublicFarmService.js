import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: BASE_URL,
});

const PublicFarmService = {
    getCategories: () => api.get('categories/'),
    getProductsByCategory: (categoryId) => api.get(`products/category/${categoryId}`),
    getCounties: () => api.get('counties/'),
    getSubCountiesByCounty: (countyId) => api.get(`subcounties/county/${countyId}`),
    getFarmsByFarmerId: (farmerId) => api.get(`farms/farmer/${farmerId}/`),
    getFarmsByProductId: (productId) => api.get(`farms/?product_id=${productId}`),
    findFarms: (params) => api.get('farms/', { params }),
    getAllFarms: () => api.get('farms/'),
};

export default PublicFarmService;
