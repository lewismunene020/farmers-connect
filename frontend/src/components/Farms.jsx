import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import PublicFarmService from "../services/PublicFarmService";

const Farms = () => {
  const [farms, setFarms] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    PublicFarmService.getAllFarms()
      .then((response) => {
        setFarms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all farms: ", error);
      });
  }, []); //Empty dependency array causes the effect to run only once on mount

  const onProductClick = (productId) => {
    if (productId === selectedProduct) {
      // if the same category is selected again, reset selectedProduct to null to show all products
      setSelectedProduct(null);
    } else {
      // Otherwise, update selectedProduct to trigger the useEffect for fetching filtered farms data
      setSelectedProduct(productId);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      // Fetch filtered farms data based on the selected product category
      PublicFarmService.getFarmsByProductId(selectedProduct)
        .then((response) => {
          setFarms(response.data);
        })
        .catch((error) => {
          console.error("Error fetching filtered farms by product ID: ", error);
        });
    } else {
      // Fetch all farms data if no product category is selected
      PublicFarmService.getAllFarms()
        .then((response) => {
          setFarms(response.data);
        })
        .catch((error) => {
          console.error("Error fetching all farms: ", error);
        });
    }
  }, [selectedProduct]);

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
          <SideBar
            onProductClick={onProductClick}
            selectedProduct={selectedProduct}
          />
        </div>
        <div className="col-md-9">
          <div className="row">
            {farms.map((farm) => (
              <div
                key={farm.farm_id}
                className="col-md-4 col-sm-6 center-responsive"
              >
                <div className="product">
                  <div className="image">
                    <img
                      src={farm.product_image1}
                      alt={farm.title}
                      className="img-responsive"
                    />
                  </div>
                  <div className="text">
                    <h3>{farm.title}</h3>
                    <p>Product: {farm.product_id.product_name}</p>
                    <p>
                      Location: {farm.location_subcounty_id.subcounty_name},{" "}
                      {farm.location_county_id.county_name}
                    </p>
                    <p>
                      Quantity Available: {farm.quantity_available}{" "}
                      {farm.product_id.unit}
                    </p>
                    <p class="price">
                      From <b>KES {farm.price_per_unit}</b> (per{" "}
                      {farm.product_id.unit})
                    </p>
                    <p class="button">
                      {/* <a href='customer/chat' class='btn btn-default'> Chat Farmer</a> */}
                      <a href="customer/createorder" class="btn btn-primary">
                        Request Bid
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
