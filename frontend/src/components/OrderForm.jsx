// src/components/OrderForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    category_id: '',
    product_id: '',
    quantity_requested: 0,
    delivery_date: '',
    location_county_id: '',
    location_subcounty_id: '',
  });

  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://your-backend-url/api/categories/');
        setCategoryOptions(response.data.map((category) => ({ label: category.name, value: category.id })));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []); // Run once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://your-backend-url/api/create_order/', formData);
      console.log(response.data); // Handle success
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Category:
          <Select
            options={categoryOptions}
            onChange={(selectedOption) => setFormData({ ...formData, category_id: selectedOption.value })}
          />
        </label>
      </div>
  
      <div>
        <label>
          Product:
          <Select
            // Add options and onChange for product selection
          />
        </label>
      </div>
  
      <div>
        <label>
          Quantity:
          <input
            type="number"
            value={formData.quantity_requested}
            onChange={(e) => {
              const inputValue = parseInt(e.target.value, 10);
              setFormData({ ...formData, quantity_requested: isNaN(inputValue) ? 0 : Math.max(0, inputValue) });
            }}
          />
        </label>
      </div>
  
      <div>
        <label>
          Delivery Date:
          <input
            type="date"
            value={formData.delivery_date}
            onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
          />
        </label>
      </div>
  
      <div>
        <label>
          Location County:
          <Select
            // Add options and onChange for county selection
          />
        </label>
      </div>
  
      <div>
        <label>
          Location Subcounty:
          <Select
            // Add options and onChange for subcounty selection
          />
        </label>
      </div>
  
      <button type="submit">Submit Order</button>
    </form>
  );
};
export default OrderForm;
