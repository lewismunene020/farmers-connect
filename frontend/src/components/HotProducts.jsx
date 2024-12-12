import React, { useState, useEffect } from "react";
import ProductCard from "./products/Card";

import PublicFarmService from "../services/PublicFarmService";

function HotProducts() {
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

  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     title: "Product 1",
  //     price: "$10.99",
  //     image: "/product-images/1.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "Product 2",
  //     price: "$10.99",
  //     image: "/product-images/2.jpg",
  //   },
  //   {
  //     id: 3,
  //     title: "Product 3",
  //     price: "$10.99",
  //     image: "/product-images/3.jpg",
  //   },
  //   {
  //     id: 4,
  //     title: "Product 4",
  //     price: "$10.99",
  //     image: "/product-images/4.jpg",
  //   },
  // ]);
  return (
    <>
      <div id="hot">
        <div className="box">
          <div className="container">
            <div className="col-md-12">
              <h2>Our Latest Products</h2>
            </div>
          </div>
        </div>
      </div>
      <div id="content" className="container">
        <div className="row">
          {/* if the  products array is empty show no products */}

          {farms.length === 0 && (
            <div className="col-md-12 text-secondary text-center">
              <h2>No Products Found</h2>
            </div>
          )}

          {/* Map over products array and render each product */}

          {farms.map((farm) => (
            // <div key={product.id} className="col-md-4 col-sm-6 single">
            //   <ProductCard product={product} />
            // </div>
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
                    <a href="customer/chat" class="btn btn-default">
                      {" "}
                      Chat Farmer
                    </a>
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
    </>
  );
}

export default HotProducts;
