import React, { useState } from "react";
import ProductCard from "./products/Card";

function HotProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Product 1",
      price: "$10.99",
      image: "/product-images/1.jpg",
    },
    {
      id: 2,
      title: "Product 2",
      price: "$10.99",
      image: "/product-images/2.jpg",
    },
    {
      id: 3,
      title: "Product 3",
      price: "$10.99",
      image: "/product-images/3.jpg",
    },
    {
      id: 4,
      title: "Product 4",
      price: "$10.99",
      image: "/product-images/4.jpg",
    },
  ]);
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
      <div id="content" class="container">
        <div className="row">
          {/* if the  products array is empty show no products */}

          {products.length === 0 && (
            <div className="col-md-12 text-secondary text-center">
              <h2>No Products Found</h2>
            </div>
          )}

          {/* Map over products array and render each product */}

          {products.map((product) => (
            <div key={product.id} className="col-md-4 col-sm-6 single">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HotProducts;
