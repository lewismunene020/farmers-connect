import React, { useState } from 'react';
import SideBar from '../customer/SideBar';

const ProductDetails = () => {
  const [productQty, setProductQty] = useState(1);

  const handleQtyChange = (e) => {
    setProductQty(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Product added to cart');
  };

  return (
    
    <div>
      {/* Breadcrumb */}
      <ul className="breadcrumb">
        <li><a href="index.php">Home</a></li>
        <li>Shop</li>
        {/* Add your breadcrumb items dynamically */}
      </ul>

      <div className="container">
       
        <div className="col-md-3">
          {/* Include your sidebar component */}
           {/* Sidebar */}
        <SideBar /> 
        </div>

        {/* Product Details */}
        <div className="col-md-9">
          {/* Product Images Carousel */}
          <div id="mainImage">
            {/* Include your image carousel component */}
          </div>

          {/* Product Details Form */}
          <div className="box">
            <form className="form-horizontal" onSubmit={handleAddToCart}>
              <div className="form-group">
                <label htmlFor="product_qty" className="col-md-5 control-label">Products Quantity</label>
                <div className="col-md-7">
                  <input
                    id="product_qty"
                    className="form-control"
                    type="number"
                    value={productQty}
                    onChange={handleQtyChange}
                  />
                </div>
              </div>

              <p className="price">KES {/* Add your product price here dynamically */}</p>

              <p className="text-center buttons">
                <button type="submit" className="btn btn-primary">
                  <i className="fa fa-shopping-cart"></i> Add to cart
                </button>
              </p>
            </form>
          </div>

          {/* Product Description */}
          <div className="box" id="details">
            <h4>Product Details</h4>
            <p>{/* Add your product description here dynamically */}</p>
            <hr />
          </div>

          {/* Products You May Like */}
          <div className="row same-height-row">
            {/* Include your similar products component */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
