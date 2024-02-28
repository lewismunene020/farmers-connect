import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import PublicFarmService from '../services/PublicFarmService';

const Farms = () => {
    const [farms, setFarms] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (selectedProduct) {
            PublicFarmService.getFarmsByProductId(selectedProduct)
                .then(response => {
                    setFarms(response.data);
                })
                .catch(error => {
                    console.error('Error fetching farms by product ID:', error);
                });
        }
    }, [selectedProduct]);

    const onProductClick = productId => {
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
                    <SideBar onProductClick={onProductClick} selectedProduct={selectedProduct} />
                </div>
                <div className="col-md-9">
                    <div className="row">
                        {farms.map(farm => (
                            <div key={farm.farm_id} className="col-md-4 col-sm-6 center-responsive">
                                <div className="product">
                                    <div className="image">
                                        <img src={farm.product_image1} alt={farm.title} className="img-responsive" />
                                    </div>
                                    <div className="text">
                                        <h3>{farm.title}</h3>
                                        <p>Product: {farm.product_id.product_name}</p>
                                        <p>Location: {farm.location_subcounty_id.subcounty_name}, {farm.location_county_id.county_name}</p>
                                        <p>Quantity Available: {farm.quantity_available} {farm.product_id.unit}</p>
                                        <p class='price'>KES {farm.price_per_unit} (per {farm.product_id.unit})</p>
                                        <p class='button'>
                                            <a href='customer/chat' class='btn btn-default'> Chat Farmer</a>
                                            <a href='customer/order' class='btn btn-primary'>
                                                Place Order
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Farms;
