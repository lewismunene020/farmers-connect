import React, { useState, useEffect } from "react";
// import Pagination from "./Pagination";

const Product = () => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const[totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        //fetch products from the backend API
        fetchProducts();
    }, [currentPage])

    const fetchProducts = async () => {
        try{
            const response = await fetch('/producst');
            const data = await response.json();
            setProducts(data.products);
            setTotalPages(data.totalPages);       

        } catch (error){
            console.error('Error fetching products: ', error)
        }
    };

    

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };



return (
    <div className="col-md-9">
        <p>Product display</p>
        <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 col-sm-6 center-responsive">
                <div className="product">
                    {/* the link should lead to a details page, identify using product id */}
                  <a href="#">
                    <img className="img-responsive" src="src/assets/logo.jpeg" alt={product.title} />
                  </a>
                  <div className="text">
                    <h3>
                    {/* the link should lead to a details page */}
                        <a href="#">{product.title}</a>
                    </h3>
                    <p className="price">KES {product.price}</p>
                    <p className="button">
                      <a href="#" className="btn btn-default"> View Details</a>
                      <a href="#" className="btn btn-primary">
                        <i className="fa fa-shopping-cart"></i> Order
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}

        </div>
        {/* <Pagination /> */}
        {/* <div className="col-md-3"> 
            <cemter>
                <p>Pagination</p>
                <ul className="pagination">
                    <li>
                        <a href="#" onClick={() => handlePaginationClick(1)}>First Page</a>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index}>
                            <a href="#" onClick={handlePaginationClick(index+1)}>{index+1}</a>
                        </li>
                    ))}
                    <li>
                    <a   a href="#" onClick={() => handlePaginationClick(totalPages)}>Last Page</a>

                    </li>
                </ul>
            </cemter>
        </div> */}
    
    </div>

  );
};

export default Product;
