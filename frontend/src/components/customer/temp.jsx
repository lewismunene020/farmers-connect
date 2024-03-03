import React, { useEffect, useState } from 'react';
import PublicFarmService from '../../services/PublicFarmService';

const SuggestFarms = ({ order }) => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        // First, fetch farms matching both quantity_available and county_id
        const response1 = await PublicFarmService.findFarms({
          product_id: order.product_id.product_id,
          county_id: order.county_id.county_id,
          quantity_available: order.quantity_requested
        });

        // Then, fetch farms with only the quantity_available constraint
        const response2 = await PublicFarmService.findFarms({
          product_id: order.product_id.product_id,
          quantity_available: order.quantity_requested
        });

        // Finally, fetch all farms selling the product_id
        const response3 = await PublicFarmService.getFarmsByProductId(order.product_id.product_id);

        // Combine all farms
        const allFarms = [...response1.data, ...response2.data, ...response3.data];
        setFarms(allFarms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching farms:', error);
      }
    };

    fetchFarms();
  }, [order]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h3>Suggested Farms</h3>
      {farms.length > 0 ? (
        <div>
          {/* Farms matching both quantity_available and county_id */}
          <h4>{`We found ${farms.length} farms in ${order.county_id.county_name} that can fulfill your order:`}</h4>
          <div className="row">
            {farms.map((farm) => (
              <div key={farm.farm_id} className="col-md-4 col-sm-6 center-responsive">
                {/* Farm details */}
                <div className="product">
                  <div className="image">
                    <img src={farm.product_image1} alt={farm.title} className="img-responsive" />
                  </div>
                  <div className="text">
                    <h3>{farm.title}</h3>
                    <p>Product: {farm.product_id.product_name}</p>
                    <p>Location: {farm.location_subcounty_id.subcounty_name}, {farm.location_county_id.county_name}</p>
                    <p>Quantity Available: {farm.quantity_available} {farm.product_id.unit}</p>
                    <p className="price">KES {farm.price_per_unit} (per {farm.product_id.unit})</p>
                    <p className="button">
                      <a href="customer/chat" className="btn btn-default">Chat Farmer</a>
                      <a href="customer/order" className="btn btn-primary">Place Order</a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>{`No farms found in ${order.county_id.county_name} that can fulfill your order.`}</p>
      )}

      {/* Farms with only the quantity_available constraint */}
      <h4>{`We found ${farms.length} farms that can satisfy your order:`}</h4>
      <div className="row">
        {farms.map((farm) => (
          <div key={farm.farm_id} className="col-md-4 col-sm-6 center-responsive">
            {/* Farm details */}
            <div className="product">
              <div className="image">
                <img src={farm.product_image1} alt={farm.title} className="img-responsive" />
              </div>
              <div className="text">
                <h3>{farm.title}</h3>
                <p>Product: {farm.product_id.product_name}</p>
                <p>Location: {farm.location_subcounty_id.subcounty_name}, {farm.location_county_id.county_name}</p>
                <p>Quantity Available: {farm.quantity_available} {farm.product_id.unit}</p>
                <p className="price">KES {farm.price_per_unit} (per {farm.product_id.unit})</p>
                <p className="button">
                  <a href="customer/chat" className="btn btn-default">Chat Farmer</a>
                  <a href="customer/order" className="btn btn-primary">Place Order</a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All farms selling the product */}
      <h4>{`All farms selling ${order.product_id.product_name}:`}</h4>
      <div className="row">
        {farms.map((farm) => (
          <div key={farm.farm_id} className="col-md-4 col-sm-6 center-responsive">
            {/* Farm details */}
            <div className="product">
              <div className="image">
                <img src={farm.product_image1} alt={farm.title} className="img-responsive" />
              </div>
              <div className="text">
                <h3>{farm.title}</h3>
                <p>Product: {farm.product_id.product_name}</p>
                <p>Location: {farm.location_subcounty_id.subcounty_name}, {farm.location_county_id.county_name}</p>
                <p>Quantity Available: {farm.quantity_available} {farm.product_id.unit}</p>
                <p className="price">KES {farm.price_per_unit} (per {farm.product_id.unit})</p>
                <p className="button">
                  <a href="customer/chat" className="btn btn-default">Chat Farmer</a>
                  <a href="customer/order" className="btn btn-primary">Place Order</a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestFarms;
