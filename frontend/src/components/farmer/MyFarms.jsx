import React, { useEffect, useState } from 'react';
import FarmService from '../../services/FarmService';
import SideBar from './SideBar';
import { useAuth } from '../../hooks/Auth';

const MyFarms = () => {
  const [farms, setFarms] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        if (user) {
            console.log(user)
          const userId = user.id;
    
          const response = await FarmService.getFarmsByFarmerId(userId);
          setFarms(response.data);
        }
      } catch (error) {
        console.error('Error fetching farms:', error);
      }
    };

    fetchFarms();
  }, [user]);

  return (
    <div id="content">
      <div className="container">
        <div className="col-md-12">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>My Farms</li>
          </ul>
        </div>
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="col-md-9">
          <div className="box">
            <h3>My Farms</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Product Name</th>
                  <th>Available</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {farms.map((farm) => (
                  <tr key={farm.farm_id}>
                    <td>{farm.farm_id}</td>
                    <td>{farm.title}</td>
                    <td>{farm.product_id.product_name}</td>
                    <td>{farm.quantity_available}</td>
                    <td>{farm.product_id.unit}</td>
                    <td>{farm.price_per_unit}</td>
                    <td>{`${farm.location_subcounty_id.subcounty_name}, ${farm.location_county_id.county_name}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFarms;
