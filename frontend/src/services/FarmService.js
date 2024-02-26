import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

const FarmService = {
    getCategories: () => axios.get(`${BASE_URL}categories/`),
    getProductsByCategory: (categoryId) => axios.get(`${BASE_URL}products/category/${categoryId}`),
    getCounties: () => axios.get(`${BASE_URL}counties/`),
    getSubCountiesByCounty: (countyId) => axios.get(`${BASE_URL}subcounties/county/${countyId}`),
    createFarm: (farmData, config) => axios.post(`${BASE_URL}farm/create/`, farmData, config),
};

export default FarmService;
