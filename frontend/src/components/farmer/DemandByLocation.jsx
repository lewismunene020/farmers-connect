// Import necessary dependencies
import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import ReportService from "../../services/ReportService";
import OrderService from "../../services/OrderService";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DemandByLocation = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [map, setMap] = useState(null);
    const [countyData, setCountyData] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (map) {
            fetchCountyData();
        }
    }, [map]);

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
            (product) => product.product_id === productId
        );
        setProductName(selectedProduct.product_name);
        setProductId(productId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ReportService.getDemandByLocation(productId)
            .then((res) => {
                setCountyData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const fetchCountyData = () => {
        if (countyData.length === 0) return;

        countyData.forEach((county) => {
            fetch(`/geojson/${county.county_name.toLowerCase().replace(/\s/g, "-")}.json`)
                .then((res) => res.json())
                .then((data) => {
                    // Add GeoJSON data to the map
                    L.geoJSON(data, {
                        style: function (feature) {
                            return {
                                fillColor: getColor(county.count),
                                fillOpacity: 0.5,
                                color: "#000",
                                weight: 1,
                            };
                        },
                    }).addTo(map);
                })
                .catch((error) => console.error("Error fetching GeoJSON data:", error));
        });
    };

    // Function to determine fill color based on count
    const getColor = (count) => {
        // We can define our own logic here to determine fill color based on count
        // For example, we can use a gradient scale or predefined color codes
        // Here's a simple example:
        return count === 1 ? "#ff0000" : count === 2 ? "#00ff00" : "#0000ff";
    };

    useEffect(() => {
        var container = L.DomUtil.get("map");

        if (container != null) {
            container._leaflet_id = null;
        }
        const map = L.map("map").setView([51.505, -0.09], 13);
        setMap(map);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
    }, []);

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
                    <div className="box" id="map" style={{ height: "500px" }}></div>
                </div>
            </div>
        </div>
    );
};

export default DemandByLocation;
