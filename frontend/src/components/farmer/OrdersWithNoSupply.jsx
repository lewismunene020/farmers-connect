import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import ReportService from "../../services/ReportService";


const OrdersWithNoSupply = () => {
    // initialize noSupply as Set ensuring each product name appears only once
    const [noSupply, setNoSupply] = useState(new Set())

    useEffect(() => {
        // Function to fetch orders with no supply
        const fetchOrdersWithNoSupply = async () => {

            try{
                const response = await ReportService.getOrdersWithNoSupply()
                const productsWithNoSupply = response.data.map(order =>
                    order.product_id.product_name)
                setNoSupply(new Set(productsWithNoSupply))
            } catch(error) {
                console.error('Error fetching orders with no supply: ', error)
            }
        };

        // Call the function to fetch the orders with no supply
        fetchOrdersWithNoSupply()
    }, [noSupply]) // Only re-run effect if noSupply chages(new order without supply)

    return(
        <div id="content">
            <div className="container">
                <div className="col-md-12">
                <ul className="breadcrumb">
                    <li>
                    <a href="/">Home</a>
                    </li>
                    <li>Orders with No Supply</li>
                </ul>
                </div>
                <div className="col-md-3">
                <SideBar />
                </div>
                <div className="col-md-9">
                <div className="box">
                    <h3>Products With No Supply</h3>
                    <ul>
                        {/* Displaying product names */}
                        {/* spread operator '[...noSupply]' converts the set into an array to map through it */}
                        {[...noSupply].map((productName, index) => (
                            <li key={index}>
                                {productName}
                            </li>
                        ))}
                    </ul>

                </div>
                </div>
            </div>
        </div>
  );

}

 export default OrdersWithNoSupply;