import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import OrderService from "../../services/OrderService";
import { notify } from "../../hooks/Notification";
import { useNavigate } from "react-router-dom";
const CreateOrder = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);
  const [formData, setFormData] = useState({
    product_id: "",
    quantity_requested: "",
    delivery_date: "",
    county_id: "",
    subcounty_id: "",
    farmer: null,
  });

  const [productUnit, setProductUnit] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchCounties();
  }, []);

  const fetchCategories = () => {
    OrderService.getCategories()
      .then((res) => setCategories(res.data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const fetchCounties = () => {
    OrderService.getCounties()
      .then((res) => setCounties(res.data))
      .catch((error) => console.error("Error fetching counties:", error));
  };

  const handleCategoryChange = (categoryId) => {
    OrderService.getProductsByCategory(categoryId)
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleCountyChange = (countyId) => {
    OrderService.getSubCountiesByCounty(countyId)
      .then((res) => setSubCounties(res.data))
      .catch((error) => console.error("Error fetching subcounties:", error));
  };

  const handleProductChange = (productId) => {
    const selectedProduct = products.find(
      (product) => product.product_id == productId
    );
    setFormData({ ...formData, product_id: productId });
    setProductUnit(selectedProduct.unit);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call our service method to submit the form data
    OrderService.createOrder(formData)
      .then((res) => {
        console.log("Order created successfully:", res.data);
        notify("success", "Order created successfully");
        navigate("/customer/dashboard");
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        notify("error", "'Error creating order");
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
            <li>Create Order</li>
          </ul>
        </div>
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="col-md-9">
          <div className="box">
            <h3>Create Order</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category_id">Select Category</label>
                <select
                  className="form-control"
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="product_id">Select Product</label>
                <select
                  className="form-control"
                  id="product_id"
                  name="product_id"
                  value={formData.product_id}
                  onChange={(e) => {
                    handleChange(e);
                    handleProductChange(e.target.value);
                  }}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.product_id} value={product.product_id}>
                      {product.product_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quantity_requested">
                  Quantity Required ({productUnit})
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity_requested"
                  name="quantity_requested"
                  value={formData.quantity_requested}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="delivery_date">Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="delivery_date"
                  name="delivery_date"
                  value={formData.delivery_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="county_id">County</label>
                <select
                  className="form-control"
                  id="county_id"
                  name="county_id"
                  value={formData.county_id}
                  onChange={(e) => {
                    handleChange(e); // Update formData
                    handleCountyChange(e.target.value); // Fetch sub-counties based on the selected county
                  }}
                  required
                >
                  <option value="">Select County</option>
                  {counties.map((county) => (
                    <option key={county.county_id} value={county.county_id}>
                      {county.county_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subcounty_id">Sub-County</label>
                <select
                  className="form-control"
                  id="subcounty_id"
                  name="subcounty_id"
                  value={formData.subcounty_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Sub-County</option>
                  {subCounties.map((subCounty) => (
                    <option
                      key={subCounty.subcounty_id}
                      value={subCounty.subcounty_id}
                    >
                      {subCounty.subcounty_name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
