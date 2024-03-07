// AddFarm.js

import React, { useState, useEffect } from "react";
import FarmService from "../../services/FarmService";
import SideBar from "./SideBar";
import { notify } from "../../hooks/Notification";
import { useNavigate } from "react-router-dom";

const AddFarm = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);
  const [formData, setFormData] = useState({
    product_id: "",
    title: "",
    product_image1: null,
    product_image2: null,
    location_county_id: "",
    location_subcounty_id: "",
    quantity_available: "",
    price_per_unit: "",
  });

  const navigate = useNavigate();

  const [productUnit, setProductUnit] = useState("");

  useEffect(() => {
    FarmService.getCategories().then((res) => setCategories(res.data));
    FarmService.getCounties().then((res) => setCounties(res.data));
  }, []);

  const handleCategoryChange = (categoryId) => {
    FarmService.getProductsByCategory(categoryId).then((res) =>
      setProducts(res.data)
    );
  };

  const handleCountyChange = (countyId) => {
    FarmService.getSubCountiesByCounty(countyId).then((res) =>
      setSubCounties(res.data)
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  const handleProductChange = (productId) => {
    const selectedProduct = products.find(
      (product) => product.product_id == productId
    );
    setFormData({ ...formData, product_id: productId });
    setProductUnit(selectedProduct.unit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithImages = new FormData();
    formDataWithImages.append("product_image1", formData.product_image1);
    formDataWithImages.append("product_image2", formData.product_image2);
    formDataWithImages.append("product_id", formData.product_id);
    formDataWithImages.append("title", formData.title);
    formDataWithImages.append(
      "location_county_id",
      formData.location_county_id
    );
    formDataWithImages.append(
      "location_subcounty_id",
      formData.location_subcounty_id
    );
    formDataWithImages.append(
      "quantity_available",
      formData.quantity_available
    );
    formDataWithImages.append("price_per_unit", formData.price_per_unit);

    // Set headers
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    FarmService.createFarm(formDataWithImages, config)
      .then(() => {
        console.log("Farm created successfully");
        notify("success", "Farm created successfully");
        navigate("/farmer/myfarms");
      })
      .catch((error) => {
        console.error("Error creating farm:", error);
        notify("error", "'Error creating farm");
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
            <li>Add Farm</li>
          </ul>
        </div>
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="col-md-9">
          <div className="box">
            <h3>Add Farm</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category_id">What do you produce?</label>
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
                <label htmlFor="product_id">Product</label>
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
                <label htmlFor="title">Title (e.g. Kamau's Red Onions)</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="product_image1">Product Image 1</label>
                <input
                  type="file"
                  className="form-control"
                  id="product_image1"
                  name="product_image1"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="product_image2">Product Image 2</label>
                <input
                  type="file"
                  className="form-control"
                  id="product_image2"
                  name="product_image2"
                  accept="image/*"
                  onChange={handleImageChange}
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
                    setFormData({
                      ...formData,
                      location_county_id: e.target.value,
                    }); // Update the location_county_id in formData
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
                <label htmlFor="location_subcounty_id">Sub-County</label>
                <select
                  className="form-control"
                  id="location_subcounty_id"
                  name="location_subcounty_id"
                  value={formData.location_subcounty_id}
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
              <div className="form-group">
                <label htmlFor="quantity_available">
                  Quantity Available ({productUnit}s)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity_available"
                  name="quantity_available"
                  value={formData.quantity_available}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price_per_unit">Starting Price (per {productUnit})</label>
                <input
                  type="number"
                  className="form-control"
                  id="price_per_unit"
                  name="price_per_unit"
                  value={formData.price_per_unit}
                  onChange={handleChange}
                  required
                />
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

export default AddFarm;
