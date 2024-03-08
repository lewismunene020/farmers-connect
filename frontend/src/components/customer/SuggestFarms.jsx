import React, { useEffect, useState } from 'react';
import PublicFarmService from '../../services/PublicFarmService';
import OrderService from '../../services/OrderService';
import { notify } from "../../hooks/Notification";

const SuggestFarms = ({ order }) => {
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bids, setBids] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Suggested');

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
                    quantity_available: order.quantity_requested,
                    exclude_county_id: order.county_id.county_id // Exclude farms from the same county
                });

                // Finally, fetch all farms selling the product_id
                const response3 = await PublicFarmService.getFarmsByProductId(order.product_id.product_id);

                // Combine all farms
                const allFarms = {
                    countyFarms: response1.data,
                    otherCountyFarms: response2.data,
                    allProductFarms: response3.data.filter(farm => !farms.find(f => f.farm_id === farm.farm_id)) // Exclude farms already fetched in previous responses
                };

                setFarms(allFarms);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching farms:', error);
            }
        };

        fetchFarms();
    }, [order]);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                if (selectedTab === 'Bids' && order) {
                    const response = await OrderService.getOrderBids(order.order_id);
                    setBids(response.data);
                }
            } catch (error) {
                console.error('Error fetching bids:', error);
            }
        };

        fetchBids();
    }, [order, selectedTab]);

    const handleAcceptBid = async (bidId) => {
        try {
            // Call the OrderService method to accept the bid
            await OrderService.acceptBid(bidId);
            // After accepting, fetch the updated list of bids
            const response = await OrderService.getOrderBids(order.order_id);
            notify("success", "Bid accepted successfully");
            setBids(response.data);
        } catch (error) {
            console.error('Error accepting bid:', error);
            notify("errpr", "Error accepting bid");
        }
    };

    const handleRejectBid = async (bidId) => {
        try {
            // Call the OrderService method to reject the bid
            await OrderService.rejectBid(bidId);
            // After rejecting, fetch the updated list of bids
            const response = await OrderService.getOrderBids(order.order_id);
            notify("success", "Bid rejected successfully");
            setBids(response.data);
        } catch (error) {
            console.error('Error rejecting bid:', error);
            notify("error", "Error rejecting bid");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <div className="row order-details">
                <div className="col-md-6">
                    <div className="order-details-container">
                        <p>Order ID: {order.order_id}</p>
                        <p>Product: {order.product_id.product_name}</p>
                        <p>Quantity Required: {order.quantity_requested} {order.product_id.unit}</p>
                        <p>Delivery Date: {order.delivery_date}</p>
                    </div>
                </div>
            </div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button className={`btn-primary nav-link ${selectedTab === 'Suggested' ? 'active' : ''}`} onClick={() => setSelectedTab('Suggested')}>Suggested</button>
                </li>
                <li className="nav-item">
                    <button className={`btn-primary nav-link ${selectedTab === 'Bids' ? 'active' : ''}`} onClick={() => setSelectedTab('Bids')}>Bids</button>
                </li>
            </ul>

            {selectedTab === 'Suggested' && (
                <div>
                    <div className="col-md-9">
                        <h4>{`We found ${farms.countyFarms.length} farms in ${order.county_id.county_name} that can fulfill your order:`}</h4>
                        <div className="row">
                            {farms.countyFarms.length > 0 ? (
                                farms.countyFarms.map((farm) => (
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
                                                <p className="price">From <b>KES {farm.price_per_unit}</b> (per {farm.product_id.unit})</p>
                                                <p className="button">
                                                    <a href="customer/chat" className="btn btn-default">Chat Farmer</a>
                                                    <a href="#" className="btn btn-primary">Request Bid</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>{`No farms found in ${order.county_id.county_name} that can fulfill your order.`}</p>
                            )}
                        </div>
                    </div>

                    {/* Farms with only the quantity_available constraint */}
                    <div className="col-md-9">
                        <h4>{`We found ${farms.otherCountyFarms.length} farms in other counties that can fully satisfy your order:`}</h4>
                        <div className="row">
                            {farms.otherCountyFarms.length > 0 ? (
                                farms.otherCountyFarms.map((farm) => (
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
                                                <p className="price">From <b>KES {farm.price_per_unit}</b> (per {farm.product_id.unit})</p>
                                                <p className="button">
                                                    <a href="customer/chat" className="btn btn-default">Chat Farmer</a>
                                                    <a href="#" className="btn btn-primary">Request Bid</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>{`No farms found in other counties that can satisfy your order.`}</p>
                            )}
                        </div>
                    </div>

                    {/* All farms selling the product */}
                    <div className="col-md-9">
                        <h4>{`All farms selling ${order.product_id.product_name}:`}</h4>
                        <div className="row">
                            {farms.allProductFarms.length > 0 ? (
                                farms.allProductFarms.map((farm) => (
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
                                                <p className="price">From <b>KES {farm.price_per_unit}</b> (per {farm.product_id.unit})</p>
                                                <p className="button">
                                                    <a href="customer/chat" className="btn btn-default">Chat Farmer</a>
                                                    <a href="#" className="btn btn-primary">Request Bid</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>{`No farms found selling ${order.product_id.product_name}.`}</p>
                            )}
                        </div>
                    </div>
                </div>

            )}

            {selectedTab === 'Bids' && (
                // Bids table section
                <div className="col-md-6">
                    <h4>Bids for Order ID: {order.order_id}</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Farmer</th>
                                <th>Price Per Unit</th>
                                <th>Total Cost</th>
                                <th>Delivery Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bids.map((bid) => (
                                <tr key={bid.bid_id}>
                                    <td>{`${bid.farmer.first_name} ${bid.farmer.last_name}`}</td>
                                    <td>{bid.price_per_unit}</td>
                                    <td>{bid.price_per_unit * order.quantity_requested}</td>
                                    <td>{bid.delivery_date}</td>
                                    <td>
                                        <button className="btn-success" onClick={() => handleAcceptBid(bid.bid_id)}>Accept</button>
                                        <button className="btn-danger" onClick={() => handleRejectBid(bid.bid_id)}>Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SuggestFarms;
