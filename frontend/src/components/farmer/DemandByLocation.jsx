import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import ReportService from "../../services/ReportService";
import OrderService from "../../services/OrderService";

const DemandByLocation = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [categoryId, setCategoryId] = useState("");
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        OrderService.getCategories()
            .then((res) => setCategories(res.data))
            .catch((error) => console.error("Error fetching categories:", error));
    };

    const handleCategoryChange = (categoryId) => {
        setCategoryId(categoryId);
        OrderService.getProductsByCategory(categoryId)
            .then((res) => setProducts(res.data))
            .catch((error) => console.error("Error fetching products:", error));
    };

    const handleProductChange = (productId) => {
        const selectedProduct = products.find(
            (product) => product.product_id == productId
        );
        setProductName(selectedProduct.product_name);
        setProductId(productId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Call our service method to get data
        ReportService.getDemandByLocation(productId)
          .then((res) => {
            console.log("Demand By Location::", res.data);
            
          })
          .catch((error) => {
            console.error("Error fettching data:", error);
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
                        <li>Demand By Location</li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <SideBar />
                </div>
                <div className="col-md-9">
                    <div className="box">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="category_id">Select Category</label>
                                    <select
                                        className="form-control"
                                        id="category_id"
                                        name="category_id"
                                        value={categoryId}
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
                                        value={productId}
                                        onChange={(e) => {
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
                                
                                
                                <button type="submit" className="btn btn-primary">
                                    View
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="box">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemandByLocation;
