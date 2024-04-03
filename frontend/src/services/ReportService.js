import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const api = axios.create({
  baseURL: BASE_URL,
});

// Set the Authorization header for all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("user.token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const ReportService = {
  getMostOrdered: () => api.get("most_ordered_product/?num=5"),
  getDemandByLocation: (productId) =>
    api.get(`demand_by_location/${productId}`),
  getOrdersWithNoSupply: () => api.get("orders/no-supply"),
  /**
   * Retrieves demand data for a specific product by month of the year.
   *
   * @param {type} productId - The ID of the product to retrieve demand data for.
   * @return {type} The demand data for the specified product by month of the year.
   */
  getDemandByMonthOfTheYear: (productId) =>
    api.get(`demand_by_month/${productId}/`),
};

export default ReportService;
