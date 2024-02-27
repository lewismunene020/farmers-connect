import React, { useState, useEffect } from 'react';
import PublicFarmService from '../services/PublicFarmService';

const SideBar = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    // Fetch categories from the API
    PublicFarmService.getCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const fetchProductsByCategory = categoryId => {
    // Fetch products by category from the API
    PublicFarmService.getProductsByCategory(categoryId)
      .then(response => {
        setProductsByCategory({
          ...productsByCategory,
          [categoryId]: response.data
        });
      })
      .catch(error => {
        console.error(`Error fetching products for category ${categoryId}:`, error);
      });
  };

  const handleMenuClick = (categoryId) => {
    setActiveMenu(activeMenu === categoryId ? '' : categoryId);
    fetchProductsByCategory(categoryId);
  };

  return (
    <div className="panel panel-default sidebar-menu">
      <div className="panel-body">
        <ul className="nav-pills nav-stacked nav">
          {categories.map(category => (
            <li key={category.category_id}>
              <a href="#" onClick={() => handleMenuClick(category.category_id)}>
                <i className="fa fa-folder"></i> {category.category_name.toUpperCase()}
              </a>
              {activeMenu === category.category_id && productsByCategory[category.category_id] && (
                <ul className="nav-pills nav-stacked nav">
                  {productsByCategory[category.category_id].map(product => (
                    <li key={product.product_id}>
                      <a href="#">{product.product_name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
