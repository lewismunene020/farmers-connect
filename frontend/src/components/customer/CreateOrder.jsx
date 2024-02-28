import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import OrderService from "../../services/OrderService";

class CreateOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      counties: [],
      subCounties: [],
      formData: {
        product_id: "",
        quantity_requested: "",
        delivery_date: "",
        location_county_id: "",
        location_subcounty_id: "",
      },
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchCounties();
  }

  fetchCategories() {
    OrderService.getCategories()
      .then((res) => this.setState({ categories: res.data }))
      .catch((error) => console.error("Error fetching categories:", error));
  }

  fetchCounties() {
    OrderService.getCounties()
      .then((res) => this.setState({ counties: res.data }))
      .catch((error) => console.error("Error fetching counties:", error));
  }

  handleCategoryChange(categoryId) {
    OrderService.getProductsByCategory(categoryId)
      .then((res) => this.setState({ products: res.data }))
      .catch((error) => console.error("Error fetching products:", error));
  }

  handleCountyChange(countyId) {
    OrderService.getSubCountiesByCounty(countyId)
      .then((res) => this.setState({ subCounties: res.data }))
      .catch((error) => console.error("Error fetching subcounties:", error));
  }

  handleChange = (e) => {
    const { formData } = this.state;
    this.setState({
      formData: { ...formData, [e.target.name]: e.target.value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;

    // Call our service method to submit the form data
    OrderService.createOrder(formData)
      .then((res) => {
        console.log("Order created successfully:", res.data);
        notify("success", "Order created successfully");
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        notify("error", "'Error creating order");
      });
  };

  render() {
    const { categories, products, counties, subCounties, formData } = this.state;

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
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="category_id">Select Category</label>
                  <select
                    className="form-control"
                    id="category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={(e) => this.handleCategoryChange(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.category_id} value={category.category_id}>
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
                    onChange={(e) => this.handleChange(e)}
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
                  <label htmlFor="quantity_requested">Quantity Requested</label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity_requested"
                    name="quantity_requested"
                    value={formData.quantity_requested}
                    onChange={(e) => this.handleChange(e)}
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
                    onChange={(e) => this.handleChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location_county_id">County</label>
                  <select
                    className="form-control"
                    id="location_county_id"
                    name="location_county_id"
                    value={formData.location_county_id}
                    onChange={(e) => {
                        this.handleChange(e); // Update formData
                        this.handleCountyChange(e.target.value); // Fetch sub-counties based on the selected county
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
                  <label htmlFor="location_subcounty_id">Sub-County</label>
                  <select
                    className="form-control"
                    id="location_subcounty_id"
                    name="location_subcounty_id"
                    value={formData.location_subcounty_id}
                    onChange={(e) => this.handleChange(e)}
                    required
                  >
                    <option value="">Select Sub-County</option>
                    {subCounties.map((subCounty) => (
                      <option key={subCounty.subcounty_id} value={subCounty.subcounty_id}>
                        {subCounty.subcounty_name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateOrder;
