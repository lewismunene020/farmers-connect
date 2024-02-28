import React from "react";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <div className="product h-100">
      <Link to={`/products/details/?id=${product.id}`}>
        <img
          className="img-responsive"
          src={`${product.image}`}
          alt={product.title}
        />
      </Link>
      <div className="text">
        <h3>
          <Link to={`/products/details/?id=${product.id}`}>
            {product.title}
          </Link>
        </h3>
        <p className="price">{product.price}</p>
        <p className="button">
          <Link
            className="btn btn-default"
            to={`/products/details/?id=${product.id}`}
          >
            View details
          </Link>
          <Link
            className="btn btn-primary"
            to={`/products/details/?id=${product.id}`}
          >
            <i className="fa fa-shopping-cart"></i> Order
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
