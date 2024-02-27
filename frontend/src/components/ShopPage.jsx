import React, { useState, useEffect } from 'react';


function ShopPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch products from backend API
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?page=${currentPage}`);
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div id="content">
      <div className="container">
        <div className="col-md-12">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Shop</li>
          </ul>
        </div>
        <div className="col-md-3">
          {/* Sidebar Component */}
          {/* You can include the sidebar component here */}
          <p>Sidebar</p>
        </div>
        <div className="col-md-9">
          {/* Product Display */}
          <p>Product display</p>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 col-sm-6 center-responsive">
                <div className="product">
                  <a href={`details.php?pro_id=${product.id}`}>
                    <img className="img-responsive" src={`admin/product_images/${product.image}`} alt={product.title} />
                  </a>
                  <div className="text">
                    <h3>
                      <a href={`details.php?pro_id=${product.id}`}>{product.title}</a>
                    </h3>
                    <p className="price">KES {product.price}</p>
                    <p className="button">
                      <a href={`details.php?pro_id=${product.id}`} className="btn btn-default"> View Details</a>
                      <a href={`details.php?pro_id=${product.id}`} className="btn btn-primary">
                        <i className="fa fa-shopping-cart"></i> Order
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <center>
            <ul className="pagination">
              <li>
                <a href="#" onClick={() => handlePaginationClick(1)}>First Page</a>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <a href="#" onClick={() => handlePaginationClick(index + 1)}>{index + 1}</a>
                </li>
              ))}
              <li>
                <a href="#" onClick={() => handlePaginationClick(totalPages)}>Last Page</a>
              </li>
            </ul>
          </center>
          {/* Other functions like getpcatpro() and getcatpro() can be called here */}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;


