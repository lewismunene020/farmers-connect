import React, {useState, useEffect} from 'react';

import ShopNav from './ShopNav';
import SideBar from './SideBar';
import Product from './Product';
import Pagination from './Pagination';
// import Pagination from './Pagination';



const Shop = () => {

    // const [products, setProducts] =useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const[totalPages, setTotalPages] = useState(1);
;    
    // useEffect(() => {
    //     //fetch products from backend API
    //     fetchProducts();
    // }, [currentPage])

    // const fetchProducts = async () => {
    //     try {
    //         const response = await fetch('#');
    //         const data = await response.json();
    //         setProducts(data.products);
    //         setTotalPages(data.totalPages);
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //     }
    // };

    return(
        <div id="content">
            <div className='container'>
                <ShopNav />
                <SideBar />
                <Product />
                {/* <Pagination /> */}

            </div>
            

        </div>
    )
}

export default Shop