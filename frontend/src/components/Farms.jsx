// Farms.js
import React, { useState, useEffect } from 'react';
import SideBar from "./SideBar";
import PublicFarmService from "../services/PublicFarmService";

const Farms = () => {
    const [farms, setFarms] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Define selectedProduct here

    useEffect(() => {
        if (selectedProduct) {
            // Fetch farms by product ID
            PublicFarmService.getFarmsByProductId(selectedProduct)
                .then(response => {
                    setFarms(response.data);
                })
                .catch(error => {
                    console.error('Error fetching farms by product ID:', error);
                });
        }
    }, [selectedProduct]);

    const onProductClick = (productId) => {
        setSelectedProduct(productId);
    };

    return (
        <div id="content">
            <div className="container">
                <div className="col-md-12">
                    <ul className="breadcrumb">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>Farms</li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <SideBar onProductClick={onProductClick} selectedProduct={selectedProduct} />                </div>
                <div className="col-md-9">
                    <div className="box">
                        {/* Render farms here */}
                        {farms.map((farm) => (
                            <div key={farm.farm_id}>
                                <h3>{farm.title}</h3>
                                <p>Quantity Available: {farm.quantity_available}</p>
                                <p>Price Per Unit: {farm.price_per_unit}</p>
                                {/* Add more farm details as needed */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Farms;
