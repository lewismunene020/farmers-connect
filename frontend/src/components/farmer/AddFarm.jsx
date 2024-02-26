import React, { useState, useEffect } from 'react';
import FarmService from '../../services/FarmService';
import SideBar from './SideBar';

const AddFarm = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [counties, setCounties] = useState([]);
    const [subCounties, setSubCounties] = useState([]);
    const [formData, setFormData] = useState({
        product_id: '',
        title: '',
        product_image1: null,
        product_image2: null,
        location_county_id: '',
        location_subcounty_id: '',
        quantity_available: '',
        price_per_unit: '',
    });

    useEffect(() => {
        FarmService.getCategories().then(res => setCategories(res.data));
        FarmService.getCounties().then(res => setCounties(res.data));
    }, []);

    const handleCategoryChange = (categoryId) => {
        FarmService.getProductsByCategory(categoryId).then(res => setProducts(res.data));
    };

    const handleCountyChange = (countyId) => {
        FarmService.getSubCountiesByCounty(countyId).then(res => setSubCounties(res.data));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, [e.target.name]: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataWithImages = new FormData();
        formDataWithImages.append('product_image1', formData.product_image1);
        formDataWithImages.append('product_image2', formData.product_image2);
        formDataWithImages.append('product_id', formData.product_id);
        formDataWithImages.append('title', formData.title);
        formDataWithImages.append('location_county_id', formData.location_county_id);
        formDataWithImages.append('location_subcounty_id', formData.location_subcounty_id);
        formDataWithImages.append('quantity_available', formData.quantity_available);
        formDataWithImages.append('price_per_unit', formData.price_per_unit);
    
        // Set headers
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
    
        FarmService.createFarm(formDataWithImages, config).then(() => {
            console.log('Farm created successfully');
        }).catch(error => {
            console.error('Error creating farm:', error);
        });
    };
    

    return (
        <div id="content">
            <div className="container">
                <div className="col-md-12">
                    <ul className="breadcrumb">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            Add Farm
                        </li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <SideBar />
                </div>
                <div className="col-md-9">
                    <div className="box">
                        <h1>Add Farm</h1>
                        <form onSubmit={handleSubmit}>
                            {/* Form fields go here */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFarm;
